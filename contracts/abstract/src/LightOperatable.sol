/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import { ILightOperatorStore } from "@lightdotso/operator/ILightOperatorStore.sol";
import { ILightOperatable } from "@lightdotso/abstract/ILightOperatable.sol";
import { LightOperatableStorageV1 } from "@lightdotso/abstract/LightOperatableStorage.sol";

/// @author Shun Kakinoki
/// @notice Modifiers to allow access to functions based on the message sender's operator status.
/// @notice Fork of JBoperatable at https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/abstract/JBoperatable.sol (MIT License)
abstract contract LightOperatable is
  LightOperatableStorageV1,
  ILightOperatable
{
  /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
  /*                        MODIFIER                            */
  /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

  /**
    @notice Only allows the speficied account or an operator of the account to proceed.
    @param _account The account to check for.
    @param _domain The domain namespace to look for an operator within.
    @param _permissionIndex The index of the permission to check for.
  */
  modifier requirePermission(
    address _account,
    uint256 _domain,
    uint256 _permissionIndex
  ) {
    _requirePermission(_account, _domain, _permissionIndex);
    _;
  }

  /**
    @notice Only allows the speficied account, an operator of the account to proceed, or a truthy override flag.
    @param _account The account to check for.
    @param _domain The domain namespace to look for an operator within.
    @param _permissionIndex The index of the permission to check for.
    @param _override A condition to force allowance for.
  */
  modifier requirePermissionAllowingOverride(
    address _account,
    uint256 _domain,
    uint256 _permissionIndex,
    bool _override
  ) {
    _requirePermissionAllowingOverride(
      _account,
      _domain,
      _permissionIndex,
      _override
    );
    _;
  }

  /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
  /*                        EXTERNAL                            */
  /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

  /**
    @notice Get the operator of the current contract.
  */
  function lightOperatorStore() external view returns (ILightOperatorStore) {
    return operator;
  }

  /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
  /*                        INTERNAL                            */
  /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

  /**
   * @dev Set operator.
   * @param _operator Operator contract address
   */
  function _setOperator(address _operator) internal {
    require(_operator != address(0), "Operator must be set");
    operator = ILightOperatorStore(_operator);
    emit SetOperator(_operator);
  }

  /**
    @notice Require the message sender is either the account or has the specified permission.
    @param _account The account to allow.
    @param _domain The domain namespace within which the permission index will be checked.
    @param _permissionIndex The permission index that an operator must have within the specified domain to be allowed.
  */
  function _requirePermission(
    address _account,
    uint256 _domain,
    uint256 _permissionIndex
  ) internal view {
    if (
      msg.sender != _account &&
      !operator.hasPermission(
        msg.sender,
        _account,
        _domain,
        _permissionIndex
      ) &&
      !operator.hasPermission(msg.sender, _account, 0, _permissionIndex)
    ) revert NotAuthorized();
  }

  /**
    @notice Require the message sender is either the account, has the specified permission, or the override condition is true.
    @param _account The account to allow.
    @param _domain The domain namespace within which the permission index will be checked.
    @param _domain The permission index that an operator must have within the specified domain to be allowed.
    @param _override The override condition to allow.
  */
  function _requirePermissionAllowingOverride(
    address _account,
    uint256 _domain,
    uint256 _permissionIndex,
    bool _override
  ) internal view {
    if (
      !_override &&
      msg.sender != _account &&
      !operator.hasPermission(
        msg.sender,
        _account,
        _domain,
        _permissionIndex
      ) &&
      !operator.hasPermission(msg.sender, _account, 0, _permissionIndex)
    ) revert NotAuthorized();
  }
}
