// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import { ERC721Upgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";

contract MockLightOrbV1 is
  Initializable,
  OwnableUpgradeable,
  UUPSUpgradeable,
  ERC721Upgradeable
{
  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize(string calldata _name, string calldata _symbol)
    external
    reinitializer(2)
  {
    __Ownable_init();
    __UUPSUpgradeable_init();
    __ERC721_init(_name, _symbol);
  }

  function getVersion() external pure returns (uint256) {
    return 1;
  }

  function _authorizeUpgrade(address) internal override onlyOwner {}
}

contract MockLightOrbV2 is
  Initializable,
  OwnableUpgradeable,
  UUPSUpgradeable,
  ERC721Upgradeable
{
  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function reinitialize() external reinitializer(3) {}

  function getVersion() external pure returns (uint256) {
    return 2;
  }

  function _authorizeUpgrade(address) internal override onlyOwner {}
}

contract MockLightOrbV3 is
  Initializable,
  OwnableUpgradeable,
  UUPSUpgradeable,
  ERC721Upgradeable
{
  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function reinitialize() external reinitializer(4) {}

  function getVersion() external pure returns (uint256) {
    return 3;
  }

  function _authorizeUpgrade(address) internal override onlyOwner {}
}
