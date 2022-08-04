// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import { BeaconProxy } from "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";
import { UpgradeableBeacon } from "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";
import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract LightSpaceController is UUPSUpgradeable, OwnableUpgradeable {
  function initialize() external initializer {
    OwnableUpgradeable.__Ownable_init();
  }

  function _authorizeUpgrade(address) internal override onlyOwner {}
}
