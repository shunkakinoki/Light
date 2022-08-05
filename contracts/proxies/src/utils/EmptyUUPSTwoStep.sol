// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import { TwoStepOwnableUpgradeable } from "@lightdotso/upgradeable/TwoStepOwnableUpgradeable.sol";

contract EmptyUUPSTwo is
  Initializable,
  TwoStepOwnableUpgradeable,
  UUPSUpgradeable
{
  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize() external initializer {
    __TwoStepOwnable_init();
    __UUPSUpgradeable_init();
  }

  function _authorizeUpgrade(address) internal override onlyOwner {}
}
