// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

interface ILightRewardsManager {
  struct Space {
    uint256 accRewardsForSpace;
    uint256 accRewardsForSpaceSnapshot;
    uint256 accRewardsPerSignalSnapshot;
    uint256 accRewardsPerAllocatedToken;
  }

  function setIssuanceRate(uint256 _issuanceRate) external;

  function setMinimumSpaceSignal(uint256 _minimumSpaceSignal) external;

  function setSpaceAvailabilityOracle(address _spaceAvailabilityOracle)
    external;

  function setDenied(bytes32 _spaceDeploymentID, bool _deny) external;

  function setDeniedMany(
    bytes32[] calldata _spaceDeploymentID,
    bool[] calldata _deny
  ) external;

  function isDenied(bytes32 _spaceDeploymentID) external view returns (bool);

  function getNewRewardsPerSignal() external view returns (uint256);

  function getAccRewardsPerSignal() external view returns (uint256);

  function getAccRewardsForSpace(bytes32 _spaceDeploymentID)
    external
    view
    returns (uint256);

  function getAccRewardsPerAllocatedToken(bytes32 _spaceDeploymentID)
    external
    view
    returns (uint256, uint256);

  function getRewards(address _allocationID) external view returns (uint256);

  function updateAccRewardsPerSignal() external returns (uint256);

  function takeRewards(address _allocationID) external returns (uint256);

  function onSpaceSignalUpdate(bytes32 _spaceDeploymentID)
    external
    returns (uint256);

  function onSpaceAllocationUpdate(bytes32 _spaceDeploymentID)
    external
    returns (uint256);
}
