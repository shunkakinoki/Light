/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import "@lightdotso/foundry/BaseTest.sol";
import "@lightdotso/deployer/LightOrbDeployerScript.s.sol";
import "@lightdotso/deployer/LightControllerDeployerScript.s.sol";

import "./LightOrbDeployerScript.t.sol";

contract LightControllerDeployerScriptTest is BaseTest {
  LightControllerDeployerScript script;
  LightOrbDeployerScript lightOrbScript;

  function setUp() public {
    lightOrbScript = new LightOrbDeployerScript();
    lightOrbScript.run();

    script = new LightControllerDeployerScript();
    vm.expectEmit(true, false, false, true);
    vm.expectEmit(true, false, false, true);
    vm.expectEmit(false, false, false, false);
    vm.expectEmit(true, false, false, false);
    vm.expectEmit(true, false, false, true);
    vm.expectEmit(false, false, false, false);
    vm.expectEmit(false, false, false, false);
    vm.expectEmit(true, false, false, true);
    emit Initialized(255);
    emit Initialized(255);
    emit Upgraded(address(0xf00));
    emit OwnershipTransferred(address(0), address(0xf00));
    emit Initialized(1);
    emit Upgraded(address(0xf00));
    emit OwnershipTransferred(address(0xf00), address(0xf00));
    emit Initialized(2);
    script.run();
  }

  function testImplementationSlot() public {
    _testProxyImplementationSlot(
      address(script.proxyLightController()),
      address(script.implementationLightController())
    );
  }
}
