// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import { UpgradeableBeacon } from "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";

/// @title Storage contract for the LightCore contract.
/// @author Shun Kakinoki
/// @notice This contract is used to manage the storage of the UUPS upgradeable contract.
contract LightCoreStorage {
  uint256[50] private __gap;
}
