// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/SavingsVault.sol";
import "../src/MockERC20.sol";

contract SavingsVaultTest is Test {
    SavingsVault vault;
    MockERC20 token;

    address owner = address(1);
    address alice = address(2);
    address bob = address(3);

    uint256 constant DEPOSIT_AMOUNT = 1000 ether;
    uint256 constant YIELD_POOL_AMOUNT = 500 ether;

    function setUp() public {
        vm.startPrank(owner);
        vault = new SavingsVault();
        token = new MockERC20("Test USDC", "USDC");

        // Fund yield pool
        token.mint(owner, YIELD_POOL_AMOUNT);
        token.approve(address(vault), YIELD_POOL_AMOUNT);
        vault.fundYieldPool(address(token), YIELD_POOL_AMOUNT);
        vm.stopPrank();

        // Fund alice
        token.mint(alice, DEPOSIT_AMOUNT);
    }

    // ─── calculateYield ───────────────────────────────────────────────────────

    function test_calculateYield_30days() public view {
        // 1000 tokens * 500bps * 30 / (365 * 10000) ≈ 4.109...
        uint256 yield = vault.calculateYield(1000 ether, 30);
        assertGt(yield, 0);
        // Rough check: should be ~4.1 ether
        assertApproxEqAbs(yield, 4.109589041095890410 ether, 0.01 ether);
    }

    function test_calculateYield_60days() public view {
        uint256 yield = vault.calculateYield(1000 ether, 60);
        assertGt(yield, 0);
        // 1000 * 1200 * 60 / (365 * 10000) ≈ 19.72...
        assertApproxEqAbs(yield, 19.726027397260273972 ether, 0.01 ether);
    }

    function test_calculateYield_90days() public view {
        uint256 yield = vault.calculateYield(1000 ether, 90);
        assertGt(yield, 0);
        // 1000 * 2000 * 90 / (365 * 10000) ≈ 49.31...
        assertApproxEqAbs(yield, 49.315068493150684931 ether, 0.01 ether);
    }

    function test_calculateYield_invalidPeriod() public {
        vm.expectRevert("SavingsVault: invalid lock period");
        vault.calculateYield(1000 ether, 45);
    }

    // ─── deposit ─────────────────────────────────────────────────────────────

    function test_deposit_30days() public {
        vm.startPrank(alice);
        token.approve(address(vault), DEPOSIT_AMOUNT);
        vault.deposit(address(token), DEPOSIT_AMOUNT, 30);
        vm.stopPrank();

        SavingsVault.Position[] memory positions = vault.getPositions(alice);
        assertEq(positions.length, 1);
        assertEq(positions[0].amount, DEPOSIT_AMOUNT);
        assertEq(positions[0].lockPeriodDays, 30);
        assertEq(positions[0].claimed, false);
        assertEq(positions[0].maturityTime, block.timestamp + 30 days);
    }

    function test_deposit_multiplePositions() public {
        vm.startPrank(alice);
        token.approve(address(vault), DEPOSIT_AMOUNT);
        vault.deposit(address(token), DEPOSIT_AMOUNT / 2, 30);
        vault.deposit(address(token), DEPOSIT_AMOUNT / 2, 60);
        vm.stopPrank();

        assertEq(vault.getPositionCount(alice), 2);
    }

    function test_deposit_invalidPeriod() public {
        vm.startPrank(alice);
        token.approve(address(vault), DEPOSIT_AMOUNT);
        vm.expectRevert("SavingsVault: invalid lock period");
        vault.deposit(address(token), DEPOSIT_AMOUNT, 45);
        vm.stopPrank();
    }

    function test_deposit_zeroAmount() public {
        vm.startPrank(alice);
        token.approve(address(vault), DEPOSIT_AMOUNT);
        vm.expectRevert("SavingsVault: amount must be > 0");
        vault.deposit(address(token), 0, 30);
        vm.stopPrank();
    }

    // ─── claim ────────────────────────────────────────────────────────────────

    function test_claim_afterMaturity() public {
        uint256 depositAmount = 100 ether;

        vm.startPrank(alice);
        token.approve(address(vault), depositAmount);
        vault.deposit(address(token), depositAmount, 30);

        // Fast-forward past maturity
        vm.warp(block.timestamp + 31 days);

        uint256 balanceBefore = token.balanceOf(alice);
        vault.claim(0);
        uint256 balanceAfter = token.balanceOf(alice);

        uint256 received = balanceAfter - balanceBefore;
        uint256 expectedYield = vault.calculateYield(depositAmount, 30);
        uint256 expectedTotal = depositAmount + expectedYield;

        assertEq(received, expectedTotal);
        vm.stopPrank();
    }

    function test_claim_beforeMaturity_reverts() public {
        vm.startPrank(alice);
        token.approve(address(vault), DEPOSIT_AMOUNT);
        vault.deposit(address(token), DEPOSIT_AMOUNT, 30);

        // Only 10 days passed
        vm.warp(block.timestamp + 10 days);

        vm.expectRevert("SavingsVault: not yet matured");
        vault.claim(0);
        vm.stopPrank();
    }

    function test_claim_twice_reverts() public {
        vm.startPrank(alice);
        token.approve(address(vault), DEPOSIT_AMOUNT);
        vault.deposit(address(token), DEPOSIT_AMOUNT, 30);
        vm.warp(block.timestamp + 31 days);
        vault.claim(0);

        vm.expectRevert("SavingsVault: already claimed");
        vault.claim(0);
        vm.stopPrank();
    }

    function test_claim_invalidIndex_reverts() public {
        vm.startPrank(alice);
        vm.expectRevert("SavingsVault: invalid index");
        vault.claim(0);
        vm.stopPrank();
    }

    // ─── fundYieldPool ────────────────────────────────────────────────────────

    function test_fundYieldPool_onlyOwner() public {
        token.mint(alice, 100 ether);
        vm.startPrank(alice);
        token.approve(address(vault), 100 ether);
        vm.expectRevert("SavingsVault: not owner");
        vault.fundYieldPool(address(token), 100 ether);
        vm.stopPrank();
    }
}
