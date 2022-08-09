// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "@lightdotso/foundry/BaseTest.sol";
import "@lightdotso/protocol/LightSpace.sol";
import "@lightdotso/protocol/LightOrbFactory.sol";

contract LightOrbFactoryTest is BaseTest {
  LightOrb wrappedBeaconLightOrb;

  function setUp() public {
    setUpLightProxies();
  }

  /// Check that the LightOrbFactory can be successfully upgraded.
  function testLightOrbFactory() public {
    wrappedLightOrbFactory.initialize(address(emptyUUPSBeacon));
    assertEq(wrappedLightOrbFactory.implementation(), address(emptyUUPSBeacon));
    vm.expectEmit(true, false, false, true);
    emit Upgraded(address(implementationLightOrb));
    wrappedLightOrbFactory._upgradeLightOrbs(address(implementationLightOrb));
    assertEq(
      wrappedLightOrbFactory.implementation(),
      address(implementationLightOrb)
    );

    wrappedBeaconLightOrb = LightOrb(
      wrappedLightOrbFactory._createLightOrb("Light Orb", "LORB")
    );
    assertEq(wrappedBeaconLightOrb.name(), "Light Orb");
    assertEq(wrappedBeaconLightOrb.symbol(), "LORB");
  }

  function testLightOrbFactoryCannotInitializeTwice() public {
    wrappedLightOrbFactory.initialize(address(emptyUUPSBeacon));
    vm.expectRevert(bytes("Initializable: contract is already initialized"));
    wrappedLightOrbFactory.initialize(address(emptyUUPSBeacon));
  }
}
