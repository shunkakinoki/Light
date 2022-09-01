// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "@lightdotso/foundry/BaseTest.sol";
import "@lightdotso/protocol/LightOperatorStore.sol";

contract LightOperatorStoreTest is BaseTest {
  LightOperatorStore private lightOperatorStore;

  function setUp() public {
    setUpLightProxies();
  }

  function testLightOperatorStoreProxyInitialize() public {
    vm.expectEmit(true, true, false, true, address(wrappedLightOperatorStore));
    vm.expectEmit(true, false, false, true, address(wrappedLightOperatorStore));
    emit OwnershipTransferred(address(this), address(this));
    emit Initialized(2);
    wrappedLightOperatorStore.initialize();
  }

  function testLightOperatorStoreDisableInitializersOnImplementation() public {
    lightOperatorStore = new LightOperatorStore();
    vm.expectRevert(bytes("Initializable: contract is already initialized"));
    lightOperatorStore.initialize();
  }

  function testLightOperatorStoreStorageSlot() public {
    testLightOperatorStoreProxyInitialize();

    /// Proxy Implementation
    _testProxyImplementationSlot(
      address(proxyLightOperatorStore),
      address(implementationLightOperatorStore)
    );
    /// Initializable
    _testArbitrarySlot(
      address(proxyLightOperatorStore),
      bytes32(uint256(0)),
      bytes32(uint256(2))
    );
    /// OwnableUpgradeable
    _testArbitrarySlot(
      address(proxyLightOperatorStore),
      bytes32(uint256(51)),
      bytes32(uint256(uint160(address(this))))
    );
    /// UUPSUpgradeable
    _testArbitrarySlot(
      address(proxyLightOperatorStore),
      bytes32(uint256(101)),
      bytes32(uint256(0))
    );
    /// LightOperatorStoreStorageV1
    _testArbitrarySlot(
      address(proxyLightOperatorStore),
      bytes32(uint256(201)),
      bytes32(uint256(0))
    );
  }

  function testLightOperatorStoreStorageSlotBeforeInitialization() public {
    /// Proxy Implementation
    _testProxyImplementationSlot(
      address(proxyLightOrb),
      address(implementationLightOrb)
    );
    /// Initializable
    _testArbitrarySlot(
      address(proxyLightOperatorStore),
      bytes32(uint256(0)),
      bytes32(uint256(1))
    );
    /// OwnableUpgradeable
    _testArbitrarySlot(
      address(proxyLightOperatorStore),
      bytes32(uint256(51)),
      bytes32(uint256(uint160(address(this))))
    );
    /// UUPSUpgradeable
    _testArbitrarySlot(
      address(proxyLightOperatorStore),
      bytes32(uint256(101)),
      bytes32(uint256(0))
    );
    /// LightOperatorStoreStorageV1
    _testArbitrarySlot(
      address(proxyLightOperatorStore),
      bytes32(uint256(201)),
      bytes32(uint256(0))
    );
  }
}
