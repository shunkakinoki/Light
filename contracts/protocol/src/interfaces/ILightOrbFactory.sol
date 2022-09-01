// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

interface ILightOrbFactory {
  function initialize(
    address _implementationAddress,
    address _controller,
    address _operator
  ) external;

  function implementation() external view returns (address);
}
