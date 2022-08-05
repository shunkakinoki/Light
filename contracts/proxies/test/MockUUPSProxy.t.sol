// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "@lightdotso/proxies/UUPSProxy.sol";
import "@lightdotso/foundry/SlotTest.t.sol";
import "./mocks/MockUUPSProxy.sol";

contract MockUUPSProxyTest is Test, SlotTest {
  MockUUPSProxyV1 implementationV1;
  MockUUPSProxyV2 implementationV2;
  UUPSProxy proxy;
  MockUUPSProxyV1 wrappedProxyV1;
  MockUUPSProxyV2 wrappedProxyV2;

  function setUp() public {
    implementationV1 = new MockUUPSProxyV1();
    proxy = new UUPSProxy(address(implementationV1), "");
    wrappedProxyV1 = MockUUPSProxyV1(address(proxy));
  }

  function testMockUUPSProxyV1Initialize() public {
    /// Test successful initialization
    wrappedProxyV1.initialize(100);
    assertEq(wrappedProxyV1.x(), 100);
  }

  function testMockUUPSProxyV1Owner() public {
    /// Owner is empty before initialization
    assertEq(wrappedProxyV1.owner(), address(0));

    /// Owner is set after initialization
    wrappedProxyV1.initialize(100);
    assertEq(wrappedProxyV1.owner(), address(this));
  }

  function testMockUUPSProxyV1Slot() public {
    /// Test that the implementation slot is set correctly
    _testProxyImplementationSlot(
      address(wrappedProxyV1),
      address(implementationV1)
    );
    _testArbitrarySlot(
      address(wrappedProxyV1),
      bytes32(uint256(0)),
      bytes32(uint256(0))
    );

    wrappedProxyV1.initialize(100);
    _testArbitrarySlot(
      address(wrappedProxyV1),
      bytes32(uint256(0)),
      bytes32(uint256(1))
    );
  }
}
