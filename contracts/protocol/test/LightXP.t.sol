// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "@lightdotso/foundry/BaseTest.sol";
import "@lightdotso/protocol/LightXP.sol";

contract LightXPTest is BaseTest {
  LightXP private lightXP;

  function setUp() public {
    setUpLightProxies();
  }

  function testLightXPProxyInitialize() public {
    vm.expectEmit(true, true, false, true, address(wrappedLightXP));
    vm.expectEmit(true, false, false, true, address(wrappedLightXP));
    emit OwnershipTransferred(address(this), address(this));
    emit Initialized(2);
    wrappedLightXP.initialize("Light XP", "LXP");
    assertEq(wrappedLightXP.name(), "Light XP");
    assertEq(wrappedLightXP.symbol(), "LXP");
  }

  function testLightXPDisableInitializersOnImplementation() public {
    lightXP = new LightXP();
    vm.expectRevert(bytes("Initializable: contract is already initialized"));
    lightXP.initialize("Light XP", "LXP");
  }

  function testLightXPStorageSlotX() public {
    testLightXPProxyInitialize();

    /// Proxy Implementation
    _testProxyImplementationSlot(
      address(proxyLightXP),
      address(implementationLightXP)
    );
    /// Initializable
    _testArbitrarySlot(
      address(proxyLightXP),
      bytes32(uint256(0)),
      bytes32(uint256(2))
    );
    /// OwnableUpgradeable
    _testArbitrarySlot(
      address(proxyLightXP),
      bytes32(uint256(51)),
      bytes32(uint256(uint160(address(this))))
    );
    /// UUPSUpgradeable
    _testArbitrarySlot(
      address(proxyLightXP),
      bytes32(uint256(101)),
      bytes32(uint256(0))
    );
    /// PausableUpgradeable
    _testArbitrarySlot(
      address(proxyLightXP),
      bytes32(uint256(201)),
      bytes32(uint256(0))
    );
    /// ERC20Upgradeable
    _testArbitrarySlot(
      address(proxyLightXP),
      bytes32(uint256(251)),
      bytes32(uint256(0))
    );
    _testArbitrarySlot(
      address(proxyLightXP),
      bytes32(uint256(252)),
      bytes32(uint256(0))
    );
    _testArbitrarySlot(
      address(proxyLightXP),
      bytes32(uint256(253)),
      bytes32(0)
    );
    _testArbitrarySlot(
      address(proxyLightXP),
      bytes32(uint256(254)),
      bytes32(
        0x4c69676874205850000000000000000000000000000000000000000000000010
      )
    );
    _testArbitrarySlot(
      address(proxyLightXP),
      bytes32(uint256(255)),
      bytes32(
        0x4c58500000000000000000000000000000000000000000000000000000000006
      )
    );
    /// ERC20PermitUpgradeable
    _testArbitrarySlot(
      address(proxyLightXP),
      bytes32(uint256(301)),
      bytes32(keccak256(bytes("Light XP")))
    );
    _testArbitrarySlot(
      address(proxyLightXP),
      bytes32(uint256(302)),
      bytes32(keccak256(bytes("1")))
    );
    /// LightXPStorageV1
    _testArbitrarySlot(
      address(proxyLightXP),
      bytes32(uint256(351)),
      bytes32(uint256(0))
    );
  }

  function testLightXPStorageSlotBeforeInitialization() public {
    /// Proxy Implementation
    _testProxyImplementationSlot(
      address(proxyLightXP),
      address(implementationLightXP)
    );
    /// Initializable
    _testArbitrarySlot(
      address(proxyLightXP),
      bytes32(uint256(0)),
      bytes32(uint256(1))
    );
    /// OwnableUpgradeable
    _testArbitrarySlot(
      address(proxyLightXP),
      bytes32(uint256(51)),
      bytes32(uint256(uint160(address(this))))
    );
    /// UUPSUpgradeable
    _testArbitrarySlot(
      address(proxyLightXP),
      bytes32(uint256(101)),
      bytes32(uint256(0))
    );
    /// ERC20Upgradeable
    _testArbitrarySlot(
      address(proxyLightXP),
      bytes32(uint256(251)),
      bytes32(uint256(0))
    );
    _testArbitrarySlot(
      address(proxyLightXP),
      bytes32(uint256(252)),
      bytes32(uint256(0))
    );
    _testArbitrarySlot(
      address(proxyLightXP),
      bytes32(uint256(253)),
      bytes32(uint256(0))
    );
    _testArbitrarySlot(
      address(proxyLightXP),
      bytes32(uint256(254)),
      bytes32(uint256(0))
    );
    _testArbitrarySlot(
      address(proxyLightXP),
      bytes32(uint256(255)),
      bytes32(uint256(0))
    );
    /// ERC20PermitUpgradeable
    _testArbitrarySlot(
      address(proxyLightXP),
      bytes32(uint256(301)),
      bytes32(uint256(0))
    );
    _testArbitrarySlot(
      address(proxyLightXP),
      bytes32(uint256(302)),
      bytes32(uint256(0))
    );
    /// LightXPStorageV1
    _testArbitrarySlot(
      address(proxyLightXP),
      bytes32(uint256(351)),
      bytes32(uint256(0))
    );
  }
}
