// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title SavingsVault - Monad DeFi Savings Platform
/// @notice Users deposit tokens, lock them for 30/60/90 days, and earn fixed APY
contract SavingsVault {
    // ─── Interfaces ──────────────────────────────────────────────────────────

    interface IERC20 {
        function transferFrom(address from, address to, uint256 amount) external returns (bool);
        function transfer(address to, uint256 amount) external returns (bool);
        function balanceOf(address account) external view returns (uint256);
    }

    // ─── Types ───────────────────────────────────────────────────────────────

    struct Position {
        address token;
        uint256 amount;
        uint256 lockPeriodDays;
        uint256 startTime;
        uint256 maturityTime;
        bool claimed;
    }

    // ─── State ───────────────────────────────────────────────────────────────

    address public owner;

    /// @notice Supported lock periods in days → APY in basis points (1 bp = 0.01%)
    mapping(uint256 => uint256) public apyBps;

    /// @notice user → list of positions
    mapping(address => Position[]) private _positions;

    /// @notice token → total yield pool balance available
    mapping(address => uint256) public yieldPool;

    // ─── Events ──────────────────────────────────────────────────────────────

    event Deposited(
        address indexed user,
        address indexed token,
        uint256 amount,
        uint256 lockPeriodDays,
        uint256 maturityTime
    );

    event Claimed(
        address indexed user,
        uint256 indexed positionIndex,
        uint256 principal,
        uint256 yield
    );

    event YieldPoolFunded(address indexed token, uint256 amount);

    // ─── Constructor ─────────────────────────────────────────────────────────

    constructor() {
        owner = msg.sender;

        // 30 days → 5% APY  (500 bps)
        apyBps[30] = 500;
        // 60 days → 12% APY (1200 bps)
        apyBps[60] = 1200;
        // 90 days → 20% APY (2000 bps)
        apyBps[90] = 2000;
    }

    // ─── Modifiers ───────────────────────────────────────────────────────────

    modifier onlyOwner() {
        require(msg.sender == owner, "SavingsVault: not owner");
        _;
    }

    // ─── External Functions ──────────────────────────────────────────────────

    /// @notice Deposit tokens and lock them for the chosen period
    /// @param token ERC20 token address
    /// @param amount Amount to deposit (in token's smallest unit)
    /// @param lockPeriodDays Must be 30, 60 or 90
    function deposit(address token, uint256 amount, uint256 lockPeriodDays) external {
        require(token != address(0), "SavingsVault: zero token address");
        require(amount > 0, "SavingsVault: amount must be > 0");
        require(apyBps[lockPeriodDays] > 0, "SavingsVault: invalid lock period");

        uint256 yieldAmount = calculateYield(amount, lockPeriodDays);
        require(
            yieldPool[token] >= yieldAmount,
            "SavingsVault: insufficient yield pool"
        );

        // Reserve yield
        yieldPool[token] -= yieldAmount;

        // Transfer principal from user
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
                claimed: false
            })
        );

        emit Deposited(msg.sender, token, amount, lockPeriodDays, maturityTime);
    }

    /// @notice Claim principal + yield after maturity
    /// @param positionIndex Index in the user's positions array
    function claim(uint256 positionIndex) external {
        Position[] storage userPositions = _positions[msg.sender];
        require(positionIndex < userPositions.length, "SavingsVault: invalid index");

        Position storage pos = userPositions[positionIndex];
        require(!pos.claimed, "SavingsVault: already claimed");
        require(block.timestamp >= pos.maturityTime, "SavingsVault: not yet matured");

        pos.claimed = true;

        uint256 yieldAmount = calculateYield(pos.amount, pos.lockPeriodDays);
        uint256 total = pos.amount + yieldAmount;

        bool success = IERC20(pos.token).transfer(msg.sender, total);
        require(success, "SavingsVault: transfer failed");

        emit Claimed(msg.sender, positionIndex, pos.amount, yieldAmount);
    }

    /// @notice Fund the yield pool for a given token (owner only)
    /// @param token ERC20 token address
    /// @param amount Amount to add to the yield pool
    function fundYieldPool(address token, uint256 amount) external onlyOwner {
        require(amount > 0, "SavingsVault: amount must be > 0");

        bool success = IERC20(token).transferFrom(msg.sender, address(this), amount);
        require(success, "SavingsVault: transfer failed");

        yieldPool[token] += amount;

        emit YieldPoolFunded(token, amount);
    }

    // ─── View Functions ──────────────────────────────────────────────────────

    /// @notice Get all positions for a user
    function getPositions(address user) external view returns (Position[] memory) {
        return _positions[user];
    }

    /// @notice Get number of positions for a user
    function getPositionCount(address user) external view returns (uint256) {
        return _positions[user].length;
    }

    /// @notice Calculate the yield for a given deposit
    /// @param amount Principal amount
    /// @param lockPeriodDays Lock period (30, 60, or 90)
    /// @return Yield amount in token units
    function calculateYield(uint256 amount, uint256 lockPeriodDays) public view returns (uint256) {
        uint256 apy = apyBps[lockPeriodDays];
        require(apy > 0, "SavingsVault: invalid lock period");

        // yield = amount * apy * lockDays / (365 * 10000)
        return (amount * apy * lockPeriodDays) / (365 * 10000);
    }
}
