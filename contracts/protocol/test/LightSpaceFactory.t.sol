// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "@lightdotso/foundry/BaseTest.t.sol";
import "@lightdotso/protocol/LightSpace.sol";
import "@lightdotso/protocol/LightSpaceFactory.sol";

contract LightSpaceFactoryTest is BaseTest {
  LightSpace private lightSpace;
  LightSpaceFactory private lightSpaceFactory;

  function setUp() public {
    setUpProxies();

    lightSpace = new LightSpace();
    vm.label(address(lightSpace), "LightSpace");
    lightSpaceFactory = new LightSpaceFactory();
    vm.label(address(lightSpaceFactory), "LightSpaceFactory");

    assertEq((EmptyUUPSBeacon(address(emptyBeacon))).owner(), address(0));
    vm.expectEmit(true, true, false, true);
    vm.expectEmit(true, false, false, true);
    emit OwnershipTransferred(address(0), address(this));
    emit Initialized(1);
    emptyBeacon.initialize(address(empty));
  }

  function testLightSpaceFactory() public {
    lightSpaceFactory.initialize(address(emptyBeacon));
    assert(lightSpaceFactory.implementation() == address(emptyBeacon));
    vm.expectEmit(true, false, false, true);
    emit Upgraded(address(lightSpace));
    lightSpaceFactory._upgradeLightSpaces(address(lightSpace));
    assert(lightSpaceFactory.implementation() == address(lightSpace));
  }
}
