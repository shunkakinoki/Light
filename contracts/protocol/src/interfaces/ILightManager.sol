// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

interface ILightManager {
  event ContractSynced(bytes32 indexed nameHash, address contractAddress);
  event SetController(address controller);
}
