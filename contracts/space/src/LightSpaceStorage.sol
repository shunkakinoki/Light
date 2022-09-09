/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import { IRenderer } from "@lightdotso/renderer/IRenderer.sol";
import { LightManager } from "@lightdotso/manager/LightManager.sol";

/// @title Storage contract for the LightSpaceStorage contract.
/// @author Shun Kakinoki
/// @notice This contract is used to manage the storage of the UUPS upgradeable contract.
contract LightSpaceStorageV1 is LightManager {
  IRenderer public renderer;
  uint256 public count;
  mapping(uint256 => mapping(uint256 => string)) public metadataContentOf;

  uint256[47] private __gap;
}
