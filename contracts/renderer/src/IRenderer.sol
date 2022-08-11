// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

interface IRenderer {
  function render(
    uint256,
    address,
    uint256,
    string calldata
  ) external view returns (string memory);
}
