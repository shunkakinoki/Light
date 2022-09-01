// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import { LightSpaceMetadata } from "@lightdotso/protocol/structs/LightSpaceMetadata.sol";

interface ILightCore {
  event LaunchSpace(uint256 spaceId, string memo, address caller);

  function initialize(address _controller, address _operator) external;

  function launchSpaceFor(
    address _owner,
    LightSpaceMetadata calldata _spaceMetadata,
    string calldata _memo
  ) external returns (uint256 spaceId);
}
