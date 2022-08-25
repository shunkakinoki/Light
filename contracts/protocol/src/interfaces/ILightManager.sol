// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

interface ILightManager {
  function initialize() external;

  event ContractSynced(bytes32 indexed nameHash, address contractAddress);
}
