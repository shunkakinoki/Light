// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "@lightdotso/foundry/BaseTest.sol";
import "@lightdotso/protocol/LightOrb.sol";

contract LightOrbTest is BaseTest {
  LightOrb private lightOrb;

  function setUp() public {
    lightOrb = new LightOrb();
  }

  function testLightSpaceAssertions() public {
    lightOrb.initialize("Light Orb", "LORB");
    assertEq(lightOrb.name(), "Light Orb");
    assertEq(lightOrb.symbol(), "LORB");
  }
}
