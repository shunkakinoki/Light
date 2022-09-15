/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import "forge-std/Script.sol";
import { EmptyUUPS } from "@lightdotso/empty/EmptyUUPS.sol";
import { ILightController } from "@lightdotso/controller/ILightController.sol";
import { LightController } from "@lightdotso/controller/LightController.sol";
import { UUPSProxy } from "@lightdotso/proxies/UUPSProxy.sol";

contract LightDeployerScript is Script {
  EmptyUUPS public emptyUUPS;
  UUPSProxy public proxyLightController;
  ILightController public implementationLightController;
  LightController public wrappedLightController;

  function run() external {
    vm.startBroadcast();

    emptyUUPS = new EmptyUUPS();
    implementationLightController = new LightController();
    proxyLightController = new UUPSProxy(address(emptyUUPS), "");

    EmptyUUPS(address(proxyLightController)).initialize();
    EmptyUUPS(address(proxyLightController)).upgradeTo(
      address(implementationLightController)
    );

    wrappedLightController = LightController(address(proxyLightController));
    wrappedLightController.initialize();

    vm.stopBroadcast();
  }
}
