/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

/// @title Storage contract for the LightOperatorStore contract.
/// @author Shun Kakinoki
/// @notice This contract is used to manage the storage of the UUPS upgradeable contract.
contract LightOperatorStoreStorageV1 {
  mapping(address => mapping(address => mapping(uint256 => uint256)))
    public permissionsOf;

  uint256[49] private __gap;
}
