// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import { BeaconProxy } from "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";
import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import { LightSpaceFactoryStorage, UpgradeableBeacon } from "./storages/LightSpaceFactoryStorage.sol";

contract LightSpaceFactory is
  Initializable,
  OwnableUpgradeable,
  UUPSUpgradeable,
  LightSpaceFactoryStorage
{
  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize(address implementationAddress_) external initializer {
    __Ownable_init();
    __UUPSUpgradeable_init();
    upgradeableBeacon = new UpgradeableBeacon(implementationAddress_);
  }

  function implementation() external view returns (address) {
    return upgradeableBeacon.implementation();
  }

  function _upgradeLightSpaces(address newImplementationAddress_)
    external
    onlyOwner
  {
    upgradeableBeacon.upgradeTo(newImplementationAddress_);
  }

  function _authorizeUpgrade(address) internal override onlyOwner {}
}
