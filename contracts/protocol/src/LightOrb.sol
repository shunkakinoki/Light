// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import { ERC721Upgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";

import { LightOrbStorage } from "./storages/LightOrbStorage.sol";

/// @title NFT contract for the Light protocol.
/// @title Responsible for managing the rendering of the NFTs.
/// @author Shun Kakinoki
contract LightOrb is
  Initializable,
  OwnableUpgradeable,
  UUPSUpgradeable,
  ERC721Upgradeable,
  LightOrbStorage
{
  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize(string calldata name_, string calldata symbol_)
    external
    reinitializer(2)
  {
    __Ownable_init();
    __UUPSUpgradeable_init();
    __ERC721_init(name_, symbol_);
  }

  function _authorizeUpgrade(address) internal override onlyOwner {}
}
