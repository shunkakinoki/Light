/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import { LightManager } from "@lightdotso/manager/LightManager.sol";

contract LightEpochManagerStorageV1 is LightManager {
  uint256 public epochLength;

  uint256 public lastRunEpoch;

  uint256 public lastLengthUpdateEpoch;
  uint256 public lastLengthUpdateBlock;
}
