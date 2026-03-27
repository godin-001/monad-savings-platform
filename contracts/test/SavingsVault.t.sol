// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/SavingsVault.sol";
import "../src/MockERC20.sol";

contract SavingsVaultTest is Test {
    SavingsVault vault;
    MockERC20 token;

    address owner = address(1);
    address feeRecipient = address(99);
    address alice = address(2);
    address bob = address(3);

    uint256 constant DEPOSIT = 1000 ether;
    uint256 constant YIELD_POOL = 500 ether;

    function setUp() public {
        vm.startPrank(owner);
        vault = new SavingsVault(feeRecipient);
        token = new MockERC20("Mock USDC", "mUSDC");

        token.mint(owner, YIELD_POOL);
        token.approve(address(vault), YIELD_POOL);
        vault.fundYieldPool(address(token), YIELD_POOL);
        vm.stopPrank();

        token.mint(alice, DEPOSIT);
        token.mint(bob, DEPOSIT);
    }

    // ─── calculateYield ───────────────────────────────────────────────────────

    function test_calculateYield_30days() public view {
        uint256 y = vault.calculateYield(1000 ether, 30);
        assertApproxEqAbs(y, 4.109589041095890410 ether, 0.01 ether);
    }

    function test_calculateYield_60days() public view {
        uint256 y = vault.calculateYield(1000 ether, 60);
        assertApproxEqAbs(y, 19.726027397260273972 ether, 0.01 ether);
    }

    function test_calculateYield_90days() public view {
        uint256 y = vault.calculateYield(1000 ether, 90);
        assertApproxEqAbs(y, 49.315068493150684931 ether, 0.01 ether);
    }

    function test_calculateNetYield_deductsFee() public view {
        uint256 gross = vault.calculateYield(1000 ether, 30);
        uint256 net = vault.calculateNetYield(1000 ether, 30);
        uint256 fee = gross - net;
        // Fee = 10% of gross
        assertApproxEqAbs(fee, gross / 10, 1);
    }

    // ─── deposit ─────────────────────────────────────────────────────────────

    function test_deposit_noGoal() public {
        vm.startPrank(alice);
        token.approve(address(vault), DEPOSIT);
        vault.deposit(address(token), DEPOSIT, 30, 0);
        vm.stopPrank();

        SavingsVault.Position[] memory positions = vault.getPositions(alice);
        assertEq(positions.length, 1);
        assertEq(positions[0].amount, DEPOSIT);
        assertEq(positions[0].lockPeriodDays, 30);
        assertEq(positions[0].goalIndex, 0);
        assertEq(positions[0].claimed, false);
    }

    function test_deposit_withGoal() public {
        vm.startPrank(alice);

        // Crear meta: "Viaje a Japón" con objetivo de 500 tokens
        vault.createGoal("Viaje a Jap\xc3\xb3n", 500 ether);

        token.approve(address(vault), DEPOSIT);
        vault.deposit(address(token), DEPOSIT, 30, 1);
        vm.stopPrank();

        // Goal savedAmount actualizado
        SavingsVault.SavingsGoal[] memory goals = vault.getGoals(alice);
        assertEq(goals[0].savedAmount, DEPOSIT);
        assertGe(goals[0].savedAmount, goals[0].targetAmount); // Meta alcanzada
    }

    function test_deposit_updatesStreak() public {
        vm.startPrank(alice);
        token.approve(address(vault), DEPOSIT);
        vault.deposit(address(token), DEPOSIT / 2, 30, 0);
        assertEq(vault.streak(alice), 1);
        vault.deposit(address(token), DEPOSIT / 2, 30, 0);
        assertEq(vault.streak(alice), 2);
        vm.stopPrank();
    }

    function test_deposit_invalidPeriod_reverts() public {
        vm.startPrank(alice);
        token.approve(address(vault), DEPOSIT);
        vm.expectRevert("SavingsVault: invalid lock period");
        vault.deposit(address(token), DEPOSIT, 45, 0);
        vm.stopPrank();
    }

    function test_deposit_zeroAmount_reverts() public {
        vm.startPrank(alice);
        token.approve(address(vault), DEPOSIT);
        vm.expectRevert("SavingsVault: amount must be > 0");
        vault.deposit(address(token), 0, 30, 0);
        vm.stopPrank();
    }

    // ─── claim ────────────────────────────────────────────────────────────────

    function test_claim_afterMaturity() public {
        uint256 amt = 100 ether;

        vm.startPrank(alice);
        token.approve(address(vault), amt);
        vault.deposit(address(token), amt, 30, 0);
        vm.warp(block.timestamp + 31 days);

        uint256 before = token.balanceOf(alice);
        vault.claim(0);
        uint256 received = token.balanceOf(alice) - before;

        uint256 netYield = vault.calculateNetYield(amt, 30);
        assertEq(received, amt + netYield);
        vm.stopPrank();
    }

    function test_claim_sendsFeeToRecipient() public {
        uint256 amt = 100 ether;

        vm.startPrank(alice);
        token.approve(address(vault), amt);
        vault.deposit(address(token), amt, 30, 0);
        vm.warp(block.timestamp + 31 days);

        uint256 feeBefore = token.balanceOf(feeRecipient);
        vault.claim(0);
        uint256 feeReceived = token.balanceOf(feeRecipient) - feeBefore;

        uint256 gross = vault.calculateYield(amt, 30);
        uint256 expectedFee = (gross * 1000) / 10000; // 10%
        assertEq(feeReceived, expectedFee);
        vm.stopPrank();
    }

    function test_claim_beforeMaturity_reverts() public {
        vm.startPrank(alice);
        token.approve(address(vault), DEPOSIT);
        vault.deposit(address(token), DEPOSIT, 30, 0);
        vm.warp(block.timestamp + 10 days);
        vm.expectRevert("SavingsVault: not yet matured");
        vault.claim(0);
        vm.stopPrank();
    }

    function test_claim_twice_reverts() public {
        vm.startPrank(alice);
        token.approve(address(vault), DEPOSIT);
        vault.deposit(address(token), DEPOSIT, 30, 0);
        vm.warp(block.timestamp + 31 days);
        vault.claim(0);
        vm.expectRevert("SavingsVault: already claimed");
        vault.claim(0);
        vm.stopPrank();
    }

    // ─── goals ────────────────────────────────────────────────────────────────

    function test_createGoal() public {
        vm.startPrank(alice);
        uint256 idx = vault.createGoal("Fondo de emergencia", 300 ether);
        assertEq(idx, 1);

        SavingsVault.SavingsGoal[] memory goals = vault.getGoals(alice);
        assertEq(goals.length, 1);
        assertEq(goals[0].targetAmount, 300 ether);
        assertEq(goals[0].savedAmount, 0);
        assertEq(goals[0].active, true);
        vm.stopPrank();
    }

    function test_createGoal_emptyName_reverts() public {
        vm.startPrank(alice);
        vm.expectRevert("SavingsVault: empty name");
        vault.createGoal("", 100 ether);
        vm.stopPrank();
    }

    // ─── admin ────────────────────────────────────────────────────────────────

    function test_setProtocolFee_onlyOwner() public {
        vm.startPrank(alice);
        vm.expectRevert("SavingsVault: not owner");
        vault.setProtocolFee(500);
        vm.stopPrank();
    }

    function test_setProtocolFee_tooHigh_reverts() public {
        vm.startPrank(owner);
        vm.expectRevert("SavingsVault: fee too high");
        vault.setProtocolFee(2001);
        vm.stopPrank();
    }

    function test_fundYieldPool_onlyOwner() public {
        token.mint(alice, 100 ether);
        vm.startPrank(alice);
        token.approve(address(vault), 100 ether);
        vm.expectRevert("SavingsVault: not owner");
        vault.fundYieldPool(address(token), 100 ether);
        vm.stopPrank();
    }
}
