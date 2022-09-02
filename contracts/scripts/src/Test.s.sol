/// SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.16;

import "forge-std/Script.sol";

contract HelloWorld {}

contract TestScript is Script {
  function run() external {
    vm.startBroadcast();
    new HelloWorld();
    vm.stopBroadcast();
  }
}
