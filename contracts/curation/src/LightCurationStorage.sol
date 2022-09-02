// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import { LightManager } from "@lightdotso/manager/LightManager.sol";
import { ILightCuration } from "@lightdotso/curation/ILightCuration.sol";
import { ILightCurationToken } from "@lightdotso/curation/ILightCurationToken.sol";

/// @title Storage contract for the LightCuration contract.
/// @author Shun Kakinoki
/// @notice This contract is used to manage the storage of the UUPS upgradeable contract.
abstract contract LightCurationStorageV1 is LightManager, ILightCuration {
  struct CurationPool {
    uint256 tokens;
    uint32 reserveRatio;
    ILightCurationToken lcs;
  }

  uint32 public curationTaxPercentage;

  uint32 public defaultReserveRatio;

  address public curationTokenMaster;

  uint256 public minimumCurationDeposit;

  address public bondingCurve;

  mapping(bytes32 => CurationPool) public pools;

  uint256[43] private __gap;
}
