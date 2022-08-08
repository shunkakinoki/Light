// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "@lightdotso/foundry/BaseTest.sol";
import "@lightdotso/protocol/LightOrbFactory.sol";
import "./mocks/MockLightOrb.sol";

contract LightOrbTest is BaseTest {
  MockLightOrbV1 private implmentationV1;
  MockLightOrbV2 private implmentationV2;

  function setUp() public {
    implmentationV1 = new MockLightOrbV1();
    implmentationV2 = new MockLightOrbV2();
    implementationLightOrbFactory = new LightOrbFactory();

    setUpEmpties();
    setUpEmptyProxies();
    setUpEmptyProxyInitializations();

    vm.expectEmit(true, false, false, true);
    emit Upgraded(address(implmentationV1));
    EmptyUUPS(address(proxyLightOrb)).upgradeTo(address(implmentationV1));
    vm.expectEmit(true, false, false, true);
    emit Upgraded(address(implementationLightOrbFactory));
    EmptyUUPSBeacon(address(proxyLightOrbFactory)).upgradeTo(
      address(implementationLightOrbFactory)
    );

    wrappedLightOrb = LightOrb(address(proxyLightOrb));
    wrappedLightOrbFactory = LightOrbFactory(address(proxyLightOrbFactory));

    wrappedLightOrbFactory.initializeLightOrbFactory(address(wrappedLightOrb));
    assertEq(wrappedLightOrbFactory.implementation(), address(wrappedLightOrb));
  }

  function testVersion() public {
    assertEq(implmentationV1.getVersion(), 1);
  }
}
