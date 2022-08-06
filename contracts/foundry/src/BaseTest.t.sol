// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;
import "forge-std/Test.sol";
import "./SlotTest.t.sol";

import "@lightdotso/proxies/UUPSProxy.sol";
import "@lightdotso/protocol/LightOrb.sol";
import "@lightdotso/protocol/LightSpace.sol";
import "@lightdotso/protocol/LightSpaceFactory.sol";

import { Empty } from "@lightdotso/proxies/utils/Empty.sol";
import { EmptyUUPS } from "@lightdotso/proxies/utils/EmptyUUPS.sol";
import { EmptyUUPSBeacon } from "@lightdotso/proxies/utils/EmptyUUPSBeacon.sol";

contract BaseTest is Test, SlotTest {
  Empty internal empty;
  EmptyUUPS internal emptyUUPS;
  EmptyUUPSBeacon internal emptyUUPSBeacon;

  UUPSProxy internal proxyLightOrb;
  UUPSProxy internal proxyLightSpace;
  UUPSProxy internal proxyLightSpaceFactory;

  LightOrb internal implementationLightOrb;
  LightSpace internal implementationLightSpace;
  LightSpaceFactory internal implementationLightSpaceFactory;

  LightOrb internal wrappedLightOrb;
  LightSpace internal wrappedLightSpace;
  LightSpaceFactory internal wrappedLightSpaceFactory;

  event AdminChanged(address previousAdmin, address newAdmin);
  event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner
  );
  event Initialized(uint8 version);
  event Upgraded(address indexed implementation);

  function deployLightProxies() public {
    empty = new Empty();
    emptyUUPS = new EmptyUUPS();
    emptyUUPSBeacon = new EmptyUUPSBeacon();

    implementationLightOrb = new LightOrb();
    implementationLightSpace = new LightSpace();
    implementationLightSpaceFactory = new LightSpaceFactory();

    proxyLightOrb = new UUPSProxy(address(emptyUUPS), "");
    proxyLightSpace = new UUPSProxy(address(emptyUUPS), "");
    proxyLightSpaceFactory = new UUPSProxy(address(emptyUUPSBeacon), "");

    vm.expectEmit(true, true, false, true);
    vm.expectEmit(true, false, false, true);
    emit OwnershipTransferred(address(0), address(this));
    emit Initialized(1);
    EmptyUUPS(address(proxyLightOrb)).initialize();
    vm.expectEmit(true, true, false, true);
    vm.expectEmit(true, false, false, true);
    emit OwnershipTransferred(address(0), address(this));
    emit Initialized(1);
    EmptyUUPS(address(proxyLightSpace)).initialize();
    vm.expectEmit(true, true, false, true);
    vm.expectEmit(true, false, false, true);
    emit OwnershipTransferred(address(0), address(this));
    emit Initialized(1);
    EmptyUUPSBeacon(address(proxyLightSpaceFactory)).initialize(address(empty));

    vm.expectEmit(true, false, false, true);
    emit Upgraded(address(implementationLightOrb));
    EmptyUUPS(address(proxyLightOrb)).upgradeTo(
      address(implementationLightOrb)
    );
    vm.expectEmit(true, false, false, true);
    emit Upgraded(address(implementationLightSpace));
    EmptyUUPS(address(proxyLightSpace)).upgradeTo(
      address(implementationLightSpace)
    );
    vm.expectEmit(true, false, false, true);
    emit Upgraded(address(implementationLightSpaceFactory));
    EmptyUUPSBeacon(address(proxyLightOrb)).upgradeTo(
      address(implementationLightSpaceFactory)
    );

    wrappedLightOrb = LightOrb(address(proxyLightOrb));
    wrappedLightSpace = LightSpace(address(proxyLightSpace));
    wrappedLightSpaceFactory = LightSpaceFactory(
      address(proxyLightSpaceFactory)
    );
  }

  function testDeployLightProxies() public {
    deployLightProxies();
  }
}
