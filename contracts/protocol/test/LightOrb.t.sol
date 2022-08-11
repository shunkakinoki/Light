// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "@lightdotso/foundry/BaseTest.sol";
import "@lightdotso/protocol/LightOrb.sol";

contract LightOrbTest is BaseTest {
  LightOrb private lightOrb;

  function setUp() public {
    setUpLightProxies();
  }

  function testLightOrbAssertions() public {
    wrappedLightOrb.initialize("Light Orb", "LORB", address(this));
    assertEq(wrappedLightOrb.name(), "Light Orb");
    assertEq(wrappedLightOrb.symbol(), "LORB");
  }

  function testLightOrbDisableInitializersOnImplementation() public {
    lightOrb = new LightOrb();
    vm.expectRevert(bytes("Initializable: contract is already initialized"));
    lightOrb.initialize("Light Orb", "LORB", address(this));
  }
}
