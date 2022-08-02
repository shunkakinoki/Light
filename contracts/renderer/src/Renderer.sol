// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.15;

contract Renderer {
  string private greeting;

  function render(
    uint256,
    address,
    uint256,
    uint256,
    string calldata
  ) public pure returns (string memory) {
    return "Hellow from renderer";
  }
}
