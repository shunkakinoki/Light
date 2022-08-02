// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

/// @title  Light Renderer
/// @author Shun Kakinoki <shunkakinoki@gmail.com>
/// @author Design by Oz Hashimoto <hello@okazu.co>
contract Renderer {
  string private greeting;

  function render(
    uint256,
    address,
    uint256,
    uint256,
    string calldata
  ) public pure returns (string memory) {
    return "Hello from renderer";
  }
}
