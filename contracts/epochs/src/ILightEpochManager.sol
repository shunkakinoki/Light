// SPDX-License-Identifier: GPL-2.0-or-later

pragma solidity ^0.8.16;

interface ILightEpochManager {
  /// INITIALIZER

  function initialize(address _controller, uint256 _epochLength) external;

  /// CONFIGURATION

  function setEpochLength(uint256 _epochLength) external;

  /// RUN

  function runEpoch() external;

  /// GETTERS

  function isCurrentEpochRun() external view returns (bool);

  function blockNum() external view returns (uint256);

  function blockHash(uint256 _block) external view returns (bytes32);

  function currentEpoch() external view returns (uint256);

  function currentEpochBlock() external view returns (uint256);

  function currentEpochBlockSinceStart() external view returns (uint256);

  function epochsSince(uint256 _epoch) external view returns (uint256);

  function epochsSinceUpdate() external view returns (uint256);
}
