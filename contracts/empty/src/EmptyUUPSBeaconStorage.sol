/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import { UpgradeableBeacon } from "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";

/// @title Storage contract for the EmptyUUPSBeacon contract.
/// @author Shun Kakinoki
/// @notice V0 is necessary to inherit `EmptyUUPSBeacon` slot
contract EmptyUUPSBeaconStorage {
  UpgradeableBeacon public upgradeableBeacon;

  uint256[49] private __gap;
}
