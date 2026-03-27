// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/SavingsVault.sol";
import "../src/MockERC20.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        vm.startBroadcast(deployerPrivateKey);

        // 1. Deploy SavingsVault
        SavingsVault vault = new SavingsVault();
        console.log("SavingsVault deployed at:", address(vault));

        // 2. Deploy MockERC20 (for testnet demo)
        MockERC20 mockToken = new MockERC20("Mock USDC", "mUSDC");
        console.log("MockERC20 deployed at:", address(mockToken));

        // 3. Mint tokens to deployer
        uint256 mintAmount = 1_000_000 ether;
        mockToken.mint(deployer, mintAmount);
        console.log("Minted", mintAmount / 1 ether, "mUSDC to deployer");

        // 4. Fund yield pool with 100k tokens
        uint256 yieldPoolAmount = 100_000 ether;
        mockToken.approve(address(vault), yieldPoolAmount);
        vault.fundYieldPool(address(mockToken), yieldPoolAmount);
        console.log("Funded yield pool with", yieldPoolAmount / 1 ether, "mUSDC");

        vm.stopBroadcast();

        // Print summary
        console.log("\n=== Deployment Summary ===");
        console.log("Network:       Monad Testnet");
        console.log("Deployer:      ", deployer);
        console.log("SavingsVault:  ", address(vault));
        console.log("MockUSDC:      ", address(mockToken));
        console.log("==========================\n");
    }
}
