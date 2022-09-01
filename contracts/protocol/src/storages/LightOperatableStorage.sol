// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import { ILightOperator } from "@lightdotso/protocol/interfaces/ILightOperator.sol";

/// @title Storage contract for the LightOperator contract.
/// @author Shun Kakinoki
/// @notice This contract is used to manage the storage of the UUPS upgradeable contract.
contract LightOperatableStorageV1 {
  ILightOperator internal operator;

  uint256[49] private __gap;
}
