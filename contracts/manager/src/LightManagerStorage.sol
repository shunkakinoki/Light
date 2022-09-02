/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import { UpgradeableBeacon } from "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";
import { ILightController } from "@lightdotso/controller/ILightController.sol";

/// @title Storage contract for the LightManager contract.
/// @author Shun Kakinoki
/// @notice This contract is used to manage the storage of the UUPS upgradeable contract.
contract LightManagerStorageV1 {
  ILightController internal controller;
  mapping(bytes32 => address) internal addressCache;

  uint256[48] private __gap;
}
