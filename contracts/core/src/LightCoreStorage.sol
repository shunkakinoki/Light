/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import { LightManager } from "@lightdotso/manager/LightManager.sol";

/// @title Storage contract for the LightCore contract.
/// @author Shun Kakinoki
/// @notice This contract is used to manage the storage of the UUPS upgradeable contract.
contract LightCoreStorageV1 is LightManager {
  uint256[50] private __gap;
}
