// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

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
