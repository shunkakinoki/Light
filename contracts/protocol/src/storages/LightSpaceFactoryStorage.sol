// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import { UpgradeableBeacon } from "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";

contract LightSpaceFactoryStorage {
  UpgradeableBeacon public upgradeableBeacon;
}
