// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import { ILightManager } from "@lightdotso/protocol/interfaces/ILightManager.sol";
import { LightManagerStorage } from "@lightdotso/protocol/storages/LightManagerStorage.sol";
import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

/// @title Manager contract for the Light protocol.
/// @title Keeps track of the references of the protocol.
/// @title Inherits the `LightManagerStorage` storage contract to store the state variables in respected slots.
/// @author Shun Kakinoki
/// @notice This contract is a fork from Graph Protocol's Managed (GPL-2.0-or-later)
/// @notice Ref: https://github.com/graphprotocol/contracts/blob/dev/contracts/governance/Managed.sol
contract LightManager is
  Initializable,
  OwnableUpgradeable,
  UUPSUpgradeable,
  LightManagerStorage,
  ILightManager
{
  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize() external override reinitializer(2) {
    __Ownable_init();
    __UUPSUpgradeable_init();
  }

  function _authorizeUpgrade(address) internal override onlyOwner {}

  /**
   * @dev Resolve a contract address from the cache or the Controller if not found.
   * @return Address of the contract
   */
  function _resolveContract(bytes32 _nameHash) internal view returns (address) {
    address contractAddress = addressCache[_nameHash];
    if (contractAddress == address(0)) {
      contractAddress = controller.getContractProxy(_nameHash);
    }
    return contractAddress;
  }

  /**
   * @dev Cache a contract address from the Controller registry.
   * @param _name Name of the contract to sync into the cache
   */
  function _syncContract(string memory _name) internal {
    bytes32 nameHash = keccak256(abi.encodePacked(_name));
    address contractAddress = controller.getContractProxy(nameHash);
    if (addressCache[nameHash] != contractAddress) {
      addressCache[nameHash] = contractAddress;
      emit ContractSynced(nameHash, contractAddress);
    }
  }

  /**
   * @dev Sync protocol contract addresses from the Controller registry.
   * @dev This function will cache all the contracts using the latest addresses
   * @dev Anyone can call the function whenever a Proxy contract change in the
   * @dev controller to ensure the protocol is using the latest version
   */
  function syncAllContracts() external {
    _syncContract("LightCore");
    _syncContract("LightOperator");
    _syncContract("LightOrb");
    _syncContract("LightOrbFactory");
    _syncContract("LightSpace");
  }
}
