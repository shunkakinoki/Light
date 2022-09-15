/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import "@lightdotso/foundry/BaseTest.sol";
import "@lightdotso/deployer/LightDeployerScript.s.sol";

contract LightDeployerScriptTest is BaseTest {
  LightDeployerScript script;

  function setUp() public {
    script = new LightDeployerScript();
    script.run();
  }

  function testImplementationSlot() public {
    _testProxyImplementationSlot(
      address(script.proxyLightOrb()),
      address(script.implementationLightOrb())
    );
  }

  function testMint() public {
    assertEq(script.wrappedLightOrb().currentTokenId(), 1);

    vm.startPrank(address(3));
    script.wrappedLightOrb().mint();
    assertEq(script.wrappedLightOrb().currentTokenId(), 2);
    vm.stopPrank();
  }
}
