/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import "forge-std/Script.sol";
import { EmptyUUPS } from "@lightdotso/empty/EmptyUUPS.sol";
import { ILightOrb } from "@lightdotso/orb/ILightOrb.sol";
import { LightOrb } from "@lightdotso/orb/LightOrb.sol";
import { UUPSProxy } from "@lightdotso/proxies/UUPSProxy.sol";

contract LightDeployerScript is Script {
  EmptyUUPS public emptyUUPS;
  UUPSProxy public proxyLightOrb;
  ILightOrb public implementationLightOrb;
  LightOrb public wrappedLightOrb;

  function run() external {
    vm.startBroadcast();
    emptyUUPS = new EmptyUUPS();
    implementationLightOrb = new LightOrb();

    proxyLightOrb = new UUPSProxy(address(emptyUUPS), "");

    EmptyUUPS(address(proxyLightOrb)).initialize();
    EmptyUUPS(address(proxyLightOrb)).upgradeTo(
      address(implementationLightOrb)
    );

    wrappedLightOrb = LightOrb(address(proxyLightOrb));
    wrappedLightOrb.initialize("Light Orb", "LORB");
    wrappedLightOrb.mint();

    vm.stopBroadcast();
  }
}
