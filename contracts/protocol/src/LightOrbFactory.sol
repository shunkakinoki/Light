// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import { BeaconProxy } from "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";
import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import { LightOrb } from "./LightOrb.sol";
import { LightOrbFactoryStorage, UpgradeableBeacon } from "./storages/LightOrbFactoryStorage.sol";

/// @title Factory contract for generating Light Orbs.
/// @title Inherits the `LightOrbFactoryStorage` storage contract to store the state variables in respected slots.
/// @author Shun Kakinoki
contract LightOrbFactory is
  Initializable,
  OwnableUpgradeable,
  UUPSUpgradeable,
  LightOrbFactoryStorage
{
  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize(address implementationAddress_)
    external
    reinitializer(2)
  {
    __Ownable_init();
    __UUPSUpgradeable_init();
    upgradeableBeacon = new UpgradeableBeacon(implementationAddress_);
  }

  function implementation() external view returns (address) {
    return upgradeableBeacon.implementation();
  }

  function _createLightOrb(string calldata name_, string calldata symbol_)
    external
    returns (address)
  {
    BeaconProxy orb = new BeaconProxy(
      address(upgradeableBeacon),
      abi.encodeWithSelector(LightOrb.initialize.selector, name_, symbol_)
    );
    return address(orb);
  }

  function _upgradeBeaconProxy(address newImplementationAddress_)
    external
    onlyOwner
  {
    upgradeableBeacon.upgradeTo(newImplementationAddress_);
  }

  function _authorizeUpgrade(address) internal override onlyOwner {}
}
