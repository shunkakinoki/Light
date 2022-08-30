// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "@lightdotso/foundry/BaseTest.sol";
import "@lightdotso/protocol/LightSpace.sol";
import "@lightdotso/protocol/LightOrbFactory.sol";

contract LightOrbFactoryTest is BaseTest {
  LightOrb private wrappedBeaconLightOrb;
  LightOrbFactory private lightOrbFactory;

  function setUp() public {
    setUpLightProxies();
  }

  /// Check that the LightOrbFactory can be successfully upgraded.
  function testLightOrbFactoryProxyInitialize() public {
    vm.expectEmit(true, true, false, true, address(wrappedLightOrbFactory));
    vm.expectEmit(true, false, false, true, address(wrappedLightOrbFactory));
    emit OwnershipTransferred(address(this), address(this));
    emit Initialized(2);
    wrappedLightOrbFactory.initialize(
      address(emptyUUPSBeacon),
      address(wrappedLightController),
      address(wrappedLightOperator)
    );
    assertEq(wrappedLightOrbFactory.implementation(), address(emptyUUPSBeacon));
    vm.expectEmit(true, false, false, true);
    emit Upgraded(address(implementationLightOrb));
    wrappedLightOrbFactory._upgradeBeaconProxy(address(implementationLightOrb));
    assertEq(
      wrappedLightOrbFactory.implementation(),
      address(implementationLightOrb)
    );
  }

  function testLightOrbFactoryDisableInitializersOnImplementation() public {
    lightOrbFactory = new LightOrbFactory();
    vm.expectRevert(bytes("Initializable: contract is already initialized"));
    lightOrbFactory.initialize(
      address(emptyUUPSBeacon),
      address(wrappedLightController),
      address(wrappedLightOperator)
    );
  }

  function testLightOrbFactoryCreateLightOrb() public {
    testLightOrbFactoryProxyInitialize();

    wrappedBeaconLightOrb = LightOrb(
      wrappedLightOrbFactory._createLightOrb("Light Orb", "LORB")
    );
    assertEq(wrappedBeaconLightOrb.name(), "Light Orb");
    assertEq(wrappedBeaconLightOrb.symbol(), "LORB");
  }

  function testLightOrbFactoryCannotInitializeTwice() public {
    wrappedLightOrbFactory.initialize(
      address(emptyUUPSBeacon),
      address(wrappedLightController),
      address(wrappedLightOperator)
    );
    vm.expectRevert(bytes("Initializable: contract is already initialized"));
    wrappedLightOrbFactory.initialize(
      address(emptyUUPSBeacon),
      address(wrappedLightController),
      address(wrappedLightOperator)
    );
  }

  function testLightOrbFactorySyncAllContracts() public {
    testLightOrbFactoryProxyInitialize();

    vm.expectEmit(true, true, false, true, address(wrappedLightOrbFactory));
    vm.expectEmit(true, true, false, true, address(wrappedLightOrbFactory));
    vm.expectEmit(true, true, false, true, address(wrappedLightOrbFactory));
    vm.expectEmit(true, true, false, true, address(wrappedLightOrbFactory));
    emit ContractSynced(keccak256("LightCore"), address(proxyLightCore));
    emit ContractSynced(keccak256("LightOrb"), address(proxyLightOrb));
    emit ContractSynced(
      keccak256("LightOrbFactory"),
      address(proxyLightOrbFactory)
    );
    emit ContractSynced(keccak256("LightSpace"), address(proxyLightSpace));
    wrappedLightOrbFactory.syncAllContracts();
  }

  function testLightOrbFactoryProxySlot() public {
    testLightOrbFactorySyncAllContracts();

    /// Proxy Implementation
    _testProxyImplementationSlot(
      address(proxyLightOrbFactory),
      address(implementationLightOrbFactory)
    );
    /// Initializable
    _testArbitrarySlot(
      address(proxyLightOrbFactory),
      bytes32(uint256(0)),
      bytes32(uint256(2))
    );
    /// OwnableUpgradeable
    _testArbitrarySlot(
      address(proxyLightOrbFactory),
      bytes32(uint256(51)),
      bytes32(uint256(uint160(address(this))))
    );
    /// UUPSUpgradeable
    _testArbitrarySlot(
      address(proxyLightOrbFactory),
      bytes32(uint256(101)),
      bytes32(uint256(0))
    );
    /// LightOperatable
    _testArbitrarySlot(
      address(proxyLightOrbFactory),
      bytes32(uint256(201)),
      bytes32(uint256(uint160(address(proxyLightOperator))))
    );
    /// LightOrbFactoryStorageV1 (LightManager)
    _testArbitrarySlot(
      address(proxyLightOrbFactory),
      bytes32(uint256(251)),
      bytes32(uint256(uint160(address(proxyLightController))))
    );
    _testArbitrarySlot(
      address(proxyLightOrbFactory),
      bytes32(
        keccak256(
          abi.encodePacked(abi.encode(keccak256("LightCore")), uint256(252))
        )
      ),
      bytes32(uint256(uint160(address(proxyLightCore))))
    );
    _testArbitrarySlot(
      address(proxyLightOrbFactory),
      bytes32(
        keccak256(
          abi.encodePacked(abi.encode(keccak256("LightOrb")), uint256(252))
        )
      ),
      bytes32(uint256(uint160(address(proxyLightOrb))))
    );
    _testArbitrarySlot(
      address(proxyLightOrbFactory),
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
      address(proxyLightOrbFactory),
      bytes32(
        keccak256(
          abi.encodePacked(abi.encode(keccak256("LightSpace")), uint256(252))
        )
      ),
      bytes32(uint256(uint160(address(proxyLightSpace))))
    );
    /// LightOrbFactoryStorageV1
    _testArbitrarySlotNotEmpty(
      address(proxyLightOrbFactory),
      bytes32(uint256(301))
    );
  }

  function testLightOrbFactoryProxyBeforeImplementation() public {
    /// Proxy Implementation
    _testProxyImplementationSlot(
      address(proxyLightOrbFactory),
      address(implementationLightOrbFactory)
    );
    /// Initializable
    _testArbitrarySlot(
      address(proxyLightOrbFactory),
      bytes32(uint256(0)),
      bytes32(uint256(1))
    );
    /// OwnableUpgradeable
    _testArbitrarySlot(
      address(proxyLightOrbFactory),
      bytes32(uint256(51)),
      bytes32(uint256(uint160(address(this))))
    );
    /// UUPSUpgradeable
    _testArbitrarySlot(
      address(proxyLightOrbFactory),
      bytes32(uint256(101)),
      bytes32(uint256(0))
    );
    // /// LightOperatable
    // _testArbitrarySlot(
    //   address(proxyLightOrbFactory),
    //   bytes32(uint256(201)),
    //   bytes32(uint256(uint160(address(proxyLightOperator))))
    // );
    /// LightOrbFactoryStorageV1 (LightManager)
    _testArbitrarySlot(
      address(proxyLightOrbFactory),
      bytes32(uint256(251)),
      bytes32(uint256(0))
    );
    _testArbitrarySlot(
      address(proxyLightOrbFactory),
      bytes32(
        keccak256(
          abi.encodePacked(abi.encode(keccak256("LightCore")), uint256(252))
        )
      ),
      bytes32(uint256(0))
    );
    _testArbitrarySlot(
      address(proxyLightOrbFactory),
      bytes32(
        keccak256(
          abi.encodePacked(abi.encode(keccak256("LightOrb")), uint256(252))
        )
      ),
      bytes32(uint256(0))
    );
    _testArbitrarySlot(
      address(proxyLightOrbFactory),
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
      address(proxyLightOrbFactory),
      bytes32(
        keccak256(
          abi.encodePacked(abi.encode(keccak256("LightSpace")), uint256(252))
        )
      ),
      bytes32(uint256(0))
    );
    // /// LightOrbFactoryStorageV1
    // _testArbitrarySlotNotEmpty(
    //   address(proxyLightOrbFactory),
    //   bytes32(uint256(301))
    // );
  }
}
