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
    wrappedLightOrbFactory.initialize(
      address(emptyUUPSBeacon),
      address(wrappedLightController)
    );
    assertEq(wrappedLightOrbFactory.implementation(), address(emptyUUPSBeacon));
    vm.expectEmit(true, false, false, true);
    emit Upgraded(address(implementationLightOrb));
    wrappedLightOrbFactory._upgradeBeaconProxy(address(implementationLightOrb));
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
    wrappedLightOrbFactory.initialize(
      address(emptyUUPSBeacon),
      address(wrappedLightController)
    );
    vm.expectRevert(bytes("Initializable: contract is already initialized"));
    wrappedLightOrbFactory.initialize(
      address(emptyUUPSBeacon),
      address(wrappedLightController)
    );
  }

  function testLightOrbFactoryProxySlot() public {
    setUpLightProxies();

    // Initializable
    _testArbitrarySlot(
      address(proxyLightOrbFactory),
      bytes32(uint256(0)),
      bytes32(uint256(1))
    );
    // OwnableUpgradeable
    _testArbitrarySlot(
      address(proxyLightOrbFactory),
      bytes32(uint256(51)),
      bytes32(uint256(uint160(address(this))))
    );

    vm.expectEmit(true, true, false, true);
    vm.expectEmit(true, true, false, true);
    vm.expectEmit(true, false, false, true);
    emit OwnershipTransferred(address(this), address(this));
    emit OwnershipTransferred(address(0), address(proxyLightOrbFactory));
    emit Initialized(2);
    wrappedLightOrbFactory.initialize(
      address(empty),
      address(proxyLightController)
    );

    // Initializable
    _testArbitrarySlot(
      address(proxyLightOrbFactory),
      bytes32(uint256(0)),
      bytes32(uint256(2))
    );
    // OwnableUpgradeable
    _testArbitrarySlot(
      address(proxyLightOrbFactory),
      bytes32(uint256(51)),
      bytes32(uint256(uint160(address(this))))
    );

    _testProxyImplementationSlot(
      address(proxyLightOrbFactory),
      address(implementationLightOrbFactory)
    );
  }
}
