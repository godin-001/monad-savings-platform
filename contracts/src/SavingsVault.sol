// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// ─── Interfaces ───────────────────────────────────────────────────────────────

interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

/// @title SavingsVault — Monad Savings Platform
/// @notice Ahorro a plazo fijo con rendimiento transparente para la generación 20-35.
///         Sin comisiones ocultas, sin KYC, sin intermediarios. Solo el código.
contract SavingsVault {
    // ─── Types ───────────────────────────────────────────────────────────────

    struct Position {
        address token;
        uint256 amount;
        uint256 lockPeriodDays;
        uint256 startTime;
        uint256 maturityTime;
        bool claimed;
        uint256 goalIndex;   // 0 = sin meta, 1+ = índice de SavingsGoal
    }

    struct SavingsGoal {
        string name;          // "Fondo de emergencia", "Viaje a Japón", etc.
        uint256 targetAmount; // Meta en tokens
        uint256 savedAmount;  // Total depositado hacia esta meta
        bool active;
    }

    // ─── State ───────────────────────────────────────────────────────────────

    address public owner;
    address public feeRecipient;

    /// @notice Comisión del protocolo sobre el yield: 1000 = 10%
    uint256 public protocolFeeBps = 1000;

    /// @notice Plazos soportados → APY en basis points (1 bp = 0.01%)
    mapping(uint256 => uint256) public apyBps;

    /// @notice Posiciones de ahorro por usuario
    mapping(address => Position[]) private _positions;

    /// @notice Metas de ahorro por usuario (índice 0 reservado — 1-based)
    mapping(address => SavingsGoal[]) private _goals;

    /// @notice Pool de yield disponible por token
    mapping(address => uint256) public yieldPool;

    /// @notice Racha de depósitos consecutivos por usuario (gamificación)
    mapping(address => uint256) public streak;

    /// @notice Timestamp del último depósito por usuario
    mapping(address => uint256) public lastDepositTime;

    // ─── Events ──────────────────────────────────────────────────────────────

    event Deposited(
        address indexed user,
        address indexed token,
        uint256 amount,
        uint256 lockPeriodDays,
        uint256 maturityTime,
        uint256 goalIndex
    );

    event Claimed(
        address indexed user,
        uint256 indexed positionIndex,
        uint256 principal,
        uint256 yieldAmount,
        uint256 protocolFee
    );

    event GoalCreated(address indexed user, uint256 indexed goalIndex, string name, uint256 targetAmount);
    event GoalCompleted(address indexed user, uint256 indexed goalIndex, string name);
    event YieldPoolFunded(address indexed token, uint256 amount);
    event StreakUpdated(address indexed user, uint256 newStreak);

    // ─── Constructor ─────────────────────────────────────────────────────────

    constructor(address _feeRecipient) {
        owner = msg.sender;
        feeRecipient = _feeRecipient;

        // APY fijo por plazo
        apyBps[30] = 500;   // 5%
        apyBps[60] = 1200;  // 12%
        apyBps[90] = 2000;  // 20%
    }

    // ─── Modifiers ───────────────────────────────────────────────────────────

    modifier onlyOwner() {
        require(msg.sender == owner, "SavingsVault: not owner");
        _;
    }

    // ─── Goals ───────────────────────────────────────────────────────────────

    /// @notice Crea una meta de ahorro (ej. "Viaje a Japón: 1200 USDC")
    /// @param name Nombre descriptivo de la meta
    /// @param targetAmount Monto objetivo en tokens
    function createGoal(string calldata name, uint256 targetAmount) external returns (uint256) {
        require(bytes(name).length > 0, "SavingsVault: empty name");
        require(targetAmount > 0, "SavingsVault: target must be > 0");

        _goals[msg.sender].push(
            SavingsGoal({
                name: name,
                targetAmount: targetAmount,
                savedAmount: 0,
                active: true
            })
        );

        uint256 goalIndex = _goals[msg.sender].length; // 1-based
        emit GoalCreated(msg.sender, goalIndex, name, targetAmount);
        return goalIndex;
    }

    // ─── Deposit ─────────────────────────────────────────────────────────────

    /// @notice Deposita tokens con plazo de bloqueo, opcionalmente asociado a una meta
    /// @param token Dirección del token ERC20
    /// @param amount Monto a depositar
    /// @param lockPeriodDays Plazo: 30, 60 o 90
    /// @param goalIndex Meta asociada (0 = sin meta, 1+ = índice de meta)
    function deposit(
        address token,
        uint256 amount,
        uint256 lockPeriodDays,
        uint256 goalIndex
    ) external {
        require(token != address(0), "SavingsVault: zero address");
        require(amount > 0, "SavingsVault: amount must be > 0");
        require(apyBps[lockPeriodDays] > 0, "SavingsVault: invalid lock period");

        if (goalIndex > 0) {
            require(goalIndex <= _goals[msg.sender].length, "SavingsVault: invalid goal");
            require(_goals[msg.sender][goalIndex - 1].active, "SavingsVault: goal not active");
        }

        uint256 yieldAmount = calculateYield(amount, lockPeriodDays);
        require(yieldPool[token] >= yieldAmount, "SavingsVault: insufficient yield pool");

        yieldPool[token] -= yieldAmount;

        bool success = IERC20(token).transferFrom(msg.sender, address(this), amount);
        require(success, "SavingsVault: transfer failed");

        uint256 maturityTime = block.timestamp + (lockPeriodDays * 1 days);

        _positions[msg.sender].push(
            Position({
                token: token,
                amount: amount,
                lockPeriodDays: lockPeriodDays,
                startTime: block.timestamp,
                maturityTime: maturityTime,
                claimed: false,
                goalIndex: goalIndex
            })
        );

        // Actualizar meta si aplica
        if (goalIndex > 0) {
            SavingsGoal storage goal = _goals[msg.sender][goalIndex - 1];
            goal.savedAmount += amount;

            if (goal.savedAmount >= goal.targetAmount) {
                emit GoalCompleted(msg.sender, goalIndex, goal.name);
            }
        }

        // Actualizar racha
        _updateStreak(msg.sender);

        emit Deposited(msg.sender, token, amount, lockPeriodDays, maturityTime, goalIndex);
    }

    // ─── Claim ───────────────────────────────────────────────────────────────

    /// @notice Reclama principal + yield al vencimiento (menos comisión del protocolo)
    /// @param positionIndex Índice de la posición del usuario
    function claim(uint256 positionIndex) external {
        Position[] storage userPositions = _positions[msg.sender];
        require(positionIndex < userPositions.length, "SavingsVault: invalid index");

        Position storage pos = userPositions[positionIndex];
        require(!pos.claimed, "SavingsVault: already claimed");
        require(block.timestamp >= pos.maturityTime, "SavingsVault: not yet matured");

        pos.claimed = true;

        uint256 grossYield = calculateYield(pos.amount, pos.lockPeriodDays);

        // Comisión del protocolo (10% del yield — totalmente transparente)
        uint256 fee = (grossYield * protocolFeeBps) / 10000;
        uint256 netYield = grossYield - fee;

        uint256 totalToUser = pos.amount + netYield;

        // Transferir al usuario
        bool s1 = IERC20(pos.token).transfer(msg.sender, totalToUser);
        require(s1, "SavingsVault: user transfer failed");

        // Transferir comisión al protocolo
        if (fee > 0) {
            bool s2 = IERC20(pos.token).transfer(feeRecipient, fee);
            require(s2, "SavingsVault: fee transfer failed");
        }

        emit Claimed(msg.sender, positionIndex, pos.amount, netYield, fee);
    }

    // ─── Admin ───────────────────────────────────────────────────────────────

    /// @notice Fondear el yield pool (solo owner)
    function fundYieldPool(address token, uint256 amount) external onlyOwner {
        require(amount > 0, "SavingsVault: amount must be > 0");
        bool success = IERC20(token).transferFrom(msg.sender, address(this), amount);
        require(success, "SavingsVault: transfer failed");
        yieldPool[token] += amount;
        emit YieldPoolFunded(token, amount);
    }

    /// @notice Actualizar comisión del protocolo (máximo 20%)
    function setProtocolFee(uint256 newFeeBps) external onlyOwner {
        require(newFeeBps <= 2000, "SavingsVault: fee too high");
        protocolFeeBps = newFeeBps;
    }

    /// @notice Actualizar receptor de comisiones
    function setFeeRecipient(address newRecipient) external onlyOwner {
        require(newRecipient != address(0), "SavingsVault: zero address");
        feeRecipient = newRecipient;
    }

    // ─── View Functions ──────────────────────────────────────────────────────

    function getPositions(address user) external view returns (Position[] memory) {
        return _positions[user];
    }

    function getPositionCount(address user) external view returns (uint256) {
        return _positions[user].length;
    }

    function getGoals(address user) external view returns (SavingsGoal[] memory) {
        return _goals[user];
    }

    function getGoalCount(address user) external view returns (uint256) {
        return _goals[user].length;
    }

    /// @notice Calcula el yield bruto (antes de comisión)
    function calculateYield(uint256 amount, uint256 lockPeriodDays) public view returns (uint256) {
        uint256 apy = apyBps[lockPeriodDays];
        require(apy > 0, "SavingsVault: invalid lock period");
        return (amount * apy * lockPeriodDays) / (365 * 10000);
    }

    /// @notice Calcula el yield neto (después de comisión del protocolo)
    function calculateNetYield(uint256 amount, uint256 lockPeriodDays) public view returns (uint256) {
        uint256 gross = calculateYield(amount, lockPeriodDays);
        uint256 fee = (gross * protocolFeeBps) / 10000;
        return gross - fee;
    }

    // ─── Internal ────────────────────────────────────────────────────────────

    function _updateStreak(address user) internal {
        uint256 last = lastDepositTime[user];
        uint256 daysSinceLast = (block.timestamp - last) / 1 days;

        if (last == 0 || daysSinceLast > 30) {
            // Primera vez o racha rota
            streak[user] = 1;
        } else {
            streak[user] += 1;
        }

        lastDepositTime[user] = block.timestamp;
        emit StreakUpdated(user, streak[user]);
    }
}
