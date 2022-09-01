// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import { LightSpaceMetadata } from "@lightdotso/protocol/structs/LightSpaceMetadata.sol";

interface ILightSpace {
  event CreateSpace(
    uint256 indexed spaceId,
    address indexed owner,
    LightSpaceMetadata metadata,
    address caller
  );

  event SetCustomMetadata(
    uint256 indexed spaceId,
    uint256 indexed domain,
    string content
  );

  function initialize(address _controller, address _operator) external;

  function getCount() external view returns (uint256);

  function getMetadataContentOf(uint256 _spaceId, uint256 _domain)
    external
    view
    returns (string memory);

  function createFor(address _owner, LightSpaceMetadata calldata _metadata)
    external
    returns (uint256 spaceId);
}
