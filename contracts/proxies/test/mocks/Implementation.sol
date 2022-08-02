// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import { Initializable } from "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract Implementation is Initializable {
  uint256 internal _value;

  function initialize() public initializer {}

  function setValue(uint256 _number) public {
    _value = _number;
  }
}
