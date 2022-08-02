// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract EmptyUUPS is UUPSUpgradeable, OwnableUpgradeable {
  function initialize() external initializer {
    OwnableUpgradeable.__Ownable_init();
  }

  function _authorizeUpgrade(address) internal override onlyOwner {}
}
