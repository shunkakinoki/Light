// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import { ILightCore } from "@lightdotso/protocol/interfaces/ILightCore.sol";
import { LightOperatable } from "@lightdotso/protocol/abstract/LightOperatable.sol";
import { LightCoreStorageV1 } from "@lightdotso/protocol/storages/LightCoreStorage.sol";
import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

/// @title Core contract for the Light protocol.
/// @title Keeps track of the current state of the protocol.
/// @title Inherits the `LightCoreStorage` storage contract to store the state variables in respected slots.
/// @author Shun Kakinoki
/// @notice This contract is used to manage the Light protocol.
contract LightCore is
  Initializable,
  OwnableUpgradeable,
  UUPSUpgradeable,
  LightOperatable,
  LightCoreStorageV1,
  ILightCore
{
  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize(address _controller, address _operator)
    external
    override
    reinitializer(2)
  {
    __Ownable_init();
    __UUPSUpgradeable_init();

    _setController(_controller);
    _setOperator(_operator);
  }

  function _authorizeUpgrade(address) internal override onlyOwner {}
}
