/// SPDX-License-Identifier: GPL-2.0-or-later

pragma solidity ^0.8.16;
pragma abicoder v2;

import "./ILightStakingData.sol";

interface ILightStaking is ILightStakingData {
  enum AllocationState {
    Null,
    Active,
    Closed,
    Finalized,
    Claimed
  }

  function setMinimumIndexerStake(uint256 _minimumIndexerStake) external;

  function setThawingPeriod(uint32 _thawingPeriod) external;

  function setCurationPercentage(uint32 _percentage) external;

  function setProtocolPercentage(uint32 _percentage) external;

  function setChannelDisputeEpochs(uint32 _channelDisputeEpochs) external;

  function setMaxAllocationEpochs(uint32 _maxAllocationEpochs) external;

  function setRebateRatio(uint32 _alphaNumerator, uint32 _alphaDenominator)
    external;

  function setDelegationRatio(uint32 _delegationRatio) external;

  function setDelegationParameters(
    uint32 _indexingRewardCut,
    uint32 _queryFeeCut,
    uint32 _cooldownBlocks
  ) external;

  function setDelegationParametersCooldown(uint32 _blocks) external;

  function setDelegationUnbondingPeriod(uint32 _delegationUnbondingPeriod)
    external;

  function setDelegationTaxPercentage(uint32 _percentage) external;

  function setSlasher(address _slasher, bool _allowed) external;

  function setAssetHolder(address _assetHolder, bool _allowed) external;

  function setOperator(address _operator, bool _allowed) external;

  function isOperator(address _operator, address _indexer)
    external
    view
    returns (bool);

  function stake(uint256 _tokens) external;

  function stakeTo(address _indexer, uint256 _tokens) external;

  function unstake(uint256 _tokens) external;

  function slash(
    address _indexer,
    uint256 _tokens,
    uint256 _reward,
    address _beneficiary
  ) external;

  function withdraw() external;

  function setRewardsDestination(address _destination) external;

  function delegate(address _indexer, uint256 _tokens)
    external
    returns (uint256);

  function undelegate(address _indexer, uint256 _shares)
    external
    returns (uint256);

  function withdrawDelegated(address _indexer, address _newIndexer)
    external
    returns (uint256);

  function allocate(
    bytes32 _spaceDeploymentID,
    uint256 _tokens,
    address _allocationID,
    bytes32 _metadata,
    bytes calldata _proof
  ) external;

  function allocateFrom(
    address _indexer,
    bytes32 _spaceDeploymentID,
    uint256 _tokens,
    address _allocationID,
    bytes32 _metadata,
    bytes calldata _proof
  ) external;

  function closeAllocation(address _allocationID, bytes32 _poi) external;

  function closeAllocationMany(CloseAllocationRequest[] calldata _requests)
    external;

  function closeAndAllocate(
    address _oldAllocationID,
    bytes32 _poi,
    address _indexer,
    bytes32 _spaceDeploymentID,
    uint256 _tokens,
    address _allocationID,
    bytes32 _metadata,
    bytes calldata _proof
  ) external;

  function collect(uint256 _tokens, address _allocationID) external;

  function claim(address _allocationID, bool _restake) external;

  function claimMany(address[] calldata _allocationID, bool _restake) external;

  function hasStake(address _indexer) external view returns (bool);

  function getIndexerStakedTokens(address _indexer)
    external
    view
    returns (uint256);

  function getIndexerCapacity(address _indexer) external view returns (uint256);

  function getAllocation(address _allocationID)
    external
    view
    returns (Allocation memory);

  function getAllocationState(address _allocationID)
    external
    view
    returns (AllocationState);

  function isAllocation(address _allocationID) external view returns (bool);

  function getspaceAllocatedTokens(bytes32 _spaceDeploymentID)
    external
    view
    returns (uint256);

  function getDelegation(address _indexer, address _delegator)
    external
    view
    returns (Delegation memory);

  function isDelegator(address _indexer, address _delegator)
    external
    view
    returns (bool);
}
