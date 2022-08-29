// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "@lightdotso/foundry/BaseTest.sol";
import "@lightdotso/protocol/LightOrb.sol";

contract LightOrbTest is BaseTest {
  LightOrb private lightOrb;

  function setUp() public {
    setUpLightProxies();
  }

  function testLightOrbProxyInitialize() public {
    vm.expectEmit(true, true, false, true, address(wrappedLightOrb));
    vm.expectEmit(true, false, false, true, address(wrappedLightOrb));
    emit OwnershipTransferred(address(this), address(this));
    emit Initialized(2);
    wrappedLightOrb.initialize("Light Orb", "LORB");
    assertEq(wrappedLightOrb.name(), "Light Orb");
    assertEq(wrappedLightOrb.symbol(), "LORB");
  }

  function testLightOrbDisableInitializersOnImplementation() public {
    lightOrb = new LightOrb();
    vm.expectRevert(bytes("Initializable: contract is already initialized"));
    lightOrb.initialize("Light Orb", "LORB");
  }

  function testLightOrbProxySlot() public {
    testLightOrbProxyInitialize();

    /// Proxy Implementation
    _testProxyImplementationSlot(
      address(proxyLightOrb),
      address(implementationLightOrb)
    );

    /// Initializable
    _testArbitrarySlot(
      address(proxyLightOrb),
      bytes32(uint256(0)),
      bytes32(uint256(2))
    );
    /// OwnableUpgradeable
    _testArbitrarySlot(
      address(proxyLightOrb),
      bytes32(uint256(51)),
      bytes32(uint256(uint160(address(this))))
    );
    /// UUPSUpgradeable
    _testArbitrarySlot(
      address(proxyLightOrb),
      bytes32(uint256(101)),
      bytes32(uint256(0))
    );
    /// ERC721Upgradeable.sol
    _testArbitrarySlot(
      address(proxyLightOrb),
      bytes32(uint256(251)),
      bytes32(
        0x4c69676874204f72620000000000000000000000000000000000000000000012
      )
    );
    _testArbitrarySlot(
      address(proxyLightOrb),
      bytes32(uint256(252)),
      bytes32(
        0x4c4f524200000000000000000000000000000000000000000000000000000008
      )
    );
  }

  function testLightOrbProxySlotBeforeImplementation() public {
    /// Proxy Implementation
    _testProxyImplementationSlot(
      address(proxyLightOrb),
      address(implementationLightOrb)
    );

    /// Initializable
    _testArbitrarySlot(
      address(proxyLightOrb),
      bytes32(uint256(0)),
      bytes32(uint256(1))
    );
    /// OwnableUpgradeable
    _testArbitrarySlot(
      address(proxyLightOrb),
      bytes32(uint256(51)),
      bytes32(uint256(uint160(address(this))))
    );
    /// UUPSUpgradeable
    _testArbitrarySlot(
      address(proxyLightOrb),
      bytes32(uint256(101)),
      bytes32(uint256(0))
    );
    /// ERC721Upgradeable.sol
    _testArbitrarySlot(
      address(proxyLightOrb),
      bytes32(uint256(251)),
      bytes32(uint256(0))
    );
    _testArbitrarySlot(
      address(proxyLightOrb),
      bytes32(uint256(252)),
      bytes32(uint256(0))
    );
  }
}
