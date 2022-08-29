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
  function testLightOrbFactoryProxyInitialize() public {
    vm.expectEmit(true, true, false, true, address(wrappedLightOrbFactory));
    vm.expectEmit(true, false, false, true, address(wrappedLightOrbFactory));
    emit OwnershipTransferred(address(this), address(this));
    emit Initialized(2);
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
  }

  function testLightOrbFactoryCreateLightOrb() public {
    testLightOrbFactoryProxyInitialize();

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
    testLightOrbFactoryProxyInitialize();

    /// Proxy Implementation
    _testProxyImplementationSlot(
      address(proxyLightOrbFactory),
      address(implementationLightOrbFactory)
    );

    /// Initializable
    _testArbitrarySlot(
      address(proxyLightOrbFactory),
      bytes32(uint256(0)),
      bytes32(uint256(2))
    );
    /// OwnableUpgradeable
    _testArbitrarySlot(
      address(proxyLightOrbFactory),
      bytes32(uint256(51)),
      bytes32(uint256(uint160(address(this))))
    );
    /// UUPSUpgradeable
    _testArbitrarySlot(
      address(proxyLightOrbFactory),
      bytes32(uint256(101)),
      bytes32(uint256(0))
    );
    /// LightOrbFactoryStorageV1
    _testArbitrarySlot(
      address(proxyLightOrbFactory),
      bytes32(uint256(201)),
      bytes32(uint256(uint160(address(implementationLightOrb))))
    );
  }

  function testLightOrbFactoryProxySlotBeforeImplementation() public {
    /// Proxy Implementation
    _testProxyImplementationSlot(
      address(proxyLightOrbFactory),
      address(implementationLightOrbFactory)
    );

    /// Initializable
    _testArbitrarySlot(
      address(proxyLightOrbFactory),
      bytes32(uint256(0)),
      bytes32(uint256(1))
    );
    /// OwnableUpgradeable
    _testArbitrarySlot(
      address(proxyLightOrbFactory),
      bytes32(uint256(51)),
      bytes32(uint256(uint160(address(this))))
    );
    /// UUPSUpgradeable
    _testArbitrarySlot(
      address(proxyLightOrbFactory),
      bytes32(uint256(101)),
      bytes32(uint256(0))
    );
    /// LightOrbFactoryStorageV1
    _testArbitrarySlot(
      address(proxyLightOrbFactory),
      bytes32(uint256(201)),
      bytes32(uint256(uint160(address(emptyUUPSBeacon))))
    );
  }
}
