/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import "@lightdotso/foundry/BaseTest.sol";
import "@lightdotso/deployer/LightControllerDeployerScript.s.sol";

contract LightControllerDeployerScriptTest is BaseTest {
  LightControllerDeployerScript script;

  function setUp() public {
    script = new LightControllerDeployerScript();
    script.run();
  }

  function testImplementationSlot() public {
    _testProxyImplementationSlot(
      address(script.proxyLightController()),
      address(script.implementationLightController())
    );
  }
}
