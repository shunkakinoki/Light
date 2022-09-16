/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import "@lightdotso/foundry/BaseTest.sol";
import "@lightdotso/controller/LightController.sol";

import { LightControllerTest } from "./LightController.t.sol";

contract LightControllerStorageTest is LightControllerTest {
  function testLightControllerStorageSlot() public {
    testLightControllerSetContractProxy();

    /// Proxy Implementation
    _testProxyImplementationSlot(
      address(proxyLightController),
      address(implementationLightController)
    );
    /// Initializable
    _testArbitrarySlot(
      address(proxyLightController),
      bytes32(uint256(0)),
      bytes32(uint256(2))
    );
    /// OwnableUpgradeable
    _testArbitrarySlot(
      address(proxyLightController),
      bytes32(uint256(51)),
      bytes32(uint256(uint160(address(this))))
    );
    /// UUPSUpgradeable
    _testArbitrarySlot(
      address(proxyLightCore),
      bytes32(uint256(101)),
      bytes32(uint256(0))
    );
    /// PausableUpgradeable
    _testArbitrarySlot(
      address(proxyLightController),
      bytes32(uint256(201)),
      bytes32(uint256(0))
    );
    /// LightControllerStorageV1
    _testArbitrarySlot(
      address(proxyLightController),
      bytes32(
        keccak256(abi.encodePacked(abi.encode(keccak256("one")), uint256(251)))
      ),
      bytes32(uint256(uint160(address(1))))
    );
    _testArbitrarySlot(
      address(proxyLightController),
      bytes32(
        keccak256(abi.encodePacked(abi.encode(keccak256("two")), uint256(251)))
      ),
      bytes32(uint256(uint160(address(2))))
    );
    _testArbitrarySlot(
      address(proxyLightController),
      bytes32(
        keccak256(
          abi.encodePacked(abi.encode(keccak256("three")), uint256(251))
        )
      ),
      bytes32(uint256(uint160(address(3))))
    );
  }

  function testLightControllerStorageSlotBeforeInitialization() public {
    /// Proxy Implementation
    _testProxyImplementationSlot(
      address(proxyLightController),
      address(implementationLightController)
    );
    /// Initializable
    _testArbitrarySlot(
      address(proxyLightController),
      bytes32(uint256(0)),
      bytes32(uint256(2))
    );
    /// OwnableUpgradeable
    _testArbitrarySlot(
      address(proxyLightController),
      bytes32(uint256(51)),
      bytes32(uint256(uint160(address(this))))
    );
    /// UUPSUpgradeable
    _testArbitrarySlot(
      address(proxyLightCore),
      bytes32(uint256(101)),
      bytes32(uint256(0))
    );
    /// PausableUpgradeable
    _testArbitrarySlot(
      address(proxyLightController),
      bytes32(uint256(201)),
      bytes32(uint256(0))
    );
    /// LightControllerStorageV1
    _testArbitrarySlot(
      address(proxyLightController),
      bytes32(
        keccak256(abi.encodePacked(abi.encode(keccak256("one")), uint256(251)))
      ),
      bytes32(uint256(0))
    );
    _testArbitrarySlot(
      address(proxyLightController),
      bytes32(
        keccak256(abi.encodePacked(abi.encode(keccak256("two")), uint256(251)))
      ),
      bytes32(uint256(0))
    );
    _testArbitrarySlot(
      address(proxyLightController),
      bytes32(
        keccak256(
          abi.encodePacked(abi.encode(keccak256("three")), uint256(251))
        )
      ),
      bytes32(uint256(0))
    );
  }
}
