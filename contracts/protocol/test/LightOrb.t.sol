// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "@lightdotso/protocol/LightOrb.sol";

contract LightOrbTest is Test {
  LightOrb private lightorb;

  function setUp() public {
    lightorb = new LightOrb();
  }
}
