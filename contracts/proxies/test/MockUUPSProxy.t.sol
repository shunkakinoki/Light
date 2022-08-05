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

  function mockUUPSProxyV1Initialize(uint256 _x) public {
    wrappedProxyV1.initialize(_x);
  }

  function mockUUPSProxyV2Upgrade(uint256 _x) public {
    mockUUPSProxyV1Initialize(_x);

    implementationV2 = new MockUUPSProxyV2();
    wrappedProxyV1.upgradeTo(address(implementationV2));
    wrappedProxyV2 = MockUUPSProxyV2(address(proxy));
  }

  function testMockUUPSProxyV1Initialize() public {
    mockUUPSProxyV1Initialize(100);
    assertEq(wrappedProxyV1.x(), 100);
  }

  function testMockUUPSProxyV1Owner() public {
    assertEq(wrappedProxyV1.owner(), address(0));
    mockUUPSProxyV1Initialize(100);
    assertEq(wrappedProxyV1.owner(), address(this));
  }

  function testMockUUPSProxyV1Slot() public {
    _testProxyImplementationSlot(
      address(wrappedProxyV1),
      address(implementationV1)
    );
    _testArbitrarySlot(
      address(wrappedProxyV1),
      bytes32(uint256(0)),
      bytes32(uint256(0))
    );

    mockUUPSProxyV1Initialize(100);
    _testArbitrarySlot(
      address(wrappedProxyV1),
      bytes32(uint256(0)),
      bytes32(uint256(1))
    );
  }

  function testMockUUPSProxyV2Upgrade() public {
    mockUUPSProxyV2Upgrade(100);
    assertEq(wrappedProxyV2.x(), 100);

    wrappedProxyV2.setY(200);
    assertEq(wrappedProxyV2.y(), 200);
  }

  function testMockUUPSProxyV2Slot() public {
    mockUUPSProxyV2Upgrade(100);

    _testProxyImplementationSlot(
      address(wrappedProxyV2),
      address(implementationV2)
    );
    _testArbitrarySlot(
      address(wrappedProxyV2),
      bytes32(uint256(0)),
      bytes32(uint256(1))
    );
  }
}
