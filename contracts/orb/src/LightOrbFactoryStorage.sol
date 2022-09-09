/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import { LightManager } from "@lightdotso/manager/LightManager.sol";

import { UpgradeableBeacon } from "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";

/// @title Storage contract for the LightOrb contract.
/// @author Shun Kakinoki
/// @notice This contract is used to manage the storage of the UUPS upgradeable contract.
/// @notice V0 is necessary to inherit `EmptyUUPSBeacon` slot
contract LightOrbFactoryStorageV0 {
  UpgradeableBeacon public upgradeableBeacon;

  uint256[49] private __gap;
}

contract LightOrbFactoryStorageV1 is LightOrbFactoryStorageV0, LightManager {}
