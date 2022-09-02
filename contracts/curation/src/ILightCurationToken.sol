// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

interface ILightCurationToken is IERC20Upgradeable {
  function initialize(address _owner) external;

  function burnFrom(address _account, uint256 _amount) external;

  function mint(address _to, uint256 _amount) external;
}
