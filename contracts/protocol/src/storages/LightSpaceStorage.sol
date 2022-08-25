// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import { UpgradeableBeacon } from "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";
import { IRenderer } from "@lightdotso/renderer/IRenderer.sol";

/// @title Storage contract for the LightSpaceStorage contract.
/// @author Shun Kakinoki
/// @notice This contract is used to manage the storage of the UUPS upgradeable contract.
contract LightSpaceStorage {
  IRenderer public renderer;

  uint256[49] private __gap;
}
