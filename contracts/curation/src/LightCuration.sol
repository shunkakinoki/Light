// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import { ILightCurationToken } from "@lightdotso/curation/ILightCurationToken.sol";
import { ILightRewardsManager } from "@lightdotso/rewards/ILightRewardsManager.sol";
import { ILightToken } from "@lightdotso/token/ILightToken.sol";
import { LightCurationStorageV1 } from "@lightdotso/curation/LightCurationStorage.sol";
import { LightUpgradeable } from "@lightdotso/upgradeable/LightUpgradeable.sol";
import { PausableUpgradeable } from "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "@lightdotso/utils/TokenUtils.sol";
import "@lightdotso/math/BancorFormula.sol";

/// @title Curation contract for the Light protocol.
/// @title Keeps track of the contract references of the protocol.
/// @title Inherits the `LightCurationStorage` storage contract to store the state variables in respected slots.
/// @author Shun Kakinoki
/// @notice This contract is a fork from Light Protocol's Curation (GPL-2.0-or-later)
/// @notice Ref: https://github.com/lightprotocol/contracts/blob/dev/contracts/curation/Curation.sol
contract LightCuration is
  LightUpgradeable,
  PausableUpgradeable,
  LightCurationStorageV1
{
  /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
  /*                       UPGRADEABLE                          */
  /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize(
    address _controller,
    address _bondingCurve,
    address _curationTokenMaster,
    uint32 _defaultReserveRatio,
    uint32 _curationTaxPercentage,
    uint256 _minimumCurationDeposit
  ) external override reinitializer(2) {
    __Ownable_init();
    __Pausable_init();
    __UUPSUpgradeable_init();

    _setController(_controller);

    require(_bondingCurve != address(0), "Bonding curve must be set");
    bondingCurve = _bondingCurve;

    _setDefaultReserveRatio(_defaultReserveRatio);
    _setCurationTaxPercentage(_curationTaxPercentage);
    _setMinimumCurationDeposit(_minimumCurationDeposit);
    _setCurationTokenMaster(_curationTokenMaster);
  }

  function _authorizeUpgrade(address) internal override onlyOwner {}

  /*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
  /*                   EXTERNAL TRANSACTIONS                    */
  /*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
  using SafeMath for uint256;

  // 100% in parts per million
  uint32 private constant MAX_PPM = 1000000;

  // Amount of signal you get with your minimum token deposit
  uint256 private constant SIGNAL_PER_MINIMUM_DEPOSIT = 1e18; // 1 signal as 18 decimal number

  // -- Events --

  /**
   * @dev Emitted when `curator` deposited `tokens` on `spaceDeploymentID` as curation signal.
   * The `curator` receives `signal` amount according to the curation pool bonding curve.
   * An amount of `curationTax` will be collected and burned.
   */
  event Signalled(
    address indexed curator,
    bytes32 indexed spaceDeploymentID,
    uint256 tokens,
    uint256 signal,
    uint256 curationTax
  );

  /**
   * @dev Emitted when `curator` burned `signal` for a `spaceDeploymentID`.
   * The curator will receive `tokens` according to the value of the bonding curve.
   */
  event Burned(
    address indexed curator,
    bytes32 indexed spaceDeploymentID,
    uint256 tokens,
    uint256 signal
  );

  event ParameterUpdated(string param);

  /**
   * @dev Emitted when `tokens` amount were collected for `spaceDeploymentID` as part of fees
   * distributed by an indexer from query fees received from state channels.
   */
  event Collected(bytes32 indexed spaceDeploymentID, uint256 tokens);

  /**
   * @dev Set the default reserve ratio percentage for a curation pool.
   * @notice Update the default reserver ratio to `_defaultReserveRatio`
   * @param _defaultReserveRatio Reserve ratio (in PPM)
   */
  function setDefaultReserveRatio(uint32 _defaultReserveRatio)
    external
    override
    onlyOwner
  {
    _setDefaultReserveRatio(_defaultReserveRatio);
  }

  /**
   * @dev Internal: Set the default reserve ratio percentage for a curation pool.
   * @notice Update the default reserver ratio to `_defaultReserveRatio`
   * @param _defaultReserveRatio Reserve ratio (in PPM)
   */
  function _setDefaultReserveRatio(uint32 _defaultReserveRatio) private {
    // Reserve Ratio must be within 0% to 100% (inclusive, in PPM)
    require(_defaultReserveRatio > 0, "Default reserve ratio must be > 0");
    require(
      _defaultReserveRatio <= MAX_PPM,
      "Default reserve ratio cannot be higher than MAX_PPM"
    );

    defaultReserveRatio = _defaultReserveRatio;
    emit ParameterUpdated("defaultReserveRatio");
  }

  /**
   * @dev Set the minimum deposit amount for curators.
   * @notice Update the minimum deposit amount to `_minimumCurationDeposit`
   * @param _minimumCurationDeposit Minimum amount of tokens required deposit
   */
  function setMinimumCurationDeposit(uint256 _minimumCurationDeposit)
    external
    override
    onlyOwner
  {
    _setMinimumCurationDeposit(_minimumCurationDeposit);
  }

  /**
   * @dev Internal: Set the minimum deposit amount for curators.
   * @notice Update the minimum deposit amount to `_minimumCurationDeposit`
   * @param _minimumCurationDeposit Minimum amount of tokens required deposit
   */
  function _setMinimumCurationDeposit(uint256 _minimumCurationDeposit) private {
    require(
      _minimumCurationDeposit > 0,
      "Minimum curation deposit cannot be 0"
    );

    minimumCurationDeposit = _minimumCurationDeposit;
    emit ParameterUpdated("minimumCurationDeposit");
  }

  /**
   * @dev Set the curation tax percentage to charge when a curator deposits GRT tokens.
   * @param _percentage Curation tax percentage charged when depositing GRT tokens
   */
  function setCurationTaxPercentage(uint32 _percentage)
    external
    override
    onlyOwner
  {
    _setCurationTaxPercentage(_percentage);
  }

  /**
   * @dev Internal: Set the curation tax percentage to charge when a curator deposits GRT tokens.
   * @param _percentage Curation tax percentage charged when depositing GRT tokens
   */
  function _setCurationTaxPercentage(uint32 _percentage) private {
    require(
      _percentage <= MAX_PPM,
      "Curation tax percentage must be below or equal to MAX_PPM"
    );

    curationTaxPercentage = _percentage;
    emit ParameterUpdated("curationTaxPercentage");
  }

  /**
   * @dev Set the master copy to use as clones for the curation token.
   * @param _curationTokenMaster Address of implementation contract to use for curation tokens
   */
  function setCurationTokenMaster(address _curationTokenMaster)
    external
    override
    onlyOwner
  {
    _setCurationTokenMaster(_curationTokenMaster);
  }

  /**
   * @dev Internal: Set the master copy to use as clones for the curation token.
   * @param _curationTokenMaster Address of implementation contract to use for curation tokens
   */
  function _setCurationTokenMaster(address _curationTokenMaster) private {
    require(
      _curationTokenMaster != address(0),
      "Token master must be non-empty"
    );
    require(
      Address.isContract(_curationTokenMaster),
      "Token master must be a contract"
    );

    curationTokenMaster = _curationTokenMaster;
    emit ParameterUpdated("curationTokenMaster");
  }

  /**
   * @dev Assign Light Tokens collected as curation fees to the curation pool reserve.
   * This function can only be called by the Staking contract and will do the bookeeping of
   * transferred tokens into this contract.
   * @param _spaceDeploymentID spaceDeployment where funds should be allocated as reserves
   * @param _tokens Amount of Light Tokens to add to reserves
   */
  function collect(bytes32 _spaceDeploymentID, uint256 _tokens)
    external
    override
  {
    // Only Staking contract is authorized as caller
    require(
      msg.sender == address(lightStaking()),
      "Caller must be the staking contract"
    );

    // Must be curated to accept tokens
    require(
      isCurated(_spaceDeploymentID),
      "Space deployment must be curated to collect fees"
    );

    // Collect new funds into reserve
    CurationPool storage curationPool = pools[_spaceDeploymentID];
    curationPool.tokens = curationPool.tokens.add(_tokens);

    emit Collected(_spaceDeploymentID, _tokens);
  }

  /**
   * @dev Deposit Light Tokens in exchange for signal of a spaceDeployment curation pool.
   * @param _spaceDeploymentID space deployment pool from where to mint signal
   * @param _tokensIn Amount of Light Tokens to deposit
   * @param _signalOutMin Expected minimum amount of signal to receive
   * @return Signal minted and deposit tax
   */
  function mint(
    bytes32 _spaceDeploymentID,
    uint256 _tokensIn,
    uint256 _signalOutMin
  ) external override whenNotPaused returns (uint256, uint256) {
    // Need to deposit some funds
    require(_tokensIn > 0, "Cannot deposit zero tokens");

    // Exchange GRT tokens for LCS of the space pool
    (uint256 signalOut, uint256 curationTax) = tokensToSignal(
      _spaceDeploymentID,
      _tokensIn
    );

    // Slippage protection
    require(signalOut >= _signalOutMin, "Slippage protection");

    address curator = msg.sender;
    CurationPool storage curationPool = pools[_spaceDeploymentID];

    // If it hasn't been curated before then initialize the curve
    if (!isCurated(_spaceDeploymentID)) {
      curationPool.reserveRatio = defaultReserveRatio;

      // If no signal token for the pool - create one
      if (address(curationPool.lcs) == address(0)) {
        // Use a minimal proxy to reduce gas cost
        ILightCurationToken lcs = ILightCurationToken(
          Clones.clone(curationTokenMaster)
        );
        lcs.initialize(address(this));
        curationPool.lcs = lcs;
      }
    }

    // Trigger update rewards calculation snapshot
    _updateRewards(_spaceDeploymentID);

    // Transfer tokens from the curator to this contract
    // Burn the curation tax
    // NOTE: This needs to happen after _updateRewards snapshot as that function
    // is using balanceOf(curation)
    ILightToken _lightToken = lightToken();
    TokenUtils.pullTokens(_lightToken, curator, _tokensIn);
    TokenUtils.burnTokens(_lightToken, curationTax);

    // Update curation pool
    curationPool.tokens = curationPool.tokens.add(_tokensIn.sub(curationTax));
    curationPool.lcs.mint(curator, signalOut);

    emit Signalled(
      curator,
      _spaceDeploymentID,
      _tokensIn,
      signalOut,
      curationTax
    );

    return (signalOut, curationTax);
  }

  /**
   * @dev Return an amount of signal to get tokens back.
   * @notice Burn _signal from the spaceDeployment curation pool
   * @param _spaceDeploymentID spaceDeployment the curator is returning signal
   * @param _signalIn Amount of signal to return
   * @param _tokensOutMin Expected minimum amount of tokens to receive
   * @return Tokens returned
   */
  function burn(
    bytes32 _spaceDeploymentID,
    uint256 _signalIn,
    uint256 _tokensOutMin
  ) external override whenNotPaused returns (uint256) {
    address curator = msg.sender;

    // Validations
    require(_signalIn > 0, "Cannot burn zero signal");
    require(
      getCuratorSignal(curator, _spaceDeploymentID) >= _signalIn,
      "Cannot burn more signal than you own"
    );

    // Get the amount of tokens to refund based on returned signal
    uint256 tokensOut = signalToTokens(_spaceDeploymentID, _signalIn);

    // Slippage protection
    require(tokensOut >= _tokensOutMin, "Slippage protection");

    // Trigger update rewards calculation
    _updateRewards(_spaceDeploymentID);

    // Update curation pool
    CurationPool storage curationPool = pools[_spaceDeploymentID];
    curationPool.tokens = curationPool.tokens.sub(tokensOut);
    curationPool.lcs.burnFrom(curator, _signalIn);

    // If all signal burnt delete the curation pool except for the
    // curation token contract to avoid recreating it on a new mint
    if (getCurationPoolSignal(_spaceDeploymentID) == 0) {
      curationPool.tokens = 0;
      curationPool.reserveRatio = 0;
    }

    // Return the tokens to the curator
    TokenUtils.pushTokens(lightToken(), curator, tokensOut);

    emit Burned(curator, _spaceDeploymentID, tokensOut, _signalIn);

    return tokensOut;
  }

  /**
   * @dev Check if any GRT tokens are deposited for a spaceDeployment.
   * @param _spaceDeploymentID spaceDeployment to check if curated
   * @return True if curated
   */
  function isCurated(bytes32 _spaceDeploymentID)
    public
    view
    override
    returns (bool)
  {
    return pools[_spaceDeploymentID].tokens > 0;
  }

  /**
   * @dev Get the amount of signal a curator has in a curation pool.
   * @param _curator Curator owning the signal tokens
   * @param _spaceDeploymentID space deployment curation pool
   * @return Amount of signal owned by a curator for the space deployment
   */
  function getCuratorSignal(address _curator, bytes32 _spaceDeploymentID)
    public
    view
    override
    returns (uint256)
  {
    ILightCurationToken lcs = pools[_spaceDeploymentID].lcs;
    return (address(lcs) == address(0)) ? 0 : lcs.balanceOf(_curator);
  }

  /**
   * @dev Get the amount of signal in a curation pool.
   * @param _spaceDeploymentID space deployment curation poool
   * @return Amount of signal minted for the space deployment
   */
  function getCurationPoolSignal(bytes32 _spaceDeploymentID)
    public
    view
    override
    returns (uint256)
  {
    ILightCurationToken lcs = pools[_spaceDeploymentID].lcs;
    return (address(lcs) == address(0)) ? 0 : lcs.totalSupply();
  }

  /**
   * @dev Get the amount of token reserves in a curation pool.
   * @param _spaceDeploymentID space deployment curation poool
   * @return Amount of token reserves in the curation pool
   */
  function getCurationPoolTokens(bytes32 _spaceDeploymentID)
    external
    view
    override
    returns (uint256)
  {
    return pools[_spaceDeploymentID].tokens;
  }

  /**
   * @dev Calculate amount of signal that can be bought with tokens in a curation pool.
   * This function considers and excludes the deposit tax.
   * @param _spaceDeploymentID space deployment to mint signal
   * @param _tokensIn Amount of tokens used to mint signal
   * @return Amount of signal that can be bought and tokens subtracted for the tax
   */
  function tokensToSignal(bytes32 _spaceDeploymentID, uint256 _tokensIn)
    public
    view
    override
    returns (uint256, uint256)
  {
    uint256 curationTax = _tokensIn.mul(uint256(curationTaxPercentage)).div(
      MAX_PPM
    );
    uint256 signalOut = _tokensToSignal(
      _spaceDeploymentID,
      _tokensIn.sub(curationTax)
    );
    return (signalOut, curationTax);
  }

  /**
   * @dev Calculate amount of signal that can be bought with tokens in a curation pool.
   * @param _spaceDeploymentID space deployment to mint signal
   * @param _tokensIn Amount of tokens used to mint signal
   * @return Amount of signal that can be bought with tokens
   */
  function _tokensToSignal(bytes32 _spaceDeploymentID, uint256 _tokensIn)
    private
    view
    returns (uint256)
  {
    // Get curation pool tokens and signal
    CurationPool memory curationPool = pools[_spaceDeploymentID];

    // Init curation pool
    if (curationPool.tokens == 0) {
      require(
        _tokensIn >= minimumCurationDeposit,
        "Curation deposit is below minimum required"
      );
      return
        BancorFormula(bondingCurve)
          .calculatePurchaseReturn(
            SIGNAL_PER_MINIMUM_DEPOSIT,
            minimumCurationDeposit,
            defaultReserveRatio,
            _tokensIn.sub(minimumCurationDeposit)
          )
          .add(SIGNAL_PER_MINIMUM_DEPOSIT);
    }

    return
      BancorFormula(bondingCurve).calculatePurchaseReturn(
        getCurationPoolSignal(_spaceDeploymentID),
        curationPool.tokens,
        curationPool.reserveRatio,
        _tokensIn
      );
  }

  /**
   * @dev Calculate number of tokens to get when burning signal from a curation pool.
   * @param _spaceDeploymentID space deployment to burn signal
   * @param _signalIn Amount of signal to burn
   * @return Amount of tokens to get for an amount of signal
   */
  function signalToTokens(bytes32 _spaceDeploymentID, uint256 _signalIn)
    public
    view
    override
    returns (uint256)
  {
    CurationPool memory curationPool = pools[_spaceDeploymentID];
    uint256 curationPoolSignal = getCurationPoolSignal(_spaceDeploymentID);
    require(
      curationPool.tokens > 0,
      "Space deployment must be curated to perform calculations"
    );
    require(
      curationPoolSignal >= _signalIn,
      "Signal must be above or equal to signal issued in the curation pool"
    );

    return
      BancorFormula(bondingCurve).calculateSaleReturn(
        curationPoolSignal,
        curationPool.tokens,
        curationPool.reserveRatio,
        _signalIn
      );
  }

  /**
   * @dev Triggers an update of rewards due to a change in signal.
   * @param _spaceDeploymentID space deployment updated
   */
  function _updateRewards(bytes32 _spaceDeploymentID) private {
    ILightRewardsManager rewardsManager = lightRewardsManager();
    if (address(rewardsManager) != address(0)) {
      rewardsManager.onSpaceSignalUpdate(_spaceDeploymentID);
    }
  }
}
