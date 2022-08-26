// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

interface ILightSpace {
  function initialize(address _controller) external;

  function getCount() external view returns (uint256);
}
