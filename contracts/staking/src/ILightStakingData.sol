// SPDX-License-Identifier: GPL-2.0-or-later

pragma solidity ^0.8.16;
pragma abicoder v2;

interface ILightStakingData {
  struct Allocation {
    address indexer;
    bytes32 spaceDeploymentID;
    uint256 tokens; // Tokens allocated to a SpaceDeployment
    uint256 createdAtEpoch; // Epoch when it was created
    uint256 closedAtEpoch; // Epoch when it was closed
    uint256 collectedFees; // Collected fees for the allocation
    uint256 effectiveAllocation; // Effective allocation when closed
    uint256 accRewardsPerAllocatedToken; // Snapshot used for reward calc
  }

  struct CloseAllocationRequest {
    address allocationID;
    bytes32 poi;
  }

  struct DelegationPool {
    uint32 cooldownBlocks; // Blocks to wait before updating parameters
    uint32 indexingRewardCut; // in PPM
    uint32 queryFeeCut; // in PPM
    uint256 updatedAtBlock; // Block when the pool was last updated
    uint256 tokens; // Total tokens as pool reserves
    uint256 shares; // Total shares minted in the pool
    mapping(address => Delegation) delegators; // Mapping of delegator => Delegation
  }

  struct Delegation {
    uint256 shares; // Shares owned by a delegator in the pool
    uint256 tokensLocked; // Tokens locked for undelegation
    uint256 tokensLockedUntil; // Block when locked tokens can be withdrawn
  }
}
