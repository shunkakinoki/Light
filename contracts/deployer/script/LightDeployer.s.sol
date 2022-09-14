/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import "forge-std/Script.sol";
import { ILightOrb } from "@lightdotso/orb/ILightOrb.sol";
import { LightOrb } from "@lightdotso/orb/LightOrb.sol";

contract LightDeployer is Script {
  ILightOrb lightOrb;

  function run() external {
    vm.startBroadcast();
    lightOrb = new LightOrb();
    lightOrb.initialize("Light Orb", "LORB");
    lightOrb.mint();
    vm.stopBroadcast();
  }
}
