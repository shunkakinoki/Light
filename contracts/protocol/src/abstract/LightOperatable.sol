// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { ILightOperator } from "@lightdotso/protocol/interfaces/ILightOperator.sol";
import { ILightOperatable } from "@lightdotso/protocol/interfaces/ILightOperatable.sol";

/// @author Shun Kakinoki
/// @notice Modifiers to allow access to functions based on the message sender's operator status.
/// @notice Fork of JBoperatable at https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/abstract/JBoperatable.sol (MIT License)
abstract contract LightOperatable is ILightOperatable {
  error UNAUTHORIZED();

  ILightOperator public operator;

  /**
   * @dev Set operator.
   * @param _operator Operator contract address
   */
  function _setOperator(address _operator) internal {
    require(_operator != address(0), "Operator must be set");
    operator = ILightOperator(_operator);
    emit SetOperator(_operator);
  }

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
    ) revert UNAUTHORIZED();
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
    ) revert UNAUTHORIZED();
  }
}
