/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import { ILightCuration } from "@lightdotso/curation/ILightCuration.sol";
import { ILightRewardsManager } from "@lightdotso/rewards/ILightRewardsManager.sol";
import { ILightStaking } from "@lightdotso/staking/ILightStaking.sol";
import { ILightToken } from "@lightdotso/token/ILightToken.sol";
import { ILightOperatorStore } from "@lightdotso/operator/ILightOperatorStore.sol";
import { LightSpaceMetadata } from "@lightdotso/space/LightSpaceMetadata.sol";
import { LightOperatable } from "@lightdotso/abstract/LightOperatable.sol";
import { LightStakingStorageV1 } from "@lightdotso/staking/LightStakingStorage.sol";
import { LightPausableUpgradeable } from "@lightdotso/upgradeable/LightPausableUpgradeable.sol";

import "@lightdotso/staking/libs/MathUtils.sol";
import "@lightdotso/staking/libs/Rebates.sol";
import "@lightdotso/staking/libs/Stakes.sol";
import "@lightdotso/utils/TokenUtils.sol";

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/// @title Core contract for the Light protocol.
/// @title Keeps track of the current state of the protocol.
/// @title Inherits the `LightCoreStorage` storage contract to store the state variables in respected slots.
/// @author Shun Kakinoki
/// @notice This contract is used to manage the Light protocol.
/// @notice Implemented based of JBController at https://github.com/jbx-protocol/juice-contracts-v2/blob/main/contracts/JBController.sol (MIT License)
contract LightStaking is
  LightPausableUpgradeable,
  LightOperatable,
  LightStakingStorageV1,
  ILightStaking
{
  using SafeMath for uint256;
  using Stakes for Stakes.Indexer;
  using Rebates for Rebates.Pool;

  // 100% in parts per million
  uint32 private constant MAX_PPM = 1000000;

  // -- Events --

  /**
   * @dev Emitted when `indexer` update the delegation parameters for its delegation pool.
   */
  event DelegationParametersUpdated(
    address indexed indexer,
    uint32 indexingRewardCut,
    uint32 queryFeeCut,
    uint32 cooldownBlocks
  );

  /**
   * @dev Emitted when `indexer` stake `tokens` amount.
   */
  event StakeDeposited(address indexed indexer, uint256 tokens);

  /**
   * @dev Emitted when `indexer` unstaked and locked `tokens` amount `until` block.
   */
  event StakeLocked(address indexed indexer, uint256 tokens, uint256 until);

  /**
   * @dev Emitted when `indexer` withdrew `tokens` staked.
   */
  event StakeWithdrawn(address indexed indexer, uint256 tokens);

  /**
   * @dev Emitted when `indexer` was slashed for a total of `tokens` amount.
   * Tracks `reward` amount of tokens given to `beneficiary`.
   */
  event StakeSlashed(
    address indexed indexer,
    uint256 tokens,
    uint256 reward,
    address beneficiary
  );

  /**
   * @dev Emitted when `delegator` delegated `tokens` to the `indexer`, the delegator
   * gets `shares` for the delegation pool proportionally to the tokens staked.
   */
  event StakeDelegated(
    address indexed indexer,
    address indexed delegator,
    uint256 tokens,
    uint256 shares
  );

  /**
   * @dev Emitted when `delegator` undelegated `tokens` from `indexer`.
   * Tokens get locked for withdrawal after a period of time.
   */
  event StakeDelegatedLocked(
    address indexed indexer,
    address indexed delegator,
    uint256 tokens,
    uint256 shares,
    uint256 until
  );

  /**
   * @dev Emitted when `delegator` withdrew delegated `tokens` from `indexer`.
   */
  event StakeDelegatedWithdrawn(
    address indexed indexer,
    address indexed delegator,
    uint256 tokens
  );

  /**
   * @dev Emitted when `indexer` allocated `tokens` amount to `spaceDeploymentID`
   * during `epoch`.
   * `allocationID` indexer derived address used to identify the allocation.
   * `metadata` additional information related to the allocation.
   */
  event AllocationCreated(
    address indexed indexer,
    bytes32 indexed spaceDeploymentID,
    uint256 epoch,
    uint256 tokens,
    address indexed allocationID,
    bytes32 metadata
  );

  /**
   * @dev Emitted when `indexer` collected `tokens` amount in `epoch` for `allocationID`.
   * These funds are related to `spaceDeploymentID`.
   * The `from` value is the sender of the collected funds.
   */
  event AllocationCollected(
    address indexed indexer,
    bytes32 indexed spaceDeploymentID,
    uint256 epoch,
    uint256 tokens,
    address indexed allocationID,
    address from,
    uint256 curationFees,
    uint256 rebateFees
  );

  /**
   * @dev Emitted when `indexer` close an allocation in `epoch` for `allocationID`.
   * An amount of `tokens` get unallocated from `spaceDeploymentID`.
   * The `effectiveAllocation` are the tokens allocated from creation to closing.
   * This event also emits the POI (proof of indexing) submitted by the indexer.
   * `isPublic` is true if the sender was someone other than the indexer.
   */
  event AllocationClosed(
    address indexed indexer,
    bytes32 indexed spaceDeploymentID,
    uint256 epoch,
    uint256 tokens,
    address indexed allocationID,
    uint256 effectiveAllocation,
    address sender,
    bytes32 poi,
    bool isPublic
  );

  /**
   * @dev Emitted when `indexer` claimed a rebate on `spaceDeploymentID` during `epoch`
   * related to the `forEpoch` rebate pool.
   * The rebate is for `tokens` amount and `unclaimedAllocationsCount` are left for claim
   * in the rebate pool. `delegationFees` collected and sent to delegation pool.
   */
  event RebateClaimed(
    address indexed indexer,
    bytes32 indexed spaceDeploymentID,
    address indexed allocationID,
    uint256 epoch,
    uint256 forEpoch,
    uint256 tokens,
    uint256 unclaimedAllocationsCount,
    uint256 delegationFees
  );

  /**
   * @dev Emitted when `caller` set `slasher` address as `allowed` to slash stakes.
   */
  event SlasherUpdate(
    address indexed caller,
    address indexed slasher,
    bool allowed
  );

  /**
   * @dev Emitted when `caller` set `assetHolder` address as `allowed` to send funds
   * to staking contract.
   */
  event AssetHolderUpdate(
    address indexed caller,
    address indexed assetHolder,
    bool allowed
  );

  /**
   * @dev Emitted when `indexer` set `operator` access.
   */
  event SetOperator(
    address indexed indexer,
    address indexed operator,
    bool allowed
  );

  /**
   * @dev Emitted when `indexer` set an address to receive rewards.
   */
  event SetRewardsDestination(
    address indexed indexer,
    address indexed destination
  );

  /**
   * @dev Check if the caller is the slasher.
   */
  modifier onlySlasher() {
    require(slashers[msg.sender] == true, "!slasher");
    _;
  }

  /**
   * @dev Check if the caller is authorized (indexer or operator)
   */
  function _isAuth(address _indexer) private view returns (bool) {
    return msg.sender == _indexer || isOperator(msg.sender, _indexer) == true;
  }

  /**
   * @dev Initialize this contract.
   */
  function initialize(
    address _controller,
    uint256 _minimumIndexerStake,
    uint32 _thawingPeriod,
    uint32 _protocolPercentage,
    uint32 _curationPercentage,
    uint32 _channelDisputeEpochs,
    uint32 _maxAllocationEpochs,
    uint32 _delegationUnbondingPeriod,
    uint32 _delegationRatio,
    uint32 _rebateAlphaNumerator,
    uint32 _rebateAlphaDenominator
  ) external reinitializer(2) {
    __Ownable_init();
    __UUPSUpgradeable_init();
    __Pausable_init();

    _setController(_controller);

    // Settings
    _setMinimumIndexerStake(_minimumIndexerStake);
    _setThawingPeriod(_thawingPeriod);

    _setProtocolPercentage(_protocolPercentage);
    _setCurationPercentage(_curationPercentage);

    _setChannelDisputeEpochs(_channelDisputeEpochs);
    _setMaxAllocationEpochs(_maxAllocationEpochs);

    _setDelegationUnbondingPeriod(_delegationUnbondingPeriod);
    _setDelegationRatio(_delegationRatio);
    _setDelegationParametersCooldown(0);
    _setDelegationTaxPercentage(0);

    _setRebateRatio(_rebateAlphaNumerator, _rebateAlphaDenominator);
  }

  /**
   * @dev Set the minimum indexer stake required to.
   * @param _minimumIndexerStake Minimum indexer stake
   */
  function setMinimumIndexerStake(uint256 _minimumIndexerStake)
    external
    override
    onlyOwner
  {
    _setMinimumIndexerStake(_minimumIndexerStake);
  }

  /**
   * @dev Internal: Set the minimum indexer stake required.
   * @param _minimumIndexerStake Minimum indexer stake
   */
  function _setMinimumIndexerStake(uint256 _minimumIndexerStake) private {
    require(_minimumIndexerStake > 0, "!minimumIndexerStake");
    minimumIndexerStake = _minimumIndexerStake;
    emit ParameterUpdated("minimumIndexerStake");
  }

  /**
   * @dev Set the thawing period for unstaking.
   * @param _thawingPeriod Period in blocks to wait for token withdrawals after unstaking
   */
  function setThawingPeriod(uint32 _thawingPeriod) external override onlyOwner {
    _setThawingPeriod(_thawingPeriod);
  }

  /**
   * @dev Internal: Set the thawing period for unstaking.
   * @param _thawingPeriod Period in blocks to wait for token withdrawals after unstaking
   */
  function _setThawingPeriod(uint32 _thawingPeriod) private {
    require(_thawingPeriod > 0, "!thawingPeriod");
    thawingPeriod = _thawingPeriod;
    emit ParameterUpdated("thawingPeriod");
  }

  /**
   * @dev Set the curation percentage of query fees sent to curators.
   * @param _percentage Percentage of query fees sent to curators
   */
  function setCurationPercentage(uint32 _percentage)
    external
    override
    onlyOwner
  {
    _setCurationPercentage(_percentage);
  }

  /**
   * @dev Internal: Set the curation percentage of query fees sent to curators.
   * @param _percentage Percentage of query fees sent to curators
   */
  function _setCurationPercentage(uint32 _percentage) private {
    // Must be within 0% to 100% (inclusive)
    require(_percentage <= MAX_PPM, ">percentage");
    curationPercentage = _percentage;
    emit ParameterUpdated("curationPercentage");
  }

  /**
   * @dev Set a protocol percentage to burn when collecting query fees.
   * @param _percentage Percentage of query fees to burn as protocol fee
   */
  function setProtocolPercentage(uint32 _percentage)
    external
    override
    onlyOwner
  {
    _setProtocolPercentage(_percentage);
  }

  /**
   * @dev Internal: Set a protocol percentage to burn when collecting query fees.
   * @param _percentage Percentage of query fees to burn as protocol fee
   */
  function _setProtocolPercentage(uint32 _percentage) private {
    // Must be within 0% to 100% (inclusive)
    require(_percentage <= MAX_PPM, ">percentage");
    protocolPercentage = _percentage;
    emit ParameterUpdated("protocolPercentage");
  }

  /**
   * @dev Set the period in epochs that need to pass before fees in rebate pool can be claimed.
   * @param _channelDisputeEpochs Period in epochs
   */
  function setChannelDisputeEpochs(uint32 _channelDisputeEpochs)
    external
    override
    onlyOwner
  {
    _setChannelDisputeEpochs(_channelDisputeEpochs);
  }

  /**
   * @dev Internal: Set the period in epochs that need to pass before fees in rebate pool can be claimed.
   * @param _channelDisputeEpochs Period in epochs
   */
  function _setChannelDisputeEpochs(uint32 _channelDisputeEpochs) private {
    require(_channelDisputeEpochs > 0, "!channelDisputeEpochs");
    channelDisputeEpochs = _channelDisputeEpochs;
    emit ParameterUpdated("channelDisputeEpochs");
  }

  /**
   * @dev Set the max time allowed for indexers stake on allocations.
   * @param _maxAllocationEpochs Allocation duration limit in epochs
   */
  function setMaxAllocationEpochs(uint32 _maxAllocationEpochs)
    external
    override
    onlyOwner
  {
    _setMaxAllocationEpochs(_maxAllocationEpochs);
  }

  /**
   * @dev Internal: Set the max time allowed for indexers stake on allocations.
   * @param _maxAllocationEpochs Allocation duration limit in epochs
   */
  function _setMaxAllocationEpochs(uint32 _maxAllocationEpochs) private {
    maxAllocationEpochs = _maxAllocationEpochs;
    emit ParameterUpdated("maxAllocationEpochs");
  }

  /**
   * @dev Set the rebate ratio (fees to allocated stake).
   * @param _alphaNumerator Numerator of `alpha` in the cobb-douglas function
   * @param _alphaDenominator Denominator of `alpha` in the cobb-douglas function
   */
  function setRebateRatio(uint32 _alphaNumerator, uint32 _alphaDenominator)
    external
    override
    onlyOwner
  {
    _setRebateRatio(_alphaNumerator, _alphaDenominator);
  }

  /**
   * @dev Set the rebate ratio (fees to allocated stake).
   * @param _alphaNumerator Numerator of `alpha` in the cobb-douglas function
   * @param _alphaDenominator Denominator of `alpha` in the cobb-douglas function
   */
  function _setRebateRatio(uint32 _alphaNumerator, uint32 _alphaDenominator)
    private
  {
    require(_alphaNumerator > 0 && _alphaDenominator > 0, "!alpha");
    alphaNumerator = _alphaNumerator;
    alphaDenominator = _alphaDenominator;
    emit ParameterUpdated("rebateRatio");
  }

  /**
   * @dev Set the delegation ratio.
   * If set to 10 it means the indexer can use up to 10x the indexer staked amount
   * from their delegated tokens
   * @param _delegationRatio Delegation capacity multiplier
   */
  function setDelegationRatio(uint32 _delegationRatio)
    external
    override
    onlyOwner
  {
    _setDelegationRatio(_delegationRatio);
  }

  /**
   * @dev Internal: Set the delegation ratio.
   * If set to 10 it means the indexer can use up to 10x the indexer staked amount
   * from their delegated tokens
   * @param _delegationRatio Delegation capacity multiplier
   */
  function _setDelegationRatio(uint32 _delegationRatio) private {
    delegationRatio = _delegationRatio;
    emit ParameterUpdated("delegationRatio");
  }

  /**
   * @dev Set the delegation parameters for the caller.
   * @param _indexingRewardCut Percentage of indexing rewards left for delegators
   * @param _queryFeeCut Percentage of query fees left for delegators
   * @param _cooldownBlocks Period that need to pass to update delegation parameters
   */
  function setDelegationParameters(
    uint32 _indexingRewardCut,
    uint32 _queryFeeCut,
    uint32 _cooldownBlocks
  ) public override {
    _setDelegationParameters(
      msg.sender,
      _indexingRewardCut,
      _queryFeeCut,
      _cooldownBlocks
    );
  }

  /**
   * @dev Set the delegation parameters for a particular indexer.
   * @param _indexer Indexer to set delegation parameters
   * @param _indexingRewardCut Percentage of indexing rewards left for delegators
   * @param _queryFeeCut Percentage of query fees left for delegators
   * @param _cooldownBlocks Period that need to pass to update delegation parameters
   */
  function _setDelegationParameters(
    address _indexer,
    uint32 _indexingRewardCut,
    uint32 _queryFeeCut,
    uint32 _cooldownBlocks
  ) private {
    // Incentives must be within bounds
    require(_queryFeeCut <= MAX_PPM, ">queryFeeCut");
    require(_indexingRewardCut <= MAX_PPM, ">indexingRewardCut");

    // Cooldown period set by indexer cannot be below protocol global setting
    require(_cooldownBlocks >= delegationParametersCooldown, "<cooldown");

    // Verify the cooldown period passed
    DelegationPool storage pool = delegationPools[_indexer];
    require(
      pool.updatedAtBlock == 0 ||
        pool.updatedAtBlock.add(uint256(pool.cooldownBlocks)) <= block.number,
      "!cooldown"
    );

    // Update delegation params
    pool.indexingRewardCut = _indexingRewardCut;
    pool.queryFeeCut = _queryFeeCut;
    pool.cooldownBlocks = _cooldownBlocks;
    pool.updatedAtBlock = block.number;

    emit DelegationParametersUpdated(
      _indexer,
      _indexingRewardCut,
      _queryFeeCut,
      _cooldownBlocks
    );
  }

  /**
   * @dev Set the time in blocks an indexer needs to wait to change delegation parameters.
   * @param _blocks Number of blocks to set the delegation parameters cooldown period
   */
  function setDelegationParametersCooldown(uint32 _blocks)
    external
    override
    onlyOwner
  {
    _setDelegationParametersCooldown(_blocks);
  }

  /**
   * @dev Internal: Set the time in blocks an indexer needs to wait to change delegation parameters.
   * @param _blocks Number of blocks to set the delegation parameters cooldown period
   */
  function _setDelegationParametersCooldown(uint32 _blocks) private {
    delegationParametersCooldown = _blocks;
    emit ParameterUpdated("delegationParametersCooldown");
  }

  /**
   * @dev Set the period for undelegation of stake from indexer.
   * @param _delegationUnbondingPeriod Period in epochs to wait for token withdrawals after undelegating
   */
  function setDelegationUnbondingPeriod(uint32 _delegationUnbondingPeriod)
    external
    override
    onlyOwner
  {
    _setDelegationUnbondingPeriod(_delegationUnbondingPeriod);
  }

  /**
   * @dev Internal: Set the period for undelegation of stake from indexer.
   * @param _delegationUnbondingPeriod Period in epochs to wait for token withdrawals after undelegating
   */
  function _setDelegationUnbondingPeriod(uint32 _delegationUnbondingPeriod)
    private
  {
    require(_delegationUnbondingPeriod > 0, "!delegationUnbondingPeriod");
    delegationUnbondingPeriod = _delegationUnbondingPeriod;
    emit ParameterUpdated("delegationUnbondingPeriod");
  }

  /**
   * @dev Set a delegation tax percentage to burn when delegated funds are deposited.
   * @param _percentage Percentage of delegated tokens to burn as delegation tax
   */
  function setDelegationTaxPercentage(uint32 _percentage)
    external
    override
    onlyOwner
  {
    _setDelegationTaxPercentage(_percentage);
  }

  /**
   * @dev Internal: Set a delegation tax percentage to burn when delegated funds are deposited.
   * @param _percentage Percentage of delegated tokens to burn as delegation tax
   */
  function _setDelegationTaxPercentage(uint32 _percentage) private {
    // Must be within 0% to 100% (inclusive)
    require(_percentage <= MAX_PPM, ">percentage");
    delegationTaxPercentage = _percentage;
    emit ParameterUpdated("delegationTaxPercentage");
  }

  /**
   * @dev Set or unset an address as allowed slasher.
   * @param _slasher Address of the party allowed to slash indexers
   * @param _allowed True if slasher is allowed
   */
  function setSlasher(address _slasher, bool _allowed)
    external
    override
    onlyOwner
  {
    require(_slasher != address(0), "!slasher");
    slashers[_slasher] = _allowed;
    emit SlasherUpdate(msg.sender, _slasher, _allowed);
  }

  /**
   * @dev Set an address as allowed asset holder.
   * @param _assetHolder Address of allowed source for state channel funds
   * @param _allowed True if asset holder is allowed
   */
  function setAssetHolder(address _assetHolder, bool _allowed)
    external
    override
    onlyOwner
  {
    require(_assetHolder != address(0), "!assetHolder");
    assetHolders[_assetHolder] = _allowed;
    emit AssetHolderUpdate(msg.sender, _assetHolder, _allowed);
  }

  /**
   * @dev Return if allocationID is used.
   * @param _allocationID Address used as signer by the indexer for an allocation
   * @return True if allocationID already used
   */
  function isAllocation(address _allocationID)
    external
    view
    override
    returns (bool)
  {
    return _getAllocationState(_allocationID) != AllocationState.Null;
  }

  /**
   * @dev Getter that returns if an indexer has any stake.
   * @param _indexer Address of the indexer
   * @return True if indexer has staked tokens
   */
  function hasStake(address _indexer) external view override returns (bool) {
    return stakes[_indexer].tokensStaked > 0;
  }

  /**
   * @dev Return the allocation by ID.
   * @param _allocationID Address used as allocation identifier
   * @return Allocation data
   */
  function getAllocation(address _allocationID)
    external
    view
    override
    returns (Allocation memory)
  {
    return allocations[_allocationID];
  }

  /**
   * @dev Return the current state of an allocation.
   * @param _allocationID Address used as the allocation identifier
   * @return AllocationState
   */
  function getAllocationState(address _allocationID)
    external
    view
    override
    returns (AllocationState)
  {
    return _getAllocationState(_allocationID);
  }

  /**
   * @dev Return the total amount of tokens allocated to space.
   * @param _spaceDeploymentID Address used as the allocation identifier
   * @return Total tokens allocated to space
   */
  function getSpaceAllocatedTokens(bytes32 _spaceDeploymentID)
    external
    view
    override
    returns (uint256)
  {
    return spaceAllocations[_spaceDeploymentID];
  }

  /**
   * @dev Return the delegation from a delegator to an indexer.
   * @param _indexer Address of the indexer where funds have been delegated
   * @param _delegator Address of the delegator
   * @return Delegation data
   */
  function getDelegation(address _indexer, address _delegator)
    external
    view
    override
    returns (Delegation memory)
  {
    return delegationPools[_indexer].delegators[_delegator];
  }

  /**
   * @dev Return whether the delegator has delegated to the indexer.
   * @param _indexer Address of the indexer where funds have been delegated
   * @param _delegator Address of the delegator
   * @return True if delegator of indexer
   */
  function isDelegator(address _indexer, address _delegator)
    public
    view
    override
    returns (bool)
  {
    return delegationPools[_indexer].delegators[_delegator].shares > 0;
  }

  /**
   * @dev Get the total amount of tokens staked by the indexer.
   * @param _indexer Address of the indexer
   * @return Amount of tokens staked by the indexer
   */
  function getIndexerStakedTokens(address _indexer)
    external
    view
    override
    returns (uint256)
  {
    return stakes[_indexer].tokensStaked;
  }

  /**
   * @dev Get the total amount of tokens available to use in allocations.
   * This considers the indexer stake and delegated tokens according to delegation ratio
   * @param _indexer Address of the indexer
   * @return Amount of tokens staked by the indexer
   */
  function getIndexerCapacity(address _indexer)
    public
    view
    override
    returns (uint256)
  {
    Stakes.Indexer memory indexerStake = stakes[_indexer];
    uint256 tokensDelegated = delegationPools[_indexer].tokens;

    uint256 tokensDelegatedCap = indexerStake.tokensSecureStake().mul(
      uint256(delegationRatio)
    );
    uint256 tokensDelegatedCapacity = MathUtils.min(
      tokensDelegated,
      tokensDelegatedCap
    );

    return indexerStake.tokensAvailableWithDelegation(tokensDelegatedCapacity);
  }

  /**
   * @dev Returns amount of delegated tokens ready to be withdrawn after unbonding period.
   * @param _delegation Delegation of tokens from delegator to indexer
   * @return Amount of tokens to withdraw
   */
  function getWithdraweableDelegatedTokens(Delegation memory _delegation)
    public
    view
    returns (uint256)
  {
    // There must be locked tokens and period passed
    uint256 currentEpoch = lightEpochManager().currentEpoch();
    if (
      _delegation.tokensLockedUntil > 0 &&
      currentEpoch >= _delegation.tokensLockedUntil
    ) {
      return _delegation.tokensLocked;
    }
    return 0;
  }

  /**
   * @dev Authorize or unauthorize an address to be an operator.
   * @param _operator Address to authorize
   * @param _allowed Whether authorized or not
   */
  function setOperator(address _operator, bool _allowed) external override {
    require(_operator != msg.sender, "operator == sender");
    operatorAuth[msg.sender][_operator] = _allowed;
    emit SetOperator(msg.sender, _operator, _allowed);
  }

  /**
   * @dev Return true if operator is allowed for indexer.
   * @param _operator Address of the operator
   * @param _indexer Address of the indexer
   */
  function isOperator(address _operator, address _indexer)
    public
    view
    override
    returns (bool)
  {
    return operatorAuth[_indexer][_operator];
  }

  /**
   * @dev Deposit tokens on the indexer stake.
   * @param _tokens Amount of tokens to stake
   */
  function stake(uint256 _tokens) external override {
    stakeTo(msg.sender, _tokens);
  }

  /**
   * @dev Deposit tokens on the indexer stake.
   * @param _indexer Address of the indexer
   * @param _tokens Amount of tokens to stake
   */
  function stakeTo(address _indexer, uint256 _tokens)
    public
    override
    whenNotPaused
  {
    require(_tokens > 0, "!tokens");

    // Ensure minimum stake
    require(
      stakes[_indexer].tokensSecureStake().add(_tokens) >= minimumIndexerStake,
      "!minimumIndexerStake"
    );

    // Transfer tokens to stake from caller to this contract
    TokenUtils.pullTokens(lightToken(), msg.sender, _tokens);

    // Stake the transferred tokens
    _stake(_indexer, _tokens);
  }

  /**
   * @dev Unstake tokens from the indexer stake, lock them until thawing period expires.
   * NOTE: The function accepts an amount greater than the currently staked tokens.
   * If that happens, it will try to unstake the max amount of tokens it can.
   * The reason for this behaviour is to avoid time conditions while the transaction
   * is in flight.
   * @param _tokens Amount of tokens to unstake
   */
  function unstake(uint256 _tokens) external override whenNotPaused {
    address indexer = msg.sender;
    Stakes.Indexer storage indexerStake = stakes[indexer];

    require(indexerStake.tokensStaked > 0, "!stake");

    // Tokens to lock is capped to the available tokens
    uint256 tokensToLock = MathUtils.min(
      indexerStake.tokensAvailable(),
      _tokens
    );
    require(tokensToLock > 0, "!stake-avail");

    // Ensure minimum stake
    uint256 newStake = indexerStake.tokensSecureStake().sub(tokensToLock);
    require(
      newStake == 0 || newStake >= minimumIndexerStake,
      "!minimumIndexerStake"
    );

    // Before locking more tokens, withdraw any unlocked ones if possible
    uint256 tokensToWithdraw = indexerStake.tokensWithdrawable();
    if (tokensToWithdraw > 0) {
      _withdraw(indexer);
    }

    // Update the indexer stake locking tokens
    indexerStake.lockTokens(tokensToLock, thawingPeriod);

    emit StakeLocked(
      indexer,
      indexerStake.tokensLocked,
      indexerStake.tokensLockedUntil
    );
  }

  /**
   * @dev Withdraw indexer tokens once the thawing period has passed.
   */
  function withdraw() external override whenNotPaused {
    _withdraw(msg.sender);
  }

  /**
   * @dev Set the destination where to send rewards.
   * @param _destination Rewards destination address. If set to zero, rewards will be restaked
   */
  function setRewardsDestination(address _destination) external override {
    rewardsDestination[msg.sender] = _destination;
    emit SetRewardsDestination(msg.sender, _destination);
  }

  /**
   * @dev Slash the indexer stake. Delegated tokens are not subject to slashing.
   * Can only be called by the slasher role.
   * @param _indexer Address of indexer to slash
   * @param _tokens Amount of tokens to slash from the indexer stake
   * @param _reward Amount of reward tokens to send to a beneficiary
   * @param _beneficiary Address of a beneficiary to receive a reward for the slashing
   */
  function slash(
    address _indexer,
    uint256 _tokens,
    uint256 _reward,
    address _beneficiary
  ) external override onlySlasher whenNotPaused {
    Stakes.Indexer storage indexerStake = stakes[_indexer];

    // Only able to slash a non-zero number of tokens
    require(_tokens > 0, "!tokens");

    // Rewards comes from tokens slashed balance
    require(_tokens >= _reward, "rewards>slash");

    // Cannot slash stake of an indexer without any or enough stake
    require(indexerStake.tokensStaked > 0, "!stake");
    require(_tokens <= indexerStake.tokensStaked, "slash>stake");

    // Validate beneficiary of slashed tokens
    require(_beneficiary != address(0), "!beneficiary");

    // Slashing more tokens than freely available (over allocation condition)
    // Unlock locked tokens to avoid the indexer to withdraw them
    if (
      _tokens > indexerStake.tokensAvailable() && indexerStake.tokensLocked > 0
    ) {
      uint256 tokensOverAllocated = _tokens.sub(indexerStake.tokensAvailable());
      uint256 tokensToUnlock = MathUtils.min(
        tokensOverAllocated,
        indexerStake.tokensLocked
      );
      indexerStake.unlockTokens(tokensToUnlock);
    }

    // Remove tokens to slash from the stake
    indexerStake.release(_tokens);

    // -- Interactions --

    ILightToken lightToken = lightToken();

    // Set apart the reward for the beneficiary and burn remaining slashed stake
    TokenUtils.burnTokens(lightToken, _tokens.sub(_reward));

    // Give the beneficiary a reward for slashing
    TokenUtils.pushTokens(lightToken, _beneficiary, _reward);

    emit StakeSlashed(_indexer, _tokens, _reward, _beneficiary);
  }

  /**
   * @dev Delegate tokens to an indexer.
   * @param _indexer Address of the indexer to delegate tokens to
   * @param _tokens Amount of tokens to delegate
   * @return Amount of shares issued of the delegation pool
   */
  function delegate(address _indexer, uint256 _tokens)
    external
    override
    whenNotPaused
    returns (uint256)
  {
    address delegator = msg.sender;

    // Transfer tokens to delegate to this contract
    TokenUtils.pullTokens(lightToken(), delegator, _tokens);

    // Update state
    return _delegate(delegator, _indexer, _tokens);
  }

  /**
   * @dev Undelegate tokens from an indexer.
   * @param _indexer Address of the indexer where tokens had been delegated
   * @param _shares Amount of shares to return and undelegate tokens
   * @return Amount of tokens returned for the shares of the delegation pool
   */
  function undelegate(address _indexer, uint256 _shares)
    external
    override
    whenNotPaused
    returns (uint256)
  {
    return _undelegate(msg.sender, _indexer, _shares);
  }

  /**
   * @dev Withdraw delegated tokens once the unbonding period has passed.
   * @param _indexer Withdraw available tokens delegated to indexer
   * @param _delegateToIndexer Re-delegate to indexer address if non-zero, withdraw if zero address
   */
  function withdrawDelegated(address _indexer, address _delegateToIndexer)
    external
    override
    whenNotPaused
    returns (uint256)
  {
    return _withdrawDelegated(msg.sender, _indexer, _delegateToIndexer);
  }

  /**
   * @dev Allocate available tokens to a space deployment.
   * @param _spaceDeploymentID ID of the SpaceDeployment where tokens will be allocated
   * @param _tokens Amount of tokens to allocate
   * @param _allocationID The allocation identifier
   * @param _metadata IPFS hash for additional information about the allocation
   * @param _proof A 65-bytes Ethereum signed message of `keccak256(indexerAddress,allocationID)`
   */
  function allocate(
    bytes32 _spaceDeploymentID,
    uint256 _tokens,
    address _allocationID,
    bytes32 _metadata,
    bytes calldata _proof
  ) external override whenNotPaused {
    _allocate(
      msg.sender,
      _spaceDeploymentID,
      _tokens,
      _allocationID,
      _metadata,
      _proof
    );
  }

  /**
   * @dev Allocate available tokens to a space deployment.
   * @param _indexer Indexer address to allocate funds from.
   * @param _spaceDeploymentID ID of the SpaceDeployment where tokens will be allocated
   * @param _tokens Amount of tokens to allocate
   * @param _allocationID The allocation identifier
   * @param _metadata IPFS hash for additional information about the allocation
   * @param _proof A 65-bytes Ethereum signed message of `keccak256(indexerAddress,allocationID)`
   */
  function allocateFrom(
    address _indexer,
    bytes32 _spaceDeploymentID,
    uint256 _tokens,
    address _allocationID,
    bytes32 _metadata,
    bytes calldata _proof
  ) external override whenNotPaused {
    _allocate(
      _indexer,
      _spaceDeploymentID,
      _tokens,
      _allocationID,
      _metadata,
      _proof
    );
  }

  /**
   * @dev Close an allocation and free the staked tokens.
   * To be eligible for rewards a proof of indexing must be presented.
   * Presenting a bad proof is subject to slashable condition.
   * To opt out for rewards set _poi to 0x0
   * @param _allocationID The allocation identifier
   * @param _poi Proof of indexing submitted for the allocated period
   */
  function closeAllocation(address _allocationID, bytes32 _poi)
    external
    override
    whenNotPaused
  {
    _closeAllocation(_allocationID, _poi);
  }

  /**
   * @dev Close multiple allocations and free the staked tokens.
   * To be eligible for rewards a proof of indexing must be presented.
   * Presenting a bad proof is subject to slashable condition.
   * To opt out for rewards set _poi to 0x0
   * @param _requests An array of CloseAllocationRequest
   */
  function closeAllocationMany(CloseAllocationRequest[] calldata _requests)
    external
    override
    whenNotPaused
  {
    for (uint256 i = 0; i < _requests.length; i++) {
      _closeAllocation(_requests[i].allocationID, _requests[i].poi);
    }
  }

  /**
   * @dev Close and allocate. This will perform a close and then create a new Allocation
   * atomically on the same transaction.
   * @param _closingAllocationID The identifier of the allocation to be closed
   * @param _poi Proof of indexing submitted for the allocated period
   * @param _indexer Indexer address to allocate funds from.
   * @param _spaceDeploymentID ID of the SpaceDeployment where tokens will be allocated
   * @param _tokens Amount of tokens to allocate
   * @param _allocationID The allocation identifier
   * @param _metadata IPFS hash for additional information about the allocation
   * @param _proof A 65-bytes Ethereum signed message of `keccak256(indexerAddress,allocationID)`
   */
  function closeAndAllocate(
    address _closingAllocationID,
    bytes32 _poi,
    address _indexer,
    bytes32 _spaceDeploymentID,
    uint256 _tokens,
    address _allocationID,
    bytes32 _metadata,
    bytes calldata _proof
  ) external override whenNotPaused {
    _closeAllocation(_closingAllocationID, _poi);
    _allocate(
      _indexer,
      _spaceDeploymentID,
      _tokens,
      _allocationID,
      _metadata,
      _proof
    );
  }

  /**
   * @dev Collect query fees from state channels and assign them to an allocation.
   * Funds received are only accepted from a valid sender.
   * To avoid reverting on the withdrawal from channel flow this function will:
   * 1) Accept calls with zero tokens.
   * 2) Accept calls after an allocation passed the dispute period, in that case, all
   *    the received tokens are burned.
   * @param _tokens Amount of tokens to collect
   * @param _allocationID Allocation where the tokens will be assigned
   */
  function collect(uint256 _tokens, address _allocationID) external override {
    // Allocation identifier validation
    require(_allocationID != address(0), "!alloc");

    // The contract caller must be an authorized asset holder
    require(assetHolders[msg.sender] == true, "!assetHolder");

    // Allocation must exist
    AllocationState allocState = _getAllocationState(_allocationID);
    require(allocState != AllocationState.Null, "!collect");

    // Get allocation
    Allocation storage alloc = allocations[_allocationID];
    uint256 queryFees = _tokens;
    uint256 curationFees = 0;
    bytes32 spaceDeploymentID = alloc.spaceDeploymentID;

    // Process query fees only if non-zero amount
    if (queryFees > 0) {
      // Pull tokens to collect from the authorized sender
      ILightToken lightToken = lightToken();
      TokenUtils.pullTokens(lightToken, msg.sender, _tokens);

      // -- Collect protocol tax --
      // If the Allocation is not active or closed we are going to charge a 100% protocol tax
      uint256 usedProtocolPercentage = (allocState == AllocationState.Active ||
        allocState == AllocationState.Closed)
        ? protocolPercentage
        : MAX_PPM;
      uint256 protocolTax = _collectTax(
        lightToken,
        queryFees,
        usedProtocolPercentage
      );
      queryFees = queryFees.sub(protocolTax);

      // -- Collect curation fees --
      // Only if the space deployment is curated
      curationFees = _collectCurationFees(
        lightToken,
        spaceDeploymentID,
        queryFees,
        curationPercentage
      );
      queryFees = queryFees.sub(curationFees);

      // Add funds to the allocation
      alloc.collectedFees = alloc.collectedFees.add(queryFees);

      // When allocation is closed redirect funds to the rebate pool
      // This way we can keep collecting tokens even after the allocation is closed and
      // before it gets to the finalized state.
      if (allocState == AllocationState.Closed) {
        Rebates.Pool storage rebatePool = rebates[alloc.closedAtEpoch];
        rebatePool.fees = rebatePool.fees.add(queryFees);
      }
    }

    emit AllocationCollected(
      alloc.indexer,
      spaceDeploymentID,
      lightEpochManager().currentEpoch(),
      _tokens,
      _allocationID,
      msg.sender,
      curationFees,
      queryFees
    );
  }

  /**
   * @dev Claim tokens from the rebate pool.
   * @param _allocationID Allocation from where we are claiming tokens
   * @param _restake True if restake fees instead of transfer to indexer
   */
  function claim(address _allocationID, bool _restake)
    external
    override
    whenNotPaused
  {
    _claim(_allocationID, _restake);
  }

  /**
   * @dev Claim tokens from the rebate pool for many allocations.
   * @param _allocationID Array of allocations from where we are claiming tokens
   * @param _restake True if restake fees instead of transfer to indexer
   */
  function claimMany(address[] calldata _allocationID, bool _restake)
    external
    override
    whenNotPaused
  {
    for (uint256 i = 0; i < _allocationID.length; i++) {
      _claim(_allocationID[i], _restake);
    }
  }

  /**
   * @dev Stake tokens on the indexer.
   * This function does not check minimum indexer stake requirement to allow
   * to be called by functions that increase the stake when collecting rewards
   * without reverting
   * @param _indexer Address of staking party
   * @param _tokens Amount of tokens to stake
   */
  function _stake(address _indexer, uint256 _tokens) private {
    // Deposit tokens into the indexer stake
    stakes[_indexer].deposit(_tokens);

    // Initialize the delegation pool the first time
    if (delegationPools[_indexer].updatedAtBlock == 0) {
      _setDelegationParameters(
        _indexer,
        MAX_PPM,
        MAX_PPM,
        delegationParametersCooldown
      );
    }

    emit StakeDeposited(_indexer, _tokens);
  }

  /**
   * @dev Withdraw indexer tokens once the thawing period has passed.
   * @param _indexer Address of indexer to withdraw funds from
   */
  function _withdraw(address _indexer) private {
    // Get tokens available for withdraw and update balance
    uint256 tokensToWithdraw = stakes[_indexer].withdrawTokens();
    require(tokensToWithdraw > 0, "!tokens");

    // Return tokens to the indexer
    TokenUtils.pushTokens(lightToken(), _indexer, tokensToWithdraw);

    emit StakeWithdrawn(_indexer, tokensToWithdraw);
  }

  /**
   * @dev Allocate available tokens to a space deployment.
   * @param _indexer Indexer address to allocate funds from.
   * @param _spaceDeploymentID ID of the SpaceDeployment where tokens will be allocated
   * @param _tokens Amount of tokens to allocate
   * @param _allocationID The allocationID will work to identify collected funds related to this allocation
   * @param _metadata Metadata related to the allocation
   * @param _proof A 65-bytes Ethereum signed message of `keccak256(indexerAddress,allocationID)`
   */
  function _allocate(
    address _indexer,
    bytes32 _spaceDeploymentID,
    uint256 _tokens,
    address _allocationID,
    bytes32 _metadata,
    bytes calldata _proof
  ) private {
    require(_isAuth(_indexer), "!auth");

    // Check allocation
    require(_allocationID != address(0), "!alloc");
    require(
      _getAllocationState(_allocationID) == AllocationState.Null,
      "!null"
    );

    // Caller must prove that they own the private key for the allocationID adddress
    // The proof is an Ethereum signed message of KECCAK256(indexerAddress,allocationID)
    bytes32 messageHash = keccak256(abi.encodePacked(_indexer, _allocationID));
    bytes32 digest = ECDSA.toEthSignedMessageHash(messageHash);
    require(ECDSA.recover(digest, _proof) == _allocationID, "!proof");

    if (_tokens > 0) {
      // Needs to have free capacity not used for other purposes to allocate
      require(getIndexerCapacity(_indexer) >= _tokens, "!capacity");
    } else {
      // Allocating zero-tokens still needs to comply with stake requirements
      require(
        stakes[_indexer].tokensSecureStake() >= minimumIndexerStake,
        "!minimumIndexerStake"
      );
    }

    // Creates an allocation
    // Allocation identifiers are not reused
    // The assetHolder address can send collected funds to the allocation
    Allocation memory alloc = Allocation(
      _indexer,
      _spaceDeploymentID,
      _tokens, // Tokens allocated
      lightEpochManager().currentEpoch(), // createdAtEpoch
      0, // closedAtEpoch
      0, // Initialize collected fees
      0, // Initialize effective allocation
      (_tokens > 0) ? _updateRewards(_spaceDeploymentID) : 0 // Initialize accumulated rewards per stake allocated
    );
    allocations[_allocationID] = alloc;

    // -- Rewards Distribution --

    // Process non-zero-allocation rewards tracking
    if (_tokens > 0) {
      // Mark allocated tokens as used
      stakes[_indexer].allocate(alloc.tokens);

      // Track total allocations per space
      // Used for rewards calculations
      spaceAllocations[alloc.spaceDeploymentID] = spaceAllocations[
        alloc.spaceDeploymentID
      ].add(alloc.tokens);
    }

    emit AllocationCreated(
      _indexer,
      _spaceDeploymentID,
      alloc.createdAtEpoch,
      alloc.tokens,
      _allocationID,
      _metadata
    );
  }

  /**
   * @dev Close an allocation and free the staked tokens.
   * @param _allocationID The allocation identifier
   * @param _poi Proof of indexing submitted for the allocated period
   */
  function _closeAllocation(address _allocationID, bytes32 _poi) private {
    // Allocation must exist and be active
    AllocationState allocState = _getAllocationState(_allocationID);
    require(allocState == AllocationState.Active, "!active");

    // Get allocation
    Allocation memory alloc = allocations[_allocationID];

    // Validate that an allocation cannot be closed before one epoch
    alloc.closedAtEpoch = lightEpochManager().currentEpoch();
    uint256 epochs = MathUtils.diffOrZero(
      alloc.closedAtEpoch,
      alloc.createdAtEpoch
    );
    require(epochs > 0, "<epochs");

    // Indexer or operator can close an allocation
    // Anyone is allowed to close ONLY under two concurrent conditions
    // - After maxAllocationEpochs passed
    // - When the allocation is for non-zero amount of tokens
    bool isIndexer = _isAuth(alloc.indexer);
    if (epochs <= maxAllocationEpochs || alloc.tokens == 0) {
      require(isIndexer, "!auth");
    }

    // Close the allocation and start counting a period to settle remaining payments from
    // state channels.
    allocations[_allocationID].closedAtEpoch = alloc.closedAtEpoch;

    // -- Rebate Pool --

    // Calculate effective allocation for the amount of epochs it remained allocated
    alloc.effectiveAllocation = _getEffectiveAllocation(
      maxAllocationEpochs,
      alloc.tokens,
      epochs
    );
    allocations[_allocationID].effectiveAllocation = alloc.effectiveAllocation;

    // Account collected fees and effective allocation in rebate pool for the epoch
    Rebates.Pool storage rebatePool = rebates[alloc.closedAtEpoch];
    if (!rebatePool.exists()) {
      rebatePool.init(alphaNumerator, alphaDenominator);
    }
    rebatePool.addToPool(alloc.collectedFees, alloc.effectiveAllocation);

    // -- Rewards Distribution --

    // Process non-zero-allocation rewards tracking
    if (alloc.tokens > 0) {
      // Distribute rewards if proof of indexing was presented by the indexer or operator
      if (isIndexer && _poi != 0) {
        _distributeRewards(_allocationID, alloc.indexer);
      } else {
        _updateRewards(alloc.spaceDeploymentID);
      }

      // Free allocated tokens from use
      stakes[alloc.indexer].unallocate(alloc.tokens);

      // Track total allocations per space
      // Used for rewards calculations
      spaceAllocations[alloc.spaceDeploymentID] = spaceAllocations[
        alloc.spaceDeploymentID
      ].sub(alloc.tokens);
    }

    emit AllocationClosed(
      alloc.indexer,
      alloc.spaceDeploymentID,
      alloc.closedAtEpoch,
      alloc.tokens,
      _allocationID,
      alloc.effectiveAllocation,
      msg.sender,
      _poi,
      !isIndexer
    );
  }

  /**
   * @dev Claim tokens from the rebate pool.
   * @param _allocationID Allocation from where we are claiming tokens
   * @param _restake True if restake fees instead of transfer to indexer
   */
  function _claim(address _allocationID, bool _restake) private {
    // Funds can only be claimed after a period of time passed since allocation was closed
    AllocationState allocState = _getAllocationState(_allocationID);
    require(allocState == AllocationState.Finalized, "!finalized");

    // Get allocation
    Allocation memory alloc = allocations[_allocationID];

    // Only the indexer or operator can decide if to restake
    bool restake = _isAuth(alloc.indexer) ? _restake : false;

    // Process rebate reward
    Rebates.Pool storage rebatePool = rebates[alloc.closedAtEpoch];
    uint256 tokensToClaim = rebatePool.redeem(
      alloc.collectedFees,
      alloc.effectiveAllocation
    );

    // Add delegation rewards to the delegation pool
    uint256 delegationRewards = _collectDelegationQueryRewards(
      alloc.indexer,
      tokensToClaim
    );
    tokensToClaim = tokensToClaim.sub(delegationRewards);

    // Purge allocation data except for:
    // - indexer: used in disputes and to avoid reusing an allocationID
    // - spaceDeploymentID: used in disputes
    allocations[_allocationID].tokens = 0;
    allocations[_allocationID].createdAtEpoch = 0; // This avoid collect(), close() and claim() to be called
    allocations[_allocationID].closedAtEpoch = 0;
    allocations[_allocationID].collectedFees = 0;
    allocations[_allocationID].effectiveAllocation = 0;
    allocations[_allocationID].accRewardsPerAllocatedToken = 0;

    // -- Interactions --

    ILightToken lightToken = lightToken();

    // When all allocations processed then burn unclaimed fees and prune rebate pool
    if (rebatePool.unclaimedAllocationsCount == 0) {
      TokenUtils.burnTokens(lightToken, rebatePool.unclaimedFees());
      delete rebates[alloc.closedAtEpoch];
    }

    // When there are tokens to claim from the rebate pool, transfer or restake
    _sendRewards(lightToken, tokensToClaim, alloc.indexer, restake);

    emit RebateClaimed(
      alloc.indexer,
      alloc.spaceDeploymentID,
      _allocationID,
      lightEpochManager().currentEpoch(),
      alloc.closedAtEpoch,
      tokensToClaim,
      rebatePool.unclaimedAllocationsCount,
      delegationRewards
    );
  }

  /**
   * @dev Delegate tokens to an indexer.
   * @param _delegator Address of the delegator
   * @param _indexer Address of the indexer to delegate tokens to
   * @param _tokens Amount of tokens to delegate
   * @return Amount of shares issued of the delegation pool
   */
  function _delegate(
    address _delegator,
    address _indexer,
    uint256 _tokens
  ) private returns (uint256) {
    // Only delegate a non-zero amount of tokens
    require(_tokens > 0, "!tokens");
    // Only delegate to non-empty address
    require(_indexer != address(0), "!indexer");
    // Only delegate to staked indexer
    require(stakes[_indexer].tokensStaked > 0, "!stake");

    // Get the delegation pool of the indexer
    DelegationPool storage pool = delegationPools[_indexer];
    Delegation storage delegation = pool.delegators[_delegator];

    // Collect delegation tax
    uint256 delegationTax = _collectTax(
      lightToken(),
      _tokens,
      delegationTaxPercentage
    );
    uint256 delegatedTokens = _tokens.sub(delegationTax);

    // Calculate shares to issue
    uint256 shares = (pool.tokens == 0)
      ? delegatedTokens
      : delegatedTokens.mul(pool.shares).div(pool.tokens);
    require(shares > 0, "!shares");

    // Update the delegation pool
    pool.tokens = pool.tokens.add(delegatedTokens);
    pool.shares = pool.shares.add(shares);

    // Update the individual delegation
    delegation.shares = delegation.shares.add(shares);

    emit StakeDelegated(_indexer, _delegator, delegatedTokens, shares);

    return shares;
  }

  /**
   * @dev Undelegate tokens from an indexer.
   * @param _delegator Address of the delegator
   * @param _indexer Address of the indexer where tokens had been delegated
   * @param _shares Amount of shares to return and undelegate tokens
   * @return Amount of tokens returned for the shares of the delegation pool
   */
  function _undelegate(
    address _delegator,
    address _indexer,
    uint256 _shares
  ) private returns (uint256) {
    // Can only undelegate a non-zero amount of shares
    require(_shares > 0, "!shares");

    // Get the delegation pool of the indexer
    DelegationPool storage pool = delegationPools[_indexer];
    Delegation storage delegation = pool.delegators[_delegator];

    // Delegator need to have enough shares in the pool to undelegate
    require(delegation.shares >= _shares, "!shares-avail");

    // Withdraw tokens if available
    if (getWithdraweableDelegatedTokens(delegation) > 0) {
      _withdrawDelegated(_delegator, _indexer, address(0));
    }

    // Calculate tokens to get in exchange for the shares
    uint256 tokens = _shares.mul(pool.tokens).div(pool.shares);

    // Update the delegation pool
    pool.tokens = pool.tokens.sub(tokens);
    pool.shares = pool.shares.sub(_shares);

    // Update the delegation
    delegation.shares = delegation.shares.sub(_shares);
    delegation.tokensLocked = delegation.tokensLocked.add(tokens);
    delegation.tokensLockedUntil = lightEpochManager().currentEpoch().add(
      delegationUnbondingPeriod
    );

    emit StakeDelegatedLocked(
      _indexer,
      _delegator,
      tokens,
      _shares,
      delegation.tokensLockedUntil
    );

    return tokens;
  }

  /**
   * @dev Withdraw delegated tokens once the unbonding period has passed.
   * @param _delegator Delegator that is withdrawing tokens
   * @param _indexer Withdraw available tokens delegated to indexer
   * @param _delegateToIndexer Re-delegate to indexer address if non-zero, withdraw if zero address
   */
  function _withdrawDelegated(
    address _delegator,
    address _indexer,
    address _delegateToIndexer
  ) private returns (uint256) {
    // Get the delegation pool of the indexer
    DelegationPool storage pool = delegationPools[_indexer];
    Delegation storage delegation = pool.delegators[_delegator];

    // Validation
    uint256 tokensToWithdraw = getWithdraweableDelegatedTokens(delegation);
    require(tokensToWithdraw > 0, "!tokens");

    // Reset lock
    delegation.tokensLocked = 0;
    delegation.tokensLockedUntil = 0;

    emit StakeDelegatedWithdrawn(_indexer, _delegator, tokensToWithdraw);

    // -- Interactions --

    if (_delegateToIndexer != address(0)) {
      // Re-delegate tokens to a new indexer
      _delegate(_delegator, _delegateToIndexer, tokensToWithdraw);
    } else {
      // Return tokens to the delegator
      TokenUtils.pushTokens(lightToken(), _delegator, tokensToWithdraw);
    }

    return tokensToWithdraw;
  }

  /**
   * @dev Collect the delegation rewards for query fees.
   * This function will assign the collected fees to the delegation pool.
   * @param _indexer Indexer to which the tokens to distribute are related
   * @param _tokens Total tokens received used to calculate the amount of fees to collect
   * @return Amount of delegation rewards
   */
  function _collectDelegationQueryRewards(address _indexer, uint256 _tokens)
    private
    returns (uint256)
  {
    uint256 delegationRewards = 0;
    DelegationPool storage pool = delegationPools[_indexer];
    if (pool.tokens > 0 && pool.queryFeeCut < MAX_PPM) {
      uint256 indexerCut = uint256(pool.queryFeeCut).mul(_tokens).div(MAX_PPM);
      delegationRewards = _tokens.sub(indexerCut);
      pool.tokens = pool.tokens.add(delegationRewards);
    }
    return delegationRewards;
  }

  /**
   * @dev Collect the delegation rewards for indexing.
   * This function will assign the collected fees to the delegation pool.
   * @param _indexer Indexer to which the tokens to distribute are related
   * @param _tokens Total tokens received used to calculate the amount of fees to collect
   * @return Amount of delegation rewards
   */
  function _collectDelegationIndexingRewards(address _indexer, uint256 _tokens)
    private
    returns (uint256)
  {
    uint256 delegationRewards = 0;
    DelegationPool storage pool = delegationPools[_indexer];
    if (pool.tokens > 0 && pool.indexingRewardCut < MAX_PPM) {
      uint256 indexerCut = uint256(pool.indexingRewardCut).mul(_tokens).div(
        MAX_PPM
      );
      delegationRewards = _tokens.sub(indexerCut);
      pool.tokens = pool.tokens.add(delegationRewards);
    }
    return delegationRewards;
  }

  /**
   * @dev Collect the curation fees for a space deployment from an amount of tokens.
   * This function transfer curation fees to the Curation contract by calling Curation.collect
   * @param _lightToken Token to collect
   * @param _spaceDeploymentID Space deployment to which the curation fees are related
   * @param _tokens Total tokens received used to calculate the amount of fees to collect
   * @param _curationPercentage Percentage of tokens to collect as fees
   * @return Amount of curation fees
   */
  function _collectCurationFees(
    ILightToken _lightToken,
    bytes32 _spaceDeploymentID,
    uint256 _tokens,
    uint256 _curationPercentage
  ) private returns (uint256) {
    if (_tokens == 0) {
      return 0;
    }

    ILightCuration curation = lightCuration();
    bool isCurationEnabled = _curationPercentage > 0 &&
      address(curation) != address(0);

    if (isCurationEnabled && curation.isCurated(_spaceDeploymentID)) {
      uint256 curationFees = uint256(_curationPercentage).mul(_tokens).div(
        MAX_PPM
      );
      if (curationFees > 0) {
        // Transfer and call collect()
        // This function transfer tokens to a trusted protocol contracts
        // Then we call collect() to do the transfer bookeeping
        TokenUtils.pushTokens(_lightToken, address(curation), curationFees);
        curation.collect(_spaceDeploymentID, curationFees);
      }
      return curationFees;
    }
    return 0;
  }

  /**
   * @dev Collect tax to burn for an amount of tokens.
   * @param _lightToken Token to burn
   * @param _tokens Total tokens received used to calculate the amount of tax to collect
   * @param _percentage Percentage of tokens to burn as tax
   * @return Amount of tax charged
   */
  function _collectTax(
    ILightToken _lightToken,
    uint256 _tokens,
    uint256 _percentage
  ) private returns (uint256) {
    uint256 tax = uint256(_percentage).mul(_tokens).div(MAX_PPM);
    TokenUtils.burnTokens(_lightToken, tax); // Burn tax if any
    return tax;
  }

  /**
   * @dev Return the current state of an allocation
   * @param _allocationID Allocation identifier
   * @return AllocationState
   */
  function _getAllocationState(address _allocationID)
    private
    view
    returns (AllocationState)
  {
    Allocation storage alloc = allocations[_allocationID];

    if (alloc.indexer == address(0)) {
      return AllocationState.Null;
    }
    if (alloc.createdAtEpoch == 0) {
      return AllocationState.Claimed;
    }

    uint256 closedAtEpoch = alloc.closedAtEpoch;
    if (closedAtEpoch == 0) {
      return AllocationState.Active;
    }

    uint256 epochs = lightEpochManager().epochsSince(closedAtEpoch);
    if (epochs >= channelDisputeEpochs) {
      return AllocationState.Finalized;
    }
    return AllocationState.Closed;
  }

  /**
   * @dev Get the effective stake allocation considering epochs from allocation to closing.
   * @param _maxAllocationEpochs Max amount of epochs to cap the allocated stake
   * @param _tokens Amount of tokens allocated
   * @param _numEpochs Number of epochs that passed from allocation to closing
   * @return Effective allocated tokens across epochs
   */
  function _getEffectiveAllocation(
    uint256 _maxAllocationEpochs,
    uint256 _tokens,
    uint256 _numEpochs
  ) private pure returns (uint256) {
    bool shouldCap = _maxAllocationEpochs > 0 &&
      _numEpochs > _maxAllocationEpochs;
    return _tokens.mul((shouldCap) ? _maxAllocationEpochs : _numEpochs);
  }

  /**
   * @dev Triggers an update of rewards due to a change in allocations.
   * @param _spaceDeploymentID Space deployment updated
   */
  function _updateRewards(bytes32 _spaceDeploymentID)
    private
    returns (uint256)
  {
    ILightRewardsManager rewardsManager = lightRewardsManager();
    if (address(rewardsManager) == address(0)) {
      return 0;
    }
    return rewardsManager.onSpaceAllocationUpdate(_spaceDeploymentID);
  }

  /**
   * @dev Assign rewards for the closed allocation to indexer and delegators.
   * @param _allocationID Allocation
   */
  function _distributeRewards(address _allocationID, address _indexer) private {
    ILightRewardsManager rewardsManager = lightRewardsManager();
    if (address(rewardsManager) == address(0)) {
      return;
    }

    // Automatically triggers update of rewards snapshot as allocation will change
    // after this call. Take rewards mint tokens for the Staking contract to distribute
    // between indexer and delegators
    uint256 totalRewards = rewardsManager.takeRewards(_allocationID);
    if (totalRewards == 0) {
      return;
    }

    // Calculate delegation rewards and add them to the delegation pool
    uint256 delegationRewards = _collectDelegationIndexingRewards(
      _indexer,
      totalRewards
    );
    uint256 indexerRewards = totalRewards.sub(delegationRewards);

    // Send the indexer rewards
    _sendRewards(
      lightToken(),
      indexerRewards,
      _indexer,
      rewardsDestination[_indexer] == address(0)
    );
  }

  /**
   * @dev Send rewards to the appropiate destination.
   * @param _lightToken Graph token
   * @param _amount Number of rewards tokens
   * @param _beneficiary Address of the beneficiary of rewards
   * @param _restake Whether to restake or not
   */
  function _sendRewards(
    ILightToken _lightToken,
    uint256 _amount,
    address _beneficiary,
    bool _restake
  ) private {
    if (_amount == 0) return;

    if (_restake) {
      // Restake to place fees into the indexer stake
      _stake(_beneficiary, _amount);
    } else {
      // Transfer funds to the beneficiary's designated rewards destination if set
      address destination = rewardsDestination[_beneficiary];
      TokenUtils.pushTokens(
        _lightToken,
        destination == address(0) ? _beneficiary : destination,
        _amount
      );
    }
  }
}
