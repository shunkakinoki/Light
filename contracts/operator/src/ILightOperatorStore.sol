/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import { LightOperatorStoreData } from "@lightdotso/operator/LightOperatorStoreData.sol";

interface ILightOperatorStore {
  error PermissionIndexOutOfBounds();

  event SetOperator(
    address indexed operator,
    address indexed account,
    uint256 indexed domain,
    uint256[] permissionIndexes,
    uint256 packed
  );

  function initialize() external;

  function getPermissionsOf(
    address _operator,
    address _account,
    uint256 _domain
  ) external view returns (uint256);

  function hasPermission(
    address _operator,
    address _account,
    uint256 _domain,
    uint256 _permissionIndex
  ) external view returns (bool);

  function hasPermissions(
    address _operator,
    address _account,
    uint256 _domain,
    uint256[] calldata _permissionIndexes
  ) external view returns (bool);

  function setOperator(LightOperatorStoreData calldata _operatorData) external;

  function setOperators(LightOperatorStoreData[] calldata _operatorData)
    external;
}
