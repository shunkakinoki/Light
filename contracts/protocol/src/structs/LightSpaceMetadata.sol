// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

/**
  @param content The metadata content.
  @param domain The domain within which the metadata applies.
*/
struct LightSpaceMetadata {
  string content;
  uint256 domain;
}
