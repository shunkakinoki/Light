/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import { LightUpgradeable } from "@lightdotso/upgradeable/LightUpgradeable.sol";
import { ERC721Upgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";

contract MockLightOrbV1 is LightUpgradeable, ERC721Upgradeable {
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

contract MockLightOrbV2 is LightUpgradeable, ERC721Upgradeable {
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

contract MockLightOrbV3 is LightUpgradeable, ERC721Upgradeable {
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
