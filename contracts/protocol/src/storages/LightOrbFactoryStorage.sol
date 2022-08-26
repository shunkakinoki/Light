// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import { LightManager } from "@lightdotso/protocol/LightManager.sol";
import { UpgradeableBeacon } from "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";

/// @title Storage contract for the LightOrb contract.
/// @author Shun Kakinoki
/// @notice This contract is used to manage the storage of the UUPS upgradeable contract.
contract LightOrbFactoryStorage is LightManager {
  UpgradeableBeacon public upgradeableBeacon;

  uint256[49] private __gap;
}
