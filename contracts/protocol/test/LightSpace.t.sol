// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "@lightdotso/foundry/BaseTest.sol";
import "@lightdotso/protocol/LightSpace.sol";

contract LightSpaceTest is BaseTest {
  LightSpace private lightSpace;

  function setUp() public {
    setUpLightProxies();
  }

  function testLightSpaceAssertions() public {
    wrappedLightSpace.initialize(address(wrappedLightController));
    assertEq(wrappedLightSpace.name(), "Light Space");
    assertEq(wrappedLightSpace.symbol(), "LIGHTSPACE");
  }

  function testLightSpaceDisableInitializersOnImplementation() public {
    lightSpace = new LightSpace();
    vm.expectRevert(bytes("Initializable: contract is already initialized"));
    lightSpace.initialize(address(wrappedLightController));
  }

  function testLightSpaceProxySlot() public {
    setUpLightProxies();

    /// Proxy Implementation
    _testProxyImplementationSlot(
      address(proxyLightSpace),
      address(implementationLightSpace)
    );

    /// Initializable
    _testArbitrarySlot(
      address(proxyLightSpace),
      bytes32(uint256(0)),
      bytes32(uint256(1))
    );
    /// OwnableUpgradeable
    _testArbitrarySlot(
      address(proxyLightSpace),
      bytes32(uint256(51)),
      bytes32(uint256(uint160(address(this))))
    );

    vm.expectEmit(true, false, false, true);
    emit Initialized(2);
    wrappedLightSpace.initialize(address(proxyLightController));

    /// Initializable
    _testArbitrarySlot(
      address(proxyLightSpace),
      bytes32(uint256(0)),
      bytes32(uint256(2))
    );
    /// OwnableUpgradeable
    _testArbitrarySlot(
      address(proxyLightSpace),
      bytes32(uint256(51)),
      bytes32(uint256(uint160(address(this))))
    );
  }
}
