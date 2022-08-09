// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "@lightdotso/foundry/BaseTest.sol";
import "@lightdotso/protocol/LightSpace.sol";

contract LightSpaceTest is BaseTest {
  LightSpace private lightSpace;

  function setUp() public {
    lightSpace = new LightSpace();
  }

  function testLightSpaceAssertions() public {
    lightSpace.initializeLightSpace();
    assertEq(lightSpace.name(), "Light Space");
    assertEq(lightSpace.symbol(), "LSPACE");
  }
}
