// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

interface ILightOrbFactory {
  function initialize(address _implementationAddress) external;

  function implementation() external view returns (address);
}
