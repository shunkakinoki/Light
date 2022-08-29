// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import { UpgradeableBeacon } from "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";
import { IRenderer } from "@lightdotso/renderer/IRenderer.sol";
import { LightManager } from "@lightdotso/protocol/LightManager.sol";

/// @title Storage contract for the LightSpaceStorage contract.
/// @author Shun Kakinoki
/// @notice This contract is used to manage the storage of the UUPS upgradeable contract.
contract LightSpaceStorageV1 is LightManager {
  IRenderer public renderer;
  uint256 public count = 0;
  mapping(uint256 => mapping(uint256 => string)) public metadataContentOf;

  uint256[47] private __gap;
}
