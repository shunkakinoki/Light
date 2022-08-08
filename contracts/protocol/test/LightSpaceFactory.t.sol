// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "@lightdotso/foundry/BaseTest.sol";
import "@lightdotso/protocol/LightSpace.sol";
import "@lightdotso/protocol/LightSpaceFactory.sol";

contract LightSpaceFactoryTest is BaseTest {
  function setUp() public {
    setUpLightProxies();
  }

  /// Check that the LightSpaceFactory can be successfully upgraded.
  function testLightSpaceFactory() public {
    wrappedLightSpaceFactory.initializeLightSpaceFactory(
      address(emptyUUPSBeacon)
    );
    assertEq(
      wrappedLightSpaceFactory.implementation(),
      address(emptyUUPSBeacon)
    );
    vm.expectEmit(true, false, false, true);
    emit Upgraded(address(wrappedLightSpace));
    wrappedLightSpaceFactory._upgradeLightSpaces(address(wrappedLightSpace));
    assertEq(
      wrappedLightSpaceFactory.implementation(),
      address(wrappedLightSpace)
    );
  }

  function testLightSpaceFactoryCannotInitializeTwice() public {
    wrappedLightSpaceFactory.initializeLightSpaceFactory(
      address(emptyUUPSBeacon)
    );
    vm.expectRevert(bytes("Initializable: contract is already initialized"));
    wrappedLightSpaceFactory.initializeLightSpaceFactory(
      address(emptyUUPSBeacon)
    );
  }
}
