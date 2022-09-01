// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import { ILightOperatorStore } from "@lightdotso/operator/ILightOperatorStore.sol";
import { LightOperatorStoreStorageV1 } from "@lightdotso/operator/LightOperatorStoreStorage.sol";
import { LightOperatorStoreData } from "@lightdotso/operator/LightOperatorStoreData.sol";
import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

/// @title Operator contract for the Light protocol.
/// @title Keeps track of the permission and access rights of the protocol.
/// @title Inherits the `LightCoreStorage` storage contract to store the state variables in respected slots.
/// @author Shun Kakinoki
/// @notice Stores operator permissions for all addresses. Addresses can give permissions to any other address to take specific indexed actions on their behalf.
/// @notice Fork of JBOperatorStore at https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/JBOperatorStore.sol (MIT License)
contract LightOperatorStore is
  Initializable,
  OwnableUpgradeable,
  UUPSUpgradeable,
  LightOperatorStoreStorageV1,
  ILightOperatorStore
{
  /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
  /*                       UPGRADEABLE                          */
  /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

  //// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize() external override reinitializer(2) {
    __Ownable_init();
    __UUPSUpgradeable_init();
  }

  function _authorizeUpgrade(address) internal override onlyOwner {}

  /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
  /*                      EXTERNAL VIEWS                        */
  /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

  /**
    @notice The permissions that an operator has been given to operate on a specific domain.
    @dev An account can give an operator permissions that only pertain to a specific domain namespace.
    @dev There is no domain with a value of 0 – accounts can use the 0 domain to give an operator
    @dev permissions to all domains on their behalf.
    @dev Permissions are stored in a packed `uint256`. Each 256 bits represents the on/off state of a permission. Applications can specify the significance of each index.
    @dev _operator The address of the operator.
    @dev _account The address of the account being operated.
    @dev _domain The domain within which the permissions apply. Applications can use the domain namespace as they wish.
  */
  function getPermissionsOf(
    address _operator,
    address _account,
    uint256 _domain
  ) external view returns (uint256) {
    return permissionsOf[_operator][_account][_domain];
  }

  /**
    @notice Whether or not an operator has the permission to take a certain action pertaining to the specified domain.
    @param _operator The operator to check.
    @param _account The account that has given out permissions to the operator.
    @param _domain The domain that the operator has been given permissions to operate.
    @param _permissionIndex The permission index to check for.
    @return A flag indicating whether the operator has the specified permission.
  */
  function hasPermission(
    address _operator,
    address _account,
    uint256 _domain,
    uint256 _permissionIndex
  ) external view override returns (bool) {
    if (_permissionIndex > 255) revert PermissionIndexOutOfBounds();

    return (((permissionsOf[_operator][_account][_domain] >> _permissionIndex) &
      1) == 1);
  }

  /**
    @notice Whether or not an operator has the permission to take certain actions pertaining to the specified domain.
    @param _operator The operator to check.
    @param _account The account that has given out permissions to the operator.
    @param _domain The domain that the operator has been given permissions to operate.
    @param _permissionIndexes An array of permission indexes to check for.
    @return A flag indicating whether the operator has all specified permissions.
  */
  function hasPermissions(
    address _operator,
    address _account,
    uint256 _domain,
    uint256[] calldata _permissionIndexes
  ) external view override returns (bool) {
    for (uint256 _i = 0; _i < _permissionIndexes.length; _i++) {
      uint256 _permissionIndex = _permissionIndexes[_i];

      if (_permissionIndex > 255) revert PermissionIndexOutOfBounds();

      if (
        ((permissionsOf[_operator][_account][_domain] >> _permissionIndex) &
          1) == 0
      ) return false;
    }
    return true;
  }

  /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
  /*                 EXTERNAL TRANSACTIONS                      */
  /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

  /**
    @notice Sets permissions for an operators.
    @dev Only an address can set its own operators.
    @param _operatorData The data that specifies the params for the operator being set.
  */
  function setOperator(LightOperatorStoreData calldata _operatorData)
    external
    override
  {
    /// Pack the indexes into a uint256.
    uint256 _packed = _packedPermissions(_operatorData.permissionIndexes);

    /// Store the new value.
    permissionsOf[_operatorData.operator][msg.sender][
      _operatorData.domain
    ] = _packed;

    emit SetOperator(
      _operatorData.operator,
      msg.sender,
      _operatorData.domain,
      _operatorData.permissionIndexes,
      _packed
    );
  }

  /**
    @notice Sets permissions for many operators.
    @dev Only an address can set its own operators.
    @param _operatorData The data that specify the params for each operator being set.
  */
  function setOperators(LightOperatorStoreData[] calldata _operatorData)
    external
    override
  {
    for (uint256 _i = 0; _i < _operatorData.length; _i++) {
      /// Pack the indexes into a uint256.
      uint256 _packed = _packedPermissions(_operatorData[_i].permissionIndexes);

      /// Store the new value.
      permissionsOf[_operatorData[_i].operator][msg.sender][
        _operatorData[_i].domain
      ] = _packed;

      emit SetOperator(
        _operatorData[_i].operator,
        msg.sender,
        _operatorData[_i].domain,
        _operatorData[_i].permissionIndexes,
        _packed
      );
    }
  }

  /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
  /*               PRIVATE HELPER FUNCTIONS                     */
  /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

  /**
    @notice Converts an array of permission indexes to a packed `uint256`.
    @param _indexes The indexes of the permissions to pack.
    @return packed The packed value.
  */
  function _packedPermissions(uint256[] calldata _indexes)
    private
    pure
    returns (uint256 packed)
  {
    for (uint256 _i = 0; _i < _indexes.length; _i++) {
      uint256 _index = _indexes[_i];

      if (_index > 255) revert PermissionIndexOutOfBounds();

      /// Turn the bit at the index on.
      packed |= 1 << _index;
    }
  }
}
