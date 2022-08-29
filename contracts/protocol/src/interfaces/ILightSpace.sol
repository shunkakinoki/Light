// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

interface ILightSpace {
  function initialize(address _controller) external;

  function getCount() external view returns (uint256);

  function getMetadataContentOf(uint256 _projectId, uint256 _domain)
    external
    view
    returns (string memory);
}
