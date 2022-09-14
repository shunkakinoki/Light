/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import { ILightCredentials } from "@lightdotso/credentials/ILightCredentials.sol";
import { ILightOperatorStore } from "@lightdotso/operator/ILightOperatorStore.sol";
import { LightSpaceMetadata } from "@lightdotso/space/LightSpaceMetadata.sol";
import { LightOperatable } from "@lightdotso/abstract/LightOperatable.sol";
import { LightCredentialsStorageV1 } from "@lightdotso/credentials/LightCredentialsStorage.sol";
import { LightUpgradeable } from "@lightdotso/upgradeable/LightUpgradeable.sol";

/// @title Credentials contract for the Light protocol.
/// @title Keeps track of the current state of the protocol.
/// @title Inherits the `LightCoreStorage` storage contract to store the state variables in respected slots.
/// @author Shun Kakinoki
contract LightCredentials is
  LightUpgradeable,
  LightOperatable,
  LightCredentialsStorageV1,
  ILightCredentials
{
  ///////////////////
  /// UPGRADEABLE ///
  ///////////////////

  function initialize(address _controller, address _operator)
    external
    reinitializer(2)
  {
    __Ownable_init();
    __UUPSUpgradeable_init();

    _setController(_controller);
    _setOperator(_operator);
  }
}
