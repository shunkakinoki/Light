// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import { UpgradeableBeacon } from "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";
import { IRenderer } from "@lightdotso/renderer/IRenderer.sol";

/// @title Storage contract for the LightOrb contract.
/// @author Shun Kakinoki
/// @notice This contract is used to manage the storage of the UUPS upgradeable contract.
contract LightOrbStorage {
  IRenderer public renderer;

  uint256[49] private __gap;
}