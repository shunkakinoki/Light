// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract LightSpace is UUPSUpgradeable, OwnableUpgradeable {
  function initialize() external initializer {
    OwnableUpgradeable.__Ownable_init();
  }

  function _authorizeUpgrade(address) internal override onlyOwner {}
}
