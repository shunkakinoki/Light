// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "@lightdotso/foundry/BaseTest.sol";
import "@lightdotso/protocol/LightSpace.sol";
import "@lightdotso/protocol/LightOrbFactory.sol";

contract LightOrbFactoryTest is BaseTest {
  function setUp() public {
    setUpLightProxies();
  }

  /// Check that the LightOrbFactory can be successfully upgraded.
  function testLightOrbFactory() public {
    wrappedLightOrbFactory.initializeLightOrbFactory(address(emptyUUPSBeacon));
    assertEq(wrappedLightOrbFactory.implementation(), address(emptyUUPSBeacon));
    vm.expectEmit(true, false, false, true);
    emit Upgraded(address(wrappedLightSpace));
    wrappedLightOrbFactory._upgradeLightSpaces(address(wrappedLightSpace));
    assertEq(
      wrappedLightOrbFactory.implementation(),
      address(wrappedLightSpace)
    );
  }

  function testLightOrbFactoryCannotInitializeTwice() public {
    wrappedLightOrbFactory.initializeLightOrbFactory(address(emptyUUPSBeacon));
    vm.expectRevert(bytes("Initializable: contract is already initialized"));
    wrappedLightOrbFactory.initializeLightOrbFactory(address(emptyUUPSBeacon));
  }
}
