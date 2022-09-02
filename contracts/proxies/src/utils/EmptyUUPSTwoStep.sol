/// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import { TwoStepOwnableUpgradeable } from "@lightdotso/upgradeable/TwoStepOwnableUpgradeable.sol";

contract EmptyUUPSTwoStep is
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
