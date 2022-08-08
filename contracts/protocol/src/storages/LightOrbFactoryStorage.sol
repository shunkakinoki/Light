// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import { UpgradeableBeacon } from "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";

contract LightOrbFactoryStorage {
  UpgradeableBeacon public upgradeableBeacon;

  uint256[49] private __gap;
}
