// SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.13;

import "forge-std/Script.sol";

contract GnosisScript is Script {
  function run() external {
    vm.startBroadcast();

    vm.stopBroadcast();
  }
}
