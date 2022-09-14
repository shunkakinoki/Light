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
}
