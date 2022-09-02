// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import "@lightdotso/foundry/BaseTest.sol";
import "@lightdotso/manager/LightManager.sol";

contract LightManagerTest is BaseTest {
  LightManager private lightManager;

  function setUp() public {
    setUpLightProxies();
    lightManager = new LightManager();
  }

  function testLightManagerStorageSlot() public {
    /// Setup LightController
    vm.store(
      address(lightManager),
      bytes32(uint256(0)),
      bytes32(uint256(uint160(address(proxyLightController))))
    );

    lightManager.syncAllContracts();

    /// Proxy Implementation
    _testProxyImplementationSlot(
      address(proxyLightController),
      address(implementationLightController)
    );
    /// LightManagerStorageV1
    _testArbitrarySlot(
      address(lightManager),
      bytes32(uint256(0)),
      bytes32(uint256(uint160(address(proxyLightController))))
    );
    _testArbitrarySlot(
      address(lightManager),
      bytes32(
        keccak256(
          abi.encodePacked(abi.encode(keccak256("LightCore")), uint256(1))
        )
      ),
      bytes32(uint256(uint160(address(proxyLightCore))))
    );
    _testArbitrarySlot(
      address(lightManager),
      bytes32(
        keccak256(
          abi.encodePacked(abi.encode(keccak256("LightOrb")), uint256(1))
        )
      ),
      bytes32(uint256(uint160(address(proxyLightOrb))))
    );
    _testArbitrarySlot(
      address(lightManager),
      bytes32(
        keccak256(
          abi.encodePacked(abi.encode(keccak256("LightOrbFactory")), uint256(1))
        )
      ),
      bytes32(uint256(uint160(address(proxyLightOrbFactory))))
    );
    _testArbitrarySlot(
      address(lightManager),
      bytes32(
        keccak256(
          abi.encodePacked(abi.encode(keccak256("LightSpace")), uint256(1))
        )
      ),
      bytes32(uint256(uint160(address(proxyLightSpace))))
    );
  }

  function testLightManagerStorageSlotBeforeInitialization() public {
    /// Proxy Implementation
    _testProxyImplementationSlot(
      address(proxyLightController),
      address(implementationLightController)
    );
    /// LightManagerStorageV1
    _testArbitrarySlot(
      address(lightManager),
      bytes32(uint256(0)),
      bytes32(uint256(0))
    );
    _testArbitrarySlot(
      address(lightManager),
      bytes32(
        keccak256(
          abi.encodePacked(abi.encode(keccak256("LightCore")), uint256(1))
        )
      ),
      bytes32(uint256(0))
    );
    _testArbitrarySlot(
      address(lightManager),
      bytes32(
        keccak256(
          abi.encodePacked(abi.encode(keccak256("LightOrb")), uint256(1))
        )
      ),
      bytes32(uint256(0))
    );
    _testArbitrarySlot(
      address(lightManager),
      bytes32(
        keccak256(
          abi.encodePacked(abi.encode(keccak256("LightOrbFactory")), uint256(1))
        )
      ),
      bytes32(uint256(0))
    );
    _testArbitrarySlot(
      address(lightManager),
      bytes32(
        keccak256(
          abi.encodePacked(abi.encode(keccak256("LightSpace")), uint256(1))
        )
      ),
      bytes32(uint256(0))
    );
  }
}
