/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

/// @title Permanent Storage contract for the LightToken contract.
/// @author Shun Kakinoki
contract LightTokenStorage {
  mapping(address => uint256) public nonces;
  mapping(address => bool) internal _minters;
}
