// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "@lightdotso/foundry/BaseTest.sol";
import "@lightdotso/protocol/LightCore.sol";

contract LightCoreTest is BaseTest {
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
    emit SetOperator(address(wrappedLightOperator));
    emit Initialized(2);
    (address(wrappedLightController));
    wrappedLightCore.initialize(
      address(wrappedLightController),
      address(wrappedLightOperator)
    );
  }

  function testSyncAllContracts() public {
    testLightCoreProxyInitialize();

    vm.expectEmit(true, true, false, true, address(wrappedLightCore));
    vm.expectEmit(true, true, false, true, address(wrappedLightCore));
    vm.expectEmit(true, true, false, true, address(wrappedLightCore));
    vm.expectEmit(true, true, false, true, address(wrappedLightCore));
    vm.expectEmit(true, true, false, true, address(wrappedLightCore));
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
    wrappedLightCore.syncAllContracts();
  }

  function testLightCoreProxySlot() public {
    testSyncAllContracts();

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
      bytes32(uint256(uint160(address(proxyLightOperator))))
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
          abi.encodePacked(abi.encode(keccak256("LightOperator")), uint256(252))
        )
      ),
      bytes32(uint256(uint160(address(proxyLightOperator))))
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
}
