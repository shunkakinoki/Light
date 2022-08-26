// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

interface ILightManager {
  event ContractSynced(bytes32 indexed nameHash, address contractAddress);
  event SetController(address controller);
}
