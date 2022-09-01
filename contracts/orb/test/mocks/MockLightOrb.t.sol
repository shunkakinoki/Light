// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "@lightdotso/foundry/BaseTest.sol";
import "@lightdotso/orb/LightOrbFactory.sol";
import "./MockLightOrb.sol";

contract LightOrbTest is BaseTest {
  MockLightOrbV1 private implmentationV1;
  MockLightOrbV2 private implmentationV2;
  MockLightOrbV3 private implmentationV3;

  MockLightOrbV1 private mockLightOrbV1;
  MockLightOrbV2 private mockLightOrbV2;
  MockLightOrbV3 private mockLightOrbV3;

  MockLightOrbV1 private wrappedBeaconImplementationV1;
  MockLightOrbV2 private wrappedBeaconImplementationV2;
  MockLightOrbV3 private wrappedBeaconImplementationV3;

  function setUp() public {
    implmentationV1 = new MockLightOrbV1();
    implmentationV2 = new MockLightOrbV2();
    implmentationV3 = new MockLightOrbV3();
    implementationLightOrbFactory = new LightOrbFactory();

    setUpEmpties();
    setUpEmptyProxies();
    setUpEmptyProxyInitializations();
    setUpLightImplementations();

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
  }

  function testMockCreateLightOrb() public {
    wrappedLightOrbFactory.initialize(
      address(implmentationV1),
      address(proxyLightController),
      address(proxyLightOperatorStore)
    );
    assertEq(wrappedLightOrbFactory.implementation(), address(implmentationV1));

    wrappedBeaconImplementationV1 = MockLightOrbV1(
      wrappedLightOrbFactory._createLightOrb("Mock Light Orb", "MLORB")
    );
    assertEq(wrappedBeaconImplementationV1.getVersion(), 1);
    assertEq(wrappedBeaconImplementationV1.name(), "Mock Light Orb");
    assertEq(wrappedBeaconImplementationV1.symbol(), "MLORB");

    wrappedLightOrbFactory._upgradeBeaconProxy(address(implmentationV2));
    wrappedBeaconImplementationV2 = MockLightOrbV2(
      address(wrappedBeaconImplementationV1)
    );
    assertEq(wrappedBeaconImplementationV2.getVersion(), 2);
    assertEq(wrappedBeaconImplementationV2.name(), "Mock Light Orb");
    assertEq(wrappedBeaconImplementationV2.symbol(), "MLORB");

    wrappedLightOrbFactory._upgradeBeaconProxy(address(implmentationV3));
    wrappedBeaconImplementationV3 = MockLightOrbV3(
      address(wrappedBeaconImplementationV1)
    );
    assertEq(wrappedBeaconImplementationV3.getVersion(), 3);
    assertEq(wrappedBeaconImplementationV3.name(), "Mock Light Orb");
    assertEq(wrappedBeaconImplementationV3.symbol(), "MLORB");
  }
}
