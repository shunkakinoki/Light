// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "@lightdotso/foundry/BaseTest.t.sol";
import "@lightdotso/protocol/LightSpaceFactory.sol";
import { Empty } from "@lightdotso/proxies/utils/Empty.sol";
import { EmptyUUPSBeacon } from "@lightdotso/proxies/utils/EmptyUUPSBeacon.sol";

contract LightSpaceFactoryTest is BaseTest {
  Empty private empty;
  EmptyUUPSBeacon private emptyBeacon;
  LightSpaceFactory private lightSpaceFactory;

  function setUp() public {
    lightSpaceFactory = new LightSpaceFactory();
    empty = new Empty();
    emptyBeacon = new EmptyUUPSBeacon();
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
  }
}
