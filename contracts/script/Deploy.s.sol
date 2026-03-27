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

        // 1. Deploy SavingsVault (feeRecipient = deployer para demo)
        SavingsVault vault = new SavingsVault(deployer);
        console.log("SavingsVault deployed at:", address(vault));

        // 2. Deploy MockUSDC
        MockERC20 mockToken = new MockERC20("Mock USDC", "mUSDC");
        console.log("MockUSDC deployed at:", address(mockToken));

        // 3. Mint tokens al deployer
        uint256 mintAmount = 1_000_000 ether;
        mockToken.mint(deployer, mintAmount);

        // 4. Fondear yield pool con 100k tokens
        uint256 yieldPoolAmount = 100_000 ether;
        mockToken.approve(address(vault), yieldPoolAmount);
        vault.fundYieldPool(address(mockToken), yieldPoolAmount);
        console.log("Yield pool funded with 100,000 mUSDC");

        vm.stopBroadcast();

        console.log("\n========== DEPLOYMENT SUMMARY ==========");
        console.log("Network:       Monad Testnet (10143)");
        console.log("Deployer:      ", deployer);
        console.log("SavingsVault:  ", address(vault));
        console.log("MockUSDC:      ", address(mockToken));
        console.log("Protocol Fee:  10%% of yield (transparent)");
        console.log("=========================================\n");
        console.log("Next: update CONTRACT_ADDRESSES in frontend/lib/contracts.ts");
    }
}
