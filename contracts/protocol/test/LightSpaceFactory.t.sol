// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "@lightdotso/foundry/BaseTest.t.sol";
import "@lightdotso/protocol/LightSpace.sol";
import "@lightdotso/protocol/LightSpaceFactory.sol";

contract LightSpaceFactoryTest is BaseTest {
  function setUp() public {
    setUpProxies();

    /// Check that EmptyUUPSBeacon's owner is set to the proxy's owner.
    assertEq((EmptyUUPSBeacon(address(emptyBeacon))).owner(), address(0));
    vm.expectEmit(true, true, false, true);
    vm.expectEmit(true, false, false, true);
    emit OwnershipTransferred(address(0), address(this));
    emit Initialized(1);
    emptyBeacon.initialize(address(empty));
  }

  /// Check that the LightSpaceFactory can be successfully upgraded.
  function testLightSpaceFactory() public {
    lightSpaceFactory.initialize(address(emptyBeacon));
    assert(lightSpaceFactory.implementation() == address(emptyBeacon));
    vm.expectEmit(true, false, false, true);
    emit Upgraded(address(lightSpace));
    lightSpaceFactory._upgradeLightSpaces(address(lightSpace));
    assert(lightSpaceFactory.implementation() == address(lightSpace));
  }
}
