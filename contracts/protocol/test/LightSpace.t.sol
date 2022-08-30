// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "@lightdotso/foundry/BaseTest.sol";
import "@lightdotso/protocol/LightSpace.sol";

contract LightSpaceTest is BaseTest {
  LightSpace private lightSpace;

  function setUp() public {
    setUpLightProxies();
  }

  function testLightSpaceProxyInitialize() public {
    vm.expectEmit(true, true, false, true, address(wrappedLightSpace));
    vm.expectEmit(true, false, false, true, address(wrappedLightSpace));
    vm.expectEmit(true, false, false, true, address(wrappedLightSpace));
    emit OwnershipTransferred(address(this), address(this));
    emit SetController(address(wrappedLightController));
    emit Initialized(2);
    wrappedLightSpace.initialize(address(wrappedLightController));
    assertEq(wrappedLightSpace.name(), "Light Space");
    assertEq(wrappedLightSpace.symbol(), "LIGHTSPACE");
  }

  function testLightSpaceDisableInitializersOnImplementation() public {
    lightSpace = new LightSpace();
    vm.expectRevert(bytes("Initializable: contract is already initialized"));
    lightSpace.initialize(address(wrappedLightController));
  }

  function testLightSpaceSyncAllContracts() public {
    testLightSpaceProxyInitialize();

    vm.expectEmit(true, true, false, true, address(wrappedLightSpace));
    vm.expectEmit(true, true, false, true, address(wrappedLightSpace));
    vm.expectEmit(true, true, false, true, address(wrappedLightSpace));
    vm.expectEmit(true, true, false, true, address(wrappedLightSpace));
    vm.expectEmit(true, true, false, true, address(wrappedLightSpace));
    emit ContractSynced(keccak256("LightCore"), address(proxyLightCore));
    emit ContractSynced(
      keccak256("LightOperator"),
      address(proxyLightOperator)
    );
    emit ContractSynced(keccak256("LightOrb"), address(proxyLightOrb));
    emit ContractSynced(
      keccak256("LightOrbFactory"),
      address(proxyLightOrbFactory)
    );
    emit ContractSynced(keccak256("LightSpace"), address(proxyLightSpace));
    wrappedLightSpace.syncAllContracts();
  }

  function testLightSpaceCreateForFailNotLightCore() public {
    testLightSpaceSyncAllContracts();

    LightSpaceMetadata memory metadata = LightSpaceMetadata({
      content: "ipfsHash",
      domain: 1
    });
    vm.expectRevert(LightSpace.NotAuthorized.selector);
    wrappedLightSpace.createFor(msg.sender, metadata);
  }

  function testLightSpaceProxySlot() public {
    testLightSpaceProxyInitialize();

    /// Proxy Implementation
    _testProxyImplementationSlot(
      address(proxyLightSpace),
      address(implementationLightSpace)
    );

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
    /// UUPSUpgradeable
    _testArbitrarySlot(
      address(proxyLightSpace),
      bytes32(uint256(101)),
      bytes32(uint256(0))
    );
    /// ERC721Upgradeable
    _testArbitrarySlot(
      address(proxyLightSpace),
      bytes32(uint256(251)),
      bytes32(
        0x4c69676874205370616365000000000000000000000000000000000000000016
      )
    );
    _testArbitrarySlot(
      address(proxyLightSpace),
      bytes32(uint256(252)),
      bytes32(
        0x4c49474854535041434500000000000000000000000000000000000000000014
      )
    );
    /// EIP712Upgradeable
    _testArbitrarySlot(
      address(proxyLightSpace),
      bytes32(uint256(301)),
      bytes32(keccak256(bytes(string("Light Space"))))
    );
    _testArbitrarySlot(
      address(proxyLightSpace),
      bytes32(uint256(302)),
      bytes32(keccak256(bytes(string("1"))))
    );
  }

  function testLightSpaceProxySlotBeforeImplementation() public {
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
    /// UUPSUpgradeable
    _testArbitrarySlot(
      address(proxyLightSpace),
      bytes32(uint256(101)),
      bytes32(uint256(0))
    );
    /// ERC721Upgradeable
    _testArbitrarySlot(
      address(proxyLightSpace),
      bytes32(uint256(251)),
      bytes32(uint256(0))
    );
    _testArbitrarySlot(
      address(proxyLightSpace),
      bytes32(uint256(252)),
      bytes32(uint256(0))
    );
    /// EIP712Upgradeable
    _testArbitrarySlot(
      address(proxyLightSpace),
      bytes32(uint256(301)),
      bytes32(uint256(0))
    );
    _testArbitrarySlot(
      address(proxyLightSpace),
      bytes32(uint256(302)),
      bytes32(uint256(0))
    );
  }
}
