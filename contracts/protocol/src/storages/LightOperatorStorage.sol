// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import { UpgradeableBeacon } from "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";

/// @title Storage contract for the LightOperator contract.
/// @author Shun Kakinoki
/// @notice This contract is used to manage the storage of the UUPS upgradeable contract.
contract LightOperatorStorage {
  // mapping(address => mapping(address => mapping(uint256 => uint256)))
  //   public permissionsOf;

  uint256[49] private __gap;
}
