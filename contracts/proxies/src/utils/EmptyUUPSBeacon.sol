// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import { UpgradeableBeacon } from "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";
import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract EmptyUUPSBeacon is Initializable, UUPSUpgradeable, OwnableUpgradeable {
  UpgradeableBeacon private upgradeableBeacon;

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize(address implementationAddress_) external initializer {
    __Ownable_init();
    __UUPSUpgradeable_init();
    upgradeableBeacon = new UpgradeableBeacon(implementationAddress_);
  }

  function _authorizeUpgrade(address) internal override onlyOwner {}
}
