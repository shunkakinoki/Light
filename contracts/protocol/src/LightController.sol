// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import { ILightController } from "@lightdotso/protocol/interfaces/ILightController.sol";
import { LightControllerStorage } from "@lightdotso/protocol/storages/LightControllerStorage.sol";
import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import { PausableUpgradeable } from "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";

/// @title Controller contract for the Light protocol.
/// @title Keeps track of the references of the protocol.
/// @title Inherits the `LightControllerStorage` storage contract to store the state variables in respected slots.
/// @author Shun Kakinoki
/// @notice This contract is a fork from Graph Protocol's Controller (GPL-2.0-or-later)
/// @notice Ref: https://github.com/graphprotocol/contracts/blob/dev/contracts/governance/Controller.sol
contract LightController is
  Initializable,
  OwnableUpgradeable,
  UUPSUpgradeable,
  PausableUpgradeable,
  LightControllerStorage,
  ILightController
{
  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize() external override reinitializer(2) {
    __Ownable_init();
    __Pausable_init();
    __UUPSUpgradeable_init();
  }

  function _authorizeUpgrade(address) internal override onlyOwner {}

  /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
  /*                          ERRORS                            */
  /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

  error CONTRACT_ADDRESS_NOT_SET();

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
    if (_contractAddress == address(0)) revert CONTRACT_ADDRESS_NOT_SET();
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
