// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;
import "forge-std/Test.sol";
import "./SlotTest.sol";

import { UUPSProxy } from "@lightdotso/proxies/UUPSProxy.sol";
import { LightOrb } from "@lightdotso/protocol/LightOrb.sol";
import { LightOrbFactory } from "@lightdotso/protocol/LightOrbFactory.sol";
import { LightSpace } from "@lightdotso/protocol/LightSpace.sol";

import { Empty } from "@lightdotso/proxies/utils/Empty.sol";
import { EmptyUUPS } from "@lightdotso/proxies/utils/EmptyUUPS.sol";
import { EmptyUUPSBeacon } from "@lightdotso/proxies/utils/EmptyUUPSBeacon.sol";

contract BaseTest is Test, SlotTest {
  Empty internal empty;
  EmptyUUPS internal emptyUUPS;
  EmptyUUPSBeacon internal emptyUUPSBeacon;

  UUPSProxy internal proxyLightOrb;
  UUPSProxy internal proxyLightOrbFactory;
  UUPSProxy internal proxyLightSpace;

  LightOrb internal implementationLightOrb;
  LightOrbFactory internal implementationLightOrbFactory;
  LightSpace internal implementationLightSpace;

  LightOrb internal wrappedLightOrb;
  LightOrbFactory internal wrappedLightOrbFactory;
  LightSpace internal wrappedLightSpace;

  event AdminChanged(address previousAdmin, address newAdmin);
  event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner
  );
  event Initialized(uint8 version);
  event Upgraded(address indexed implementation);

  function setUpEmpties() public {
    empty = new Empty();
    emptyUUPS = new EmptyUUPS();
    emptyUUPSBeacon = new EmptyUUPSBeacon();
  }

  function setUpEmptyProxies() public {
    proxyLightOrb = new UUPSProxy(address(emptyUUPS), "");
    proxyLightOrbFactory = new UUPSProxy(address(emptyUUPSBeacon), "");
    proxyLightSpace = new UUPSProxy(address(emptyUUPS), "");
  }

  function setUpEmptyProxyInitializations() public {
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
  }

  function setUpLightImplementations() public {
    implementationLightOrb = new LightOrb();
    implementationLightOrbFactory = new LightOrbFactory();
    implementationLightSpace = new LightSpace();
  }

  function setUpLightProxyUpgrades() public {
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
  }

  function setUpWrappedLightProxies() public {
    wrappedLightOrb = LightOrb(address(proxyLightOrb));
    wrappedLightOrbFactory = LightOrbFactory(address(proxyLightOrbFactory));
    wrappedLightSpace = LightSpace(address(proxyLightSpace));
  }

  function setUpLightProxies() public {
    setUpEmpties();
    setUpEmptyProxies();
    setUpLightImplementations();
    setUpEmptyProxyInitializations();
    setUpLightProxyUpgrades();
    setUpWrappedLightProxies();
  }
}
