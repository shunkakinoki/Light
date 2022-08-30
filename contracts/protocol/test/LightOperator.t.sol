// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "@lightdotso/foundry/BaseTest.sol";
import "@lightdotso/protocol/LightOperator.sol";

contract LightOperatorTest is BaseTest {
  LightOperator private lightOperator;

  function setUp() public {
    setUpLightProxies();
  }

  function testLightOperatorProxyInitialize() public {
    vm.expectEmit(true, true, false, true, address(wrappedLightOperator));
    vm.expectEmit(true, false, false, true, address(wrappedLightOperator));
    emit OwnershipTransferred(address(this), address(this));
    emit Initialized(2);
    wrappedLightOperator.initialize();
  }

  function testLightOperatorDisableInitializersOnImplementation() public {
    lightOperator = new LightOperator();
    vm.expectRevert(bytes("Initializable: contract is already initialized"));
    lightOperator.initialize();
  }

  function testLightOperatorStorageSlot() public {
    testLightOperatorProxyInitialize();

    /// Proxy Implementation
    _testProxyImplementationSlot(
      address(proxyLightOperator),
      address(implementationLightOperator)
    );
    /// Initializable
    _testArbitrarySlot(
      address(proxyLightOperator),
      bytes32(uint256(0)),
      bytes32(uint256(2))
    );
    /// OwnableUpgradeable
    _testArbitrarySlot(
      address(proxyLightOperator),
      bytes32(uint256(51)),
      bytes32(uint256(uint160(address(this))))
    );
    /// UUPSUpgradeable
    _testArbitrarySlot(
      address(proxyLightOperator),
      bytes32(uint256(101)),
      bytes32(uint256(0))
    );
    /// LightOperatorStorageV1
    _testArbitrarySlot(
      address(proxyLightOperator),
      bytes32(uint256(201)),
      bytes32(uint256(0))
    );
  }

  function testLightOperatorStorageSlotBeforeInitialization() public {
    /// Proxy Implementation
    _testProxyImplementationSlot(
      address(proxyLightOrb),
      address(implementationLightOrb)
    );
    /// Initializable
    _testArbitrarySlot(
      address(proxyLightOperator),
      bytes32(uint256(0)),
      bytes32(uint256(1))
    );
    /// OwnableUpgradeable
    _testArbitrarySlot(
      address(proxyLightOperator),
      bytes32(uint256(51)),
      bytes32(uint256(uint160(address(this))))
    );
    /// UUPSUpgradeable
    _testArbitrarySlot(
      address(proxyLightOperator),
      bytes32(uint256(101)),
      bytes32(uint256(0))
    );
    /// LightOperatorStorageV1
    _testArbitrarySlot(
      address(proxyLightOperator),
      bytes32(uint256(201)),
      bytes32(uint256(0))
    );
  }
}
