/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import "@lightdotso/foundry/BaseTest.sol";
import "@lightdotso/deployer/LightOrbDeployerScript.s.sol";

contract LightOrbDeployerScriptTest is BaseTest {
  LightOrbDeployerScript script;

  function setUp() public virtual {
    script = new LightOrbDeployerScript();
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
