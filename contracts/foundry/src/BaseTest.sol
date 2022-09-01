// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;
import "forge-std/Test.sol";
import "./SlotTest.sol";
import "./Utils.sol";

import { UUPSProxy } from "@lightdotso/proxies/UUPSProxy.sol";
import { LightCore } from "@lightdotso/core/LightCore.sol";
import { LightController } from "@lightdotso/controller/LightController.sol";
import { LightOperatorStore } from "@lightdotso/protocol/LightOperatorStore.sol";
import { LightOrb } from "@lightdotso/protocol/LightOrb.sol";
import { LightOrbFactory } from "@lightdotso/protocol/LightOrbFactory.sol";
import { LightSpace } from "@lightdotso/protocol/LightSpace.sol";
import { LightXP } from "@lightdotso/protocol/LightXP.sol";

import { Empty } from "@lightdotso/proxies/utils/Empty.sol";
import { EmptyUUPS } from "@lightdotso/proxies/utils/EmptyUUPS.sol";
import { EmptyUUPSBeacon } from "@lightdotso/proxies/utils/EmptyUUPSBeacon.sol";

contract BaseTest is Test, SlotTest, Utils {
  Empty internal empty;
  EmptyUUPS internal emptyUUPS;
  EmptyUUPSBeacon internal emptyUUPSBeacon;

  UUPSProxy internal proxyLightCore;
  UUPSProxy internal proxyLightController;
  UUPSProxy internal proxyLightOperatorStore;
  UUPSProxy internal proxyLightOrb;
  UUPSProxy internal proxyLightOrbFactory;
  UUPSProxy internal proxyLightSpace;
  UUPSProxy internal proxyLightXP;

  LightCore internal implementationLightCore;
  LightController internal implementationLightController;
  LightOperatorStore internal implementationLightOperatorStore;
  LightOrb internal implementationLightOrb;
  LightOrbFactory internal implementationLightOrbFactory;
  LightSpace internal implementationLightSpace;
  LightXP internal implementationLightXP;

  LightCore internal wrappedLightCore;
  LightController internal wrappedLightController;
  LightOperatorStore internal wrappedLightOperatorStore;
  LightOrb internal wrappedLightOrb;
  LightOrbFactory internal wrappedLightOrbFactory;
  LightSpace internal wrappedLightSpace;
  LightXP internal wrappedLightXP;

  event AdminChanged(address previousAdmin, address newAdmin);
  event ContractSynced(bytes32 indexed nameHash, address contractAddress);
  event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner
  );
  event Initialized(uint8 version);
  event Upgraded(address indexed implementation);
  event SetController(address controller);
  event SetOperator(address operator);

  function setUpEmpties() public {
    empty = new Empty();
    emptyUUPS = new EmptyUUPS();
    emptyUUPSBeacon = new EmptyUUPSBeacon();
  }

  function setUpEmptyProxies() public {
    proxyLightCore = new UUPSProxy(address(emptyUUPS), "");
    proxyLightController = new UUPSProxy(address(emptyUUPS), "");
    proxyLightOperatorStore = new UUPSProxy(address(emptyUUPS), "");
    proxyLightOrb = new UUPSProxy(address(emptyUUPS), "");
    proxyLightOrbFactory = new UUPSProxy(address(emptyUUPSBeacon), "");
    proxyLightSpace = new UUPSProxy(address(emptyUUPS), "");
    proxyLightXP = new UUPSProxy(address(emptyUUPS), "");
  }

  function setUpEmptyProxyInitializations() public {
    vm.expectEmit(true, true, false, true);
    vm.expectEmit(true, false, false, true);
    emit OwnershipTransferred(address(0), address(this));
    emit Initialized(1);
    EmptyUUPS(address(proxyLightCore)).initialize();

    vm.expectEmit(true, true, false, true);
    vm.expectEmit(true, false, false, true);
    emit OwnershipTransferred(address(0), address(this));
    emit Initialized(1);
    EmptyUUPS(address(proxyLightController)).initialize();

    vm.expectEmit(true, true, false, true);
    vm.expectEmit(true, false, false, true);
    emit OwnershipTransferred(address(0), address(this));
    emit Initialized(1);
    EmptyUUPS(address(proxyLightOperatorStore)).initialize();

    vm.expectEmit(true, true, false, true);
    vm.expectEmit(true, false, false, true);
    emit OwnershipTransferred(address(0), address(this));
    emit Initialized(1);
    EmptyUUPS(address(proxyLightOrb)).initialize();

    empty = new Empty();
    vm.expectEmit(true, true, false, true);
    vm.expectEmit(true, false, false, true);
    emit OwnershipTransferred(address(0), address(this));
    emit Initialized(1);
    EmptyUUPSBeacon(address(proxyLightOrbFactory)).initialize(address(empty));

    vm.expectEmit(true, true, false, true);
    vm.expectEmit(true, false, false, true);
    emit OwnershipTransferred(address(0), address(this));
    emit Initialized(1);
    EmptyUUPS(address(proxyLightSpace)).initialize();

    vm.expectEmit(true, true, false, true);
    vm.expectEmit(true, false, false, true);
    emit OwnershipTransferred(address(0), address(this));
    emit Initialized(1);
    EmptyUUPS(address(proxyLightXP)).initialize();
  }

  function setUpLightImplementations() public {
    implementationLightCore = new LightCore();
    implementationLightController = new LightController();
    implementationLightOperatorStore = new LightOperatorStore();
    implementationLightOrb = new LightOrb();
    implementationLightOrbFactory = new LightOrbFactory();
    implementationLightSpace = new LightSpace();
    implementationLightXP = new LightXP();
  }

  function setUpLightProxyUpgrades() public {
    vm.expectEmit(true, false, false, true);
    emit Upgraded(address(implementationLightCore));
    EmptyUUPS(address(proxyLightCore)).upgradeTo(
      address(implementationLightCore)
    );

    vm.expectEmit(true, false, false, true);
    emit Upgraded(address(implementationLightController));
    EmptyUUPS(address(proxyLightController)).upgradeTo(
      address(implementationLightController)
    );

    vm.expectEmit(true, false, false, true);
    emit Upgraded(address(implementationLightOperatorStore));
    EmptyUUPS(address(proxyLightOperatorStore)).upgradeTo(
      address(implementationLightOperatorStore)
    );

    vm.expectEmit(true, false, false, true);
    emit Upgraded(address(implementationLightOrb));
    EmptyUUPS(address(proxyLightOrb)).upgradeTo(
      address(implementationLightOrb)
    );

    vm.expectEmit(true, false, false, true);
    emit Upgraded(address(implementationLightOrbFactory));
    EmptyUUPSBeacon(address(proxyLightOrbFactory)).upgradeTo(
      address(implementationLightOrbFactory)
    );

    vm.expectEmit(true, false, false, true);
    emit Upgraded(address(implementationLightSpace));
    EmptyUUPS(address(proxyLightSpace)).upgradeTo(
      address(implementationLightSpace)
    );

    vm.expectEmit(true, false, false, true);
    emit Upgraded(address(implementationLightXP));
    EmptyUUPS(address(proxyLightXP)).upgradeTo(address(implementationLightXP));
  }

  function setUpWrappedLightProxies() public {
    wrappedLightCore = LightCore(address(proxyLightCore));
    vm.label(address(wrappedLightCore), "Wrapped Light Core");
    wrappedLightController = LightController(address(proxyLightController));
    vm.label(address(wrappedLightController), "Wrapped Light Controller");
    wrappedLightOperatorStore = LightOperatorStore(
      address(proxyLightOperatorStore)
    );
    vm.label(
      address(wrappedLightOperatorStore),
      "Wrapped Light Operator Store"
    );
    wrappedLightOrb = LightOrb(address(proxyLightOrb));
    vm.label(address(wrappedLightOrb), "Wrapped Light Orb");
    wrappedLightOrbFactory = LightOrbFactory(address(proxyLightOrbFactory));
    vm.label(address(wrappedLightOrbFactory), "Wrapped Light Orb Factory");
    wrappedLightSpace = LightSpace(address(proxyLightSpace));
    vm.label(address(wrappedLightSpace), "Wrapped Light Space");
    wrappedLightXP = LightXP(address(proxyLightXP));
    vm.label(address(wrappedLightXP), "Wrapped Light XP");
  }

  function setUpLightController() public {
    wrappedLightController.initialize();
    wrappedLightController.setContractProxy(
      keccak256("LightCore"),
      address(proxyLightCore)
    );
    wrappedLightController.setContractProxy(
      keccak256("LightOperatorStore"),
      address(proxyLightOperatorStore)
    );
    wrappedLightController.setContractProxy(
      keccak256("LightOrb"),
      address(proxyLightOrb)
    );
    wrappedLightController.setContractProxy(
      keccak256("LightOrbFactory"),
      address(proxyLightOrbFactory)
    );
    wrappedLightController.setContractProxy(
      keccak256("LightSpace"),
      address(proxyLightSpace)
    );
  }

  function setUpLightProxies() public {
    setUpEmpties();
    setUpEmptyProxies();
    setUpLightImplementations();
    setUpEmptyProxyInitializations();
    setUpLightProxyUpgrades();
    setUpWrappedLightProxies();
    setUpLightController();
  }
}
