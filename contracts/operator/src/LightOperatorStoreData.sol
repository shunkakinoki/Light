/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

/**
  @param operator The address of the operator.
  @param domain The domain within which the operator is being given permissions. A domain of 0 is a wildcard domain, which gives an operator access to all domains.
  @param permissionIndexes The indexes of the permissions the operator is being given.
*/
struct LightOperatorStoreData {
  address operator;
  uint256 domain;
  uint256[] permissionIndexes;
}
