/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import { PausableUpgradeable } from "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";

abstract contract LightPausableUpgradeable is
  Initializable,
  OwnableUpgradeable,
  UUPSUpgradeable,
  PausableUpgradeable
{
  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize() external virtual reinitializer(1) {
    __Ownable_init();
    __UUPSUpgradeable_init();
    __Pausable_init();
  }

  function _authorizeUpgrade(address) internal virtual override onlyOwner {}
}
