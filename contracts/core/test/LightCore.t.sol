// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "@lightdotso/foundry/BaseTest.sol";
import "@lightdotso/core/LightCore.sol";

contract LightCoreTest is BaseTest {
  event LaunchSpace(uint256 spaceId, string memo, address caller);
  event CreateSpace(
    uint256 indexed spaceId,
    address indexed owner,
    LightSpaceMetadata metadata,
    address caller
  );
  event SetCustomMetadata(
    uint256 indexed spaceId,
    uint256 indexed domain,
    string content
  );
  event Transfer(
    address indexed from,
    address indexed to,
    uint256 indexed tokenId
  );

  LightCore private lightCore;

  function setUp() public {
    setUpLightProxies();
  }

  function testLightCoreProxyInitialize() public {
    vm.expectEmit(true, true, false, true, address(wrappedLightCore));
    vm.expectEmit(true, false, false, true, address(wrappedLightCore));
    vm.expectEmit(true, false, false, true, address(wrappedLightCore));
    vm.expectEmit(true, false, false, true, address(wrappedLightCore));
    emit OwnershipTransferred(address(this), address(this));
    emit SetController(address(wrappedLightController));
    emit SetOperator(address(wrappedLightOperatorStore));
    emit Initialized(2);
    wrappedLightCore.initialize(
      address(wrappedLightController),
      address(wrappedLightOperatorStore)
    );
  }

  function testLightCoreDisableInitializersOnImplementation() public {
    lightCore = new LightCore();
    vm.expectRevert(bytes("Initializable: contract is already initialized"));
    lightCore.initialize(
      address(wrappedLightController),
      address(wrappedLightOperatorStore)
    );
  }

  function testLightCoreSyncAllContracts() public {
    testLightCoreProxyInitialize();

    vm.expectEmit(true, true, false, true, address(wrappedLightCore));
    vm.expectEmit(true, true, false, true, address(wrappedLightCore));
    vm.expectEmit(true, true, false, true, address(wrappedLightCore));
    vm.expectEmit(true, true, false, true, address(wrappedLightCore));
    emit ContractSynced(keccak256("LightCore"), address(proxyLightCore));
    emit ContractSynced(keccak256("LightOrb"), address(proxyLightOrb));
    emit ContractSynced(
      keccak256("LightOrbFactory"),
      address(proxyLightOrbFactory)
    );
    emit ContractSynced(keccak256("LightSpace"), address(proxyLightSpace));
    wrappedLightCore.syncAllContracts();
  }

  function testLightCoreLaunchSpaceFor() public {
    testLightCoreSyncAllContracts();

    wrappedLightSpace.initialize(
      address(wrappedLightController),
      address(wrappedLightOperatorStore)
    );
    wrappedLightSpace.syncAllContracts();

    LightSpaceMetadata memory emptyMetadata = LightSpaceMetadata({
      content: "",
      domain: 1
    });

    vm.expectEmit(true, true, false, true);
    vm.expectEmit(true, false, false, true);
    vm.expectEmit(true, false, false, true);
    emit Transfer(address(0), msg.sender, 1);
    emit CreateSpace(1, msg.sender, emptyMetadata, address(wrappedLightCore));
    emit LaunchSpace(1, "", address(this));
    wrappedLightCore.launchSpaceFor(msg.sender, emptyMetadata, "");

    LightSpaceMetadata memory customMetadata = LightSpaceMetadata({
      content: "ipfsHash",
      domain: 1
    });

    vm.expectEmit(true, true, false, true);
    vm.expectEmit(true, true, false, true);
    vm.expectEmit(true, false, false, true);
    vm.expectEmit(true, false, false, true);
    emit Transfer(address(0), msg.sender, 2);
    emit SetCustomMetadata(2, 1, "ipfsHash");
    emit CreateSpace(2, msg.sender, customMetadata, address(wrappedLightCore));
    emit LaunchSpace(2, "", address(this));
    wrappedLightCore.launchSpaceFor(msg.sender, customMetadata, "");

    vm.expectEmit(true, true, false, true);
    vm.expectEmit(true, false, false, true);
    vm.expectEmit(true, false, false, true);
    emit Transfer(address(0), msg.sender, 3);
    emit CreateSpace(3, msg.sender, emptyMetadata, address(wrappedLightCore));
    emit LaunchSpace(3, "memo", address(this));
    wrappedLightCore.launchSpaceFor(msg.sender, emptyMetadata, "memo");
  }

  function testLightCoreStorageSlot() public {
    testLightCoreSyncAllContracts();

    /// Proxy Implementation
    _testProxyImplementationSlot(
      address(proxyLightCore),
      address(implementationLightCore)
    );
    /// Initializable
    _testArbitrarySlot(
      address(proxyLightCore),
      bytes32(uint256(0)),
      bytes32(uint256(2))
    );
    /// OwnableUpgradeable
    _testArbitrarySlot(
      address(proxyLightCore),
      bytes32(uint256(51)),
      bytes32(uint256(uint160(address(this))))
    );
    /// UUPSUpgradeable
    _testArbitrarySlot(
      address(proxyLightCore),
      bytes32(uint256(101)),
      bytes32(uint256(0))
    );
    /// LightOperatable
    _testArbitrarySlot(
      address(proxyLightCore),
      bytes32(uint256(201)),
      bytes32(uint256(uint160(address(proxyLightOperatorStore))))
    );
    /// LightCoreStorageV1
    _testArbitrarySlot(
      address(proxyLightCore),
      bytes32(uint256(251)),
      bytes32(uint256(uint160(address(proxyLightController))))
    );
    _testArbitrarySlot(
      address(proxyLightCore),
      bytes32(
        keccak256(
          abi.encodePacked(abi.encode(keccak256("LightCore")), uint256(252))
        )
      ),
      bytes32(uint256(uint160(address(proxyLightCore))))
    );
    _testArbitrarySlot(
      address(proxyLightCore),
      bytes32(
        keccak256(
          abi.encodePacked(abi.encode(keccak256("LightOrb")), uint256(252))
        )
      ),
      bytes32(uint256(uint160(address(proxyLightOrb))))
    );
    _testArbitrarySlot(
      address(proxyLightCore),
      bytes32(
        keccak256(
          abi.encodePacked(
            abi.encode(keccak256("LightOrbFactory")),
            uint256(252)
          )
        )
      ),
      bytes32(uint256(uint160(address(proxyLightOrbFactory))))
    );
    _testArbitrarySlot(
      address(proxyLightCore),
      bytes32(
        keccak256(
          abi.encodePacked(abi.encode(keccak256("LightSpace")), uint256(252))
        )
      ),
      bytes32(uint256(uint160(address(proxyLightSpace))))
    );
  }

  function testLightCoreStorageSlotBeforeInitialization() public {
    /// Proxy Implementation
    _testProxyImplementationSlot(
      address(proxyLightCore),
      address(implementationLightCore)
    );
    /// Initializable
    _testArbitrarySlot(
      address(proxyLightCore),
      bytes32(uint256(0)),
      bytes32(uint256(1))
    );
    /// OwnableUpgradeable
    _testArbitrarySlot(
      address(proxyLightCore),
      bytes32(uint256(51)),
      bytes32(uint256(uint160(address(this))))
    );
    /// UUPSUpgradeable
    _testArbitrarySlot(
      address(proxyLightCore),
      bytes32(uint256(101)),
      bytes32(uint256(0))
    );
    /// LightOperatable
    _testArbitrarySlot(
      address(proxyLightCore),
      bytes32(uint256(201)),
      bytes32(uint256(0))
    );
    /// LightCoreStorageV1
    _testArbitrarySlot(
      address(proxyLightCore),
      bytes32(uint256(251)),
      bytes32(uint256(0))
    );
    _testArbitrarySlot(
      address(proxyLightCore),
      bytes32(
        keccak256(
          abi.encodePacked(abi.encode(keccak256("LightCore")), uint256(252))
        )
      ),
      bytes32(uint256(0))
    );
    _testArbitrarySlot(
      address(proxyLightCore),
      bytes32(
        keccak256(
          abi.encodePacked(abi.encode(keccak256("LightOrb")), uint256(252))
        )
      ),
      bytes32(uint256(0))
    );
    _testArbitrarySlot(
      address(proxyLightCore),
      bytes32(
        keccak256(
          abi.encodePacked(
            abi.encode(keccak256("LightOrbFactory")),
            uint256(252)
          )
        )
      ),
      bytes32(uint256(0))
    );
    _testArbitrarySlot(
      address(proxyLightCore),
      bytes32(
        keccak256(
          abi.encodePacked(abi.encode(keccak256("LightSpace")), uint256(252))
        )
      ),
      bytes32(uint256(0))
    );
  }
}
