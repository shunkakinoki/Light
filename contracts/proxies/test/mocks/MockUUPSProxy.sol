/// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import { LightUpgradeable } from "@lightdotso/upgradeable/LightUpgradeable.sol";

contract MockUUPSProxyV1 is LightUpgradeable {
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

contract MockUUPSProxyV2 is LightUpgradeable {
  uint256 public x;
  uint256 public y;

  function setY(uint256 _y) public {
    y = _y;
  }

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize() public override initializer {
    __Ownable_init();
    __UUPSUpgradeable_init();
  }

  function _authorizeUpgrade(address newImplementation)
    internal
    override
    onlyOwner
  {}
}
