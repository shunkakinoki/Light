// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "@lightdotso/foundry/BaseTest.sol";
import "@lightdotso/protocol/LightController.sol";

contract LightControllerTest is BaseTest {
  LightController private lightController;

  function setUp() public {
    setUpLightProxies();
  }

  function testSetContractProxy() public {
    wrappedLightController.setContractProxy(keccak256("one"), address(1));
    assertEq(
      wrappedLightController.getContractProxy(keccak256("one")),
      address(1)
    );
    wrappedLightController.setContractProxy(keccak256("two"), address(2));
    assertEq(
      wrappedLightController.getContractProxy(keccak256("two")),
      address(2)
    );
    wrappedLightController.setContractProxy(keccak256("three"), address(3));
    assertEq(
      wrappedLightController.getContractProxy(keccak256("three")),
      address(3)
    );
  }

  function testSetContractProxyErrorOnAddressNotSet() public {
    vm.expectRevert(LightController.CONTRACT_ADDRESS_NOT_SET.selector);
    wrappedLightController.setContractProxy(keccak256("error"), address(0));
  }

  function testUnsetContractProxy() public {
    testSetContractProxy();
    wrappedLightController.unsetContractProxy(keccak256("one"));
    assertEq(
      wrappedLightController.getContractProxy(keccak256("one")),
      address(0)
    );
    wrappedLightController.unsetContractProxy(keccak256("two"));
    assertEq(
      wrappedLightController.getContractProxy(keccak256("two")),
      address(0)
    );
    wrappedLightController.unsetContractProxy(keccak256("three"));
    assertEq(
      wrappedLightController.getContractProxy(keccak256("three")),
      address(0)
    );
  }

  function testLightControllerProxySlot() public {
    _testProxyImplementationSlot(
      address(proxyLightController),
      address(implementationLightController)
    );

    // Initializable
    _testArbitrarySlot(
      address(proxyLightController),
      bytes32(uint256(0)),
      bytes32(uint256(2))
    );
    // OwnableUpgradeable
    _testArbitrarySlot(
      address(proxyLightController),
      bytes32(uint256(51)),
      bytes32(uint256(uint160(address(this))))
    );
    /// PausableUpgradeable
    _testArbitrarySlot(
      address(proxyLightController),
      bytes32(uint256(101)),
      bytes32(uint256(0))
    );
  }
}
