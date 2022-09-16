/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import "forge-std/Script.sol";
import "forge-std/StdJson.sol";
import { EmptyUUPS } from "@lightdotso/empty/EmptyUUPS.sol";
import { ILightController } from "@lightdotso/controller/ILightController.sol";
import { LightController } from "@lightdotso/controller/LightController.sol";
import { UUPSProxy } from "@lightdotso/proxies/UUPSProxy.sol";

contract LightControllerDeployerScript is Script {
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

    string memory root = vm.projectRoot();
    string memory path = string.concat(root, "/contracts/config/mainnet.json");
    string memory json = vm.readFile(path);

    address proxyLightCore = stdJson.readAddress(json, ".LightCore");
    address proxyLightOperatorStore = stdJson.readAddress(
      json,
      ".LightOperatorStore"
    );
    address proxyLightOrb = stdJson.readAddress(json, ".LightOrb");
    address proxyLightOrbFactory = stdJson.readAddress(
      json,
      ".LightOrbFactory"
    );
    address proxyLightSpace = stdJson.readAddress(json, ".LightSpace");

    wrappedLightController.setContractProxy(
      keccak256("LightCore"),
      proxyLightCore
    );
    wrappedLightController.setContractProxy(
      keccak256("LightOperatorStore"),
      proxyLightOperatorStore
    );
    wrappedLightController.setContractProxy(
      keccak256("LightOrb"),
      proxyLightOrb
    );
    wrappedLightController.setContractProxy(
      keccak256("LightOrbFactory"),
      proxyLightOrbFactory
    );
    wrappedLightController.setContractProxy(
      keccak256("LightSpace"),
      proxyLightSpace
    );

    vm.stopBroadcast();
  }
}
