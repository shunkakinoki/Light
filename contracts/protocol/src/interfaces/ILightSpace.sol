// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import { LightSpaceMetadata } from "@lightdotso/protocol/structs/LightSpaceMetadata.sol";

interface ILightSpace {
  event Create(
    uint256 indexed projectId,
    address indexed owner,
    LightSpaceMetadata metadata,
    address caller
  );

  function initialize(address _controller) external;

  function getCount() external view returns (uint256);

  function getMetadataContentOf(uint256 _projectId, uint256 _domain)
    external
    view
    returns (string memory);

  function createFor(address _owner, LightSpaceMetadata calldata _metadata)
    external
    returns (uint256 projectId);
}
