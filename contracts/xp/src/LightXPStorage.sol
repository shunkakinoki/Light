/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import { IRenderer } from "@lightdotso/renderer/IRenderer.sol";

/// @title Storage contract for the LightXP contract.
/// @author Shun Kakinoki
/// @notice This contract is used to manage the storage of the UUPS upgradeable contract.
contract LightXPStorageV1 {
  uint256[50] private __gap;
}
