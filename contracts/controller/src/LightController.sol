/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import { ILightController } from "@lightdotso/controller/ILightController.sol";
import { LightControllerStorageV1 } from "@lightdotso/controller/LightControllerStorage.sol";
import { LightPausableUpgradeable } from "@lightdotso/upgradeable/LightPausableUpgradeable.sol";

/// @title Controller contract for the Light protocol.
/// @title Keeps track of the contract references of the protocol.
/// @title Inherits the `LightControllerStorage` storage contract to store the state variables in respected slots.
/// @author Shun Kakinoki
/// @notice This contract is a fork from Graph Protocol's Controller (GPL-2.0-or-later)
/// @notice Ref: https://github.com/graphprotocol/contracts/blob/dev/contracts/governance/Controller.sol
contract LightController is
  LightPausableUpgradeable,
  LightControllerStorageV1,
  ILightController
{
  ///////////////////
  /// UPGRADEABLE ///
  ///////////////////

  function initialize()
    external
    override(LightPausableUpgradeable, ILightController)
    reinitializer(2)
  {
    __Ownable_init();
    __UUPSUpgradeable_init();
    __Pausable_init();
  }

  /////////////////////////////
  /// EXTERNAL TRANSACTIONS ///
  /////////////////////////////

  /**
   * @notice Register contract id and mapped address
   * @param _id Contract id (keccak256 hash of contract name)
   * @param _contractAddress Contract address
   */
  function setContractProxy(bytes32 _id, address _contractAddress)
    external
    override
    onlyOwner
  {
    if (_contractAddress == address(0)) revert ContractAddressNotSet();
    registry[_id] = _contractAddress;
    emit SetContractProxy(_id, _contractAddress);
  }

  /**
   * @notice Unregister a contract address
   * @param _id Contract id (keccak256 hash of contract name)
   */
  function unsetContractProxy(bytes32 _id) external override onlyOwner {
    registry[_id] = address(0);
    emit SetContractProxy(_id, address(0));
  }

  /**
   * @notice Get contract proxy address by its id
   * @param _id Contract id
   */
  function getContractProxy(bytes32 _id)
    public
    view
    override
    returns (address)
  {
    return registry[_id];
  }
}
