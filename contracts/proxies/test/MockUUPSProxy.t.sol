/// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import "forge-std/Test.sol";
import "@lightdotso/proxies/UUPSProxy.sol";
import "@lightdotso/foundry/SlotTest.sol";
import "./mocks/MockUUPSProxy.sol";

contract MockUUPSProxyTest is Test, SlotTest {
  UUPSProxy internal proxy;

  MockUUPSProxyV1 internal implementationV1;
  MockUUPSProxyV2 internal implementationV2;

  MockUUPSProxyV1 internal wrappedProxyV1;
  MockUUPSProxyV2 internal wrappedProxyV2;

  function setUp() public {
    implementationV1 = new MockUUPSProxyV1();
    proxy = new UUPSProxy(address(implementationV1), "");
    wrappedProxyV1 = MockUUPSProxyV1(address(proxy));
  }

  function mockUUPSProxyV1Initialize(uint256 _x) internal {
    wrappedProxyV1.initialize(_x);
  }

  function mockUUPSProxyV2Upgrade(uint256 _x) internal {
    mockUUPSProxyV1Initialize(_x);

    implementationV2 = new MockUUPSProxyV2();
    wrappedProxyV1.upgradeTo(address(implementationV2));
    wrappedProxyV2 = MockUUPSProxyV2(address(proxy));
  }

  function testMockUUPSProxyV1Initialize(uint256 x_) public {
    mockUUPSProxyV1Initialize(x_);
    assertEq(wrappedProxyV1.x(), x_);
  }

  function testMockUUPSProxyV1InitializeOnlyOnce(uint256 x_) public {
    mockUUPSProxyV1Initialize(x_);
    vm.expectRevert(bytes("Initializable: contract is already initialized"));
    wrappedProxyV1.initialize(x_);
  }

  function testMockUUPSProxyV1Owner(uint256 x_) public {
    assertEq(wrappedProxyV1.owner(), address(0));
    mockUUPSProxyV1Initialize(x_);
    assertEq(wrappedProxyV1.owner(), address(this));
  }

  function testMockUUPSProxyV1Slot(uint256 x_) public {
    /// Proxy Implementation
    _testProxyImplementationSlot(
      address(wrappedProxyV1),
      address(implementationV1)
    );
    _testArbitrarySlot(
      address(wrappedProxyV1),
      bytes32(uint256(0)),
      bytes32(uint256(0))
    );

    mockUUPSProxyV1Initialize(x_);
    /// Initializable
    _testArbitrarySlot(
      address(wrappedProxyV1),
      bytes32(uint256(0)),
      bytes32(uint256(1))
    );
    /// OwnableUpgradeable
    _testArbitrarySlot(
      address(wrappedProxyV1),
      bytes32(uint256(51)),
      bytes32(uint256(uint160(address(this))))
    );
    // UUPSUpgradeable
    _testArbitrarySlot(
      address(wrappedProxyV1),
      bytes32(uint256(101)),
      bytes32(uint256(0))
    );
    /// MockUUPSProxyV1.sol: x
    _testArbitrarySlot(
      address(wrappedProxyV1),
      bytes32(uint256(201)),
      bytes32(uint256(x_))
    );
  }

  function testMockUUPSProxyV2Upgrade(uint256 x_, uint256 y_) public {
    mockUUPSProxyV2Upgrade(x_);
    assertEq(wrappedProxyV2.x(), x_);

    wrappedProxyV2.setY(y_);
    assertEq(wrappedProxyV2.y(), y_);
  }

  function testMockUUPSProxyV2UpgradeFailNotOwner(uint256 x_) public {
    mockUUPSProxyV1Initialize(x_);

    implementationV2 = new MockUUPSProxyV2();
    vm.prank(address(1));
    vm.expectRevert(bytes("Ownable: caller is not the owner"));
    wrappedProxyV1.upgradeTo(address(implementationV2));
  }

  function testMockUUPSProxyV2Slot(uint256 x_, uint256 y_) public {
    mockUUPSProxyV2Upgrade(x_);
    wrappedProxyV2.setY(y_);
    /// Proxy Implementation
    _testProxyImplementationSlot(
      address(wrappedProxyV2),
      address(implementationV2)
    );
    /// Initializable
    _testArbitrarySlot(
      address(wrappedProxyV2),
      bytes32(uint256(0)),
      bytes32(uint256(1))
    );
    /// OwnableUpgradeable
    _testArbitrarySlot(
      address(wrappedProxyV1),
      bytes32(uint256(51)),
      bytes32(uint256(uint160(address(this))))
    );
    // UUPSUpgradeable
    _testArbitrarySlot(
      address(wrappedProxyV1),
      bytes32(uint256(101)),
      bytes32(uint256(0))
    );
    /// MockUUPSProxyV1.sol: x
    _testArbitrarySlot(
      address(wrappedProxyV1),
      bytes32(uint256(201)),
      bytes32(uint256(x_))
    );
    /// MockUUPSProxyV1.sol: y
    _testArbitrarySlot(
      address(wrappedProxyV1),
      bytes32(uint256(202)),
      bytes32(uint256(y_))
    );
  }

  function testMockUUPSProxyV2InitializeOnlyOnce(uint256 x_) public {
    mockUUPSProxyV2Upgrade(x_);
    vm.expectRevert(bytes("Initializable: contract is already initialized"));
    wrappedProxyV2.initialize();
  }
}
