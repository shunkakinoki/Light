/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import { UpgradeableBeacon } from "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";

/// @title Storage contract for the LightController contract.
/// @author Shun Kakinoki
/// @notice This contract is used to manage the storage of the UUPS upgradeable contract.
contract LightControllerStorageV1 {
  mapping(bytes32 => address) internal registry;

  uint256[49] private __gap;
}
