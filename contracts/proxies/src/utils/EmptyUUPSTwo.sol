// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import { TwoStepOwnableUpgradeable } from "@lightdotso/upgradeable/TwoStepOwnableUpgradeable.sol";

contract EmptyUUPSTwo is UUPSUpgradeable, TwoStepOwnableUpgradeable {
  function initialize() external initializer {
    TwoStepOwnableUpgradeable.__TwoStepOwnable_init();
  }

  function _authorizeUpgrade(address) internal override onlyOwner {}
}
