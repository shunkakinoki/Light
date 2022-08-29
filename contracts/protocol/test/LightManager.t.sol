// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "@lightdotso/foundry/BaseTest.sol";
import "@lightdotso/protocol/LightManager.sol";

contract LightManagerTest is BaseTest {
  LightManager private lightManager;

  function setUp() public {
    setUpLightProxies();
    lightManager = new LightManager();
    vm.store(
      address(lightManager),
      bytes32(uint256(0)),
      bytes32(uint256(uint160(address(proxyLightController))))
    );
  }

  function testLightManagerProxySlot() public {
    lightManager.syncAllContracts();

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
          abi.encodePacked(abi.encode(keccak256("LightOperator")), uint256(1))
        )
      ),
      bytes32(uint256(uint160(address(proxyLightOperator))))
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
}
