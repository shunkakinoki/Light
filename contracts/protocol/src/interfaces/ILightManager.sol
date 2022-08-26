// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

interface ILightManager {
  function initialize(address _controller) external;

  event ContractSynced(bytes32 indexed nameHash, address contractAddress);
  event SetController(address controller);
}