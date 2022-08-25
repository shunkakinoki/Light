// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import { ILightSpace } from "@lightdotso/protocol/interfaces/ILightSpace.sol";
import { LightSpaceStorage } from "@lightdotso/protocol/storages/LightSpaceStorage.sol";
import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import { ERC721Upgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";

/// @title Space contract for the Light protocol.
/// @dev Light spaces are a collective of orbs.
/// @author Shun Kakinoki
contract LightSpace is
  Initializable,
  OwnableUpgradeable,
  UUPSUpgradeable,
  ERC721Upgradeable,
  LightSpaceStorage,
  ILightSpace
{
  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize() external reinitializer(2) {
    __Ownable_init();
    __UUPSUpgradeable_init();
    __ERC721_init("Light Space", "LIGHTSPACE");
  }

  function _authorizeUpgrade(address) internal override onlyOwner {}
}
