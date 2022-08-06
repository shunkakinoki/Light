// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract MockUUPSProxyV1 is Initializable, OwnableUpgradeable, UUPSUpgradeable {
  uint256 public x;

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize(uint256 _x) public initializer {
    __Ownable_init();
    __UUPSUpgradeable_init();
    x = _x;
  }

  function _authorizeUpgrade(address newImplementation)
    internal
    override
    onlyOwner
  {}
}

contract MockUUPSProxyV2 is Initializable, OwnableUpgradeable, UUPSUpgradeable {
  uint256 public x;
  uint256 public y;

  function setY(uint256 _y) public {
    y = _y;
  }

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize() public initializer {
    __Ownable_init();
    __UUPSUpgradeable_init();
  }

  function _authorizeUpgrade(address newImplementation)
    internal
    override
    onlyOwner
  {}
}
