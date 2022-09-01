// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "@lightdotso/foundry/BaseTest.sol";
import "@lightdotso/protocol/LightSpace.sol";
import { ILightOperatable } from "@lightdotso/protocol/interfaces/ILightOperatable.sol";
import { ILightSpace } from "@lightdotso/protocol/interfaces/ILightSpace.sol";
import { IERC721Upgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol";
import { IERC721MetadataUpgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol";

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
    wrappedLightSpace.initialize(
      address(wrappedLightController),
      address(wrappedLightOperatorStore)
    );
    assertEq(wrappedLightSpace.name(), "Light Space");
    assertEq(wrappedLightSpace.symbol(), "LIGHTSPACE");
  }

  function testLightSpaceDisableInitializersOnImplementation() public {
    lightSpace = new LightSpace();
    vm.expectRevert(bytes("Initializable: contract is already initialized"));
    lightSpace.initialize(
      address(wrappedLightController),
      address(wrappedLightOperatorStore)
    );
  }

  function testLightSpaceInterfaceId() public {
    testLightSpaceProxyInitialize();

    assertTrue(wrappedLightSpace.supportsInterface(0x80ac58cd));
    assertTrue(
      wrappedLightSpace.supportsInterface(type(IERC721Upgradeable).interfaceId)
    );
    assertTrue(wrappedLightSpace.supportsInterface(0x5b5e139f));
    assertTrue(
      wrappedLightSpace.supportsInterface(
        type(IERC721MetadataUpgradeable).interfaceId
      )
    );
    assertTrue(wrappedLightSpace.supportsInterface(0xbc2bc2d2));
    assertTrue(
      wrappedLightSpace.supportsInterface(type(ILightOperatable).interfaceId)
    );
    assertTrue(wrappedLightSpace.supportsInterface(0x705c77af));
    assertTrue(
      wrappedLightSpace.supportsInterface(type(ILightSpace).interfaceId)
    );
  }

  function testLightSpaceSyncAllContracts() public {
    testLightSpaceProxyInitialize();

    vm.expectEmit(true, true, false, true, address(wrappedLightSpace));
    vm.expectEmit(true, true, false, true, address(wrappedLightSpace));
    vm.expectEmit(true, true, false, true, address(wrappedLightSpace));
    vm.expectEmit(true, true, false, true, address(wrappedLightSpace));
    emit ContractSynced(keccak256("LightCore"), address(proxyLightCore));
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
    vm.expectRevert(ILightOperatable.NotAuthorized.selector);
    wrappedLightSpace.createFor(msg.sender, metadata);
  }

  function testLightSpaceStorageSlot() public {
    testLightSpaceSyncAllContracts();

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
    /// EIP712Upgradeable (52 slots)
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
    /// LightOperatable
    _testArbitrarySlot(
      address(proxyLightSpace),
      bytes32(uint256(353)),
      bytes32(uint256(uint160(address(proxyLightOperatorStore))))
    );
    /// LightSpaceStorageV1 (LightManagerStorageV1)
    _testArbitrarySlot(
      address(proxyLightSpace),
      bytes32(uint256(403)),
      bytes32(uint256(uint160(address(proxyLightController))))
    );
    _testArbitrarySlot(
      address(proxyLightSpace),
      bytes32(
        keccak256(
          abi.encodePacked(abi.encode(keccak256("LightCore")), uint256(404))
        )
      ),
      bytes32(uint256(uint160(address(proxyLightCore))))
    );
    _testArbitrarySlot(
      address(proxyLightSpace),
      bytes32(
        keccak256(
          abi.encodePacked(abi.encode(keccak256("LightOrb")), uint256(404))
        )
      ),
      bytes32(uint256(uint160(address(proxyLightOrb))))
    );
    _testArbitrarySlot(
      address(proxyLightSpace),
      bytes32(
        keccak256(
          abi.encodePacked(
            abi.encode(keccak256("LightOrbFactory")),
            uint256(404)
          )
        )
      ),
      bytes32(uint256(uint160(address(proxyLightOrbFactory))))
    );
    _testArbitrarySlot(
      address(proxyLightSpace),
      bytes32(
        keccak256(
          abi.encodePacked(abi.encode(keccak256("LightSpace")), uint256(404))
        )
      ),
      bytes32(uint256(uint160(address(proxyLightSpace))))
    );
  }

  function testLightSpaceStorageSlotBeforeInitialization() public {
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
    /// LightOperatable
    _testArbitrarySlot(
      address(proxyLightSpace),
      bytes32(uint256(353)),
      bytes32(uint256(0))
    );
    /// LightSpaceStorageV1
    _testArbitrarySlot(
      address(proxyLightSpace),
      bytes32(uint256(403)),
      bytes32(uint256(0))
    );
  }
}
