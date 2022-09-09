/// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";

import { LightUpgradeable } from "@lightdotso/upgradeable/LightUpgradeable.sol";
import { LightEpochManagerStorageV1 } from "./LightEpochManagerStorage.sol";
import { ILightEpochManager } from "./ILightEpochManager.sol";

/// @title EpochManager contract
/// @dev Produce epochs based on a number of blocks to coordinate contracts in the protocol.
/// @author Shun Kakinoki
/// @notice This contract is a fork from Light Protocol's EpochManager (GPL-2.0-or-later)
/// @notice Ref: https://github.com/lightprotocol/contracts/blob/dev/contracts/epochs/EpochManager.sol
contract EpochManager is
  LightUpgradeable,
  LightEpochManagerStorageV1,
  ILightEpochManager
{
  using SafeMathUpgradeable for uint256;

  // -- Events --

  event EpochRun(uint256 indexed epoch, address caller);
  event EpochLengthUpdate(uint256 indexed epoch, uint256 epochLength);

  /**
   * @dev Initialize this contract.
   */
  function initialize(address _controller, uint256 _epochLength)
    external
    override
  {
    __Ownable_init();
    __UUPSUpgradeable_init();

    _setController(_controller);

    require(_epochLength > 0, "Epoch length cannot be 0");

    /// We make the first epoch to be one instead of zero to avoid any issue
    /// with composing contracts that may use zero as an empty value
    lastLengthUpdateEpoch = 1;
    lastLengthUpdateBlock = blockNum();
    epochLength = _epochLength;

    emit EpochLengthUpdate(lastLengthUpdateEpoch, epochLength);
  }

  /**
   * @dev Set the epoch length.
   * @notice Set epoch length to `_epochLength` blocks
   * @param _epochLength Epoch length in blocks
   */
  function setEpochLength(uint256 _epochLength) external override onlyOwner {
    require(_epochLength > 0, "Epoch length cannot be 0");
    require(
      _epochLength != epochLength,
      "Epoch length must be different to current"
    );

    lastLengthUpdateEpoch = currentEpoch();
    lastLengthUpdateBlock = currentEpochBlock();
    epochLength = _epochLength;

    emit EpochLengthUpdate(lastLengthUpdateEpoch, epochLength);
  }

  /**
   * @dev Run a new epoch, should be called once at the start of any epoch.
   * @notice Perform state changes for the current epoch
   */
  function runEpoch() external override {
    /// Check if already called for the current epoch
    require(!isCurrentEpochRun(), "Current epoch already run");

    lastRunEpoch = currentEpoch();

    /// Hook for protocol general state updates
    emit EpochRun(lastRunEpoch, msg.sender);
  }

  /**
   * @dev Return true if the current epoch has already run.
   * @return Return true if current epoch is the last epoch that has run
   */
  function isCurrentEpochRun() public view override returns (bool) {
    return lastRunEpoch == currentEpoch();
  }

  /**
   * @dev Return current block number.
   * @return Block number
   */
  function blockNum() public view override returns (uint256) {
    return block.number;
  }

  /**
   * @dev Return blockhash for a block.
   * @return BlockHash for `_block` number
   */
  function blockHash(uint256 _block) external view override returns (bytes32) {
    uint256 currentBlock = blockNum();

    require(_block < currentBlock, "Can only retrieve past block hashes");
    require(
      currentBlock < 256 || _block >= currentBlock - 256,
      "Can only retrieve hashes for last 256 blocks"
    );

    return blockhash(_block);
  }

  /**
   * @dev Return the current epoch, it may have not been run yet.
   * @return The current epoch based on epoch length
   */
  function currentEpoch() public view override returns (uint256) {
    return lastLengthUpdateEpoch.add(epochsSinceUpdate());
  }

  /**
   * @dev Return block where the current epoch started.
   * @return The block number when the current epoch started
   */
  function currentEpochBlock() public view override returns (uint256) {
    return lastLengthUpdateBlock.add(epochsSinceUpdate().mul(epochLength));
  }

  /**
   * @dev Return the number of blocks that passed since current epoch started.
   * @return Blocks that passed since start of epoch
   */
  function currentEpochBlockSinceStart()
    external
    view
    override
    returns (uint256)
  {
    return blockNum() - currentEpochBlock();
  }

  /**
   * @dev Return the number of epoch that passed since another epoch.
   * @param _epoch Epoch to use as since epoch value
   * @return Number of epochs and current epoch
   */
  function epochsSince(uint256 _epoch)
    external
    view
    override
    returns (uint256)
  {
    uint256 epoch = currentEpoch();
    return _epoch < epoch ? epoch.sub(_epoch) : 0;
  }

  /**
   * @dev Return number of epochs passed since last epoch length update.
   * @return The number of epoch that passed since last epoch length update
   */
  function epochsSinceUpdate() public view override returns (uint256) {
    return blockNum().sub(lastLengthUpdateBlock).div(epochLength);
  }
}
