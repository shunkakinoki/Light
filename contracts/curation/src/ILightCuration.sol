// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import "./ILightCurationToken.sol";

interface ILightCuration {
  function initialize(
    address _controller,
    address _bondingCurve,
    address _curationTokenMaster,
    uint32 _defaultReserveRatio,
    uint32 _curationTaxPercentage,
    uint256 _minimumCurationDeposit
  ) external;

  function setDefaultReserveRatio(uint32 _defaultReserveRatio) external;

  function setMinimumCurationDeposit(uint256 _minimumCurationDeposit) external;

  function setCurationTaxPercentage(uint32 _percentage) external;

  function setCurationTokenMaster(address _curationTokenMaster) external;

  function mint(
    bytes32 _spaceDeploymentID,
    uint256 _tokensIn,
    uint256 _signalOutMin
  ) external returns (uint256, uint256);

  function burn(
    bytes32 _spaceDeploymentID,
    uint256 _signalIn,
    uint256 _tokensOutMin
  ) external returns (uint256);

  function collect(bytes32 _spaceDeploymentID, uint256 _tokens) external;

  function isCurated(bytes32 _spaceDeploymentID) external view returns (bool);

  function getCuratorSignal(address _curator, bytes32 _spaceDeploymentID)
    external
    view
    returns (uint256);

  function getCurationPoolSignal(bytes32 _spaceDeploymentID)
    external
    view
    returns (uint256);

  function getCurationPoolTokens(bytes32 _spaceDeploymentID)
    external
    view
    returns (uint256);

  function tokensToSignal(bytes32 _spaceDeploymentID, uint256 _tokensIn)
    external
    view
    returns (uint256, uint256);

  function signalToTokens(bytes32 _spaceDeploymentID, uint256 _signalIn)
    external
    view
    returns (uint256);

  function curationTaxPercentage() external view returns (uint32);
}
