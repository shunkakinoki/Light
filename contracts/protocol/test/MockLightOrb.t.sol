// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "@lightdotso/foundry/BaseTest.sol";
import "@lightdotso/protocol/LightOrbFactory.sol";
import "./mocks/MockLightOrb.sol";

contract LightOrbTest is BaseTest {
  MockLightOrbV1 private implmentationV1;
  MockLightOrbV2 private implmentationV2;
  MockLightOrbV3 private implmentationV3;

  MockLightOrbV1 private mockLightOrbV1;
  MockLightOrbV2 private mockLightOrbV2;
  MockLightOrbV3 private mockLightOrbV3;

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
    wrappedLightOrbFactory.initialize(address(implmentationV1));
    assertEq(wrappedLightOrbFactory.implementation(), address(implmentationV1));

    mockLightOrbV1 = MockLightOrbV1(
      address(wrappedLightOrbFactory.implementation())
    );
    mockLightOrbV1.initialize("Mock Light Orb", "MLORB");
    assertEq(mockLightOrbV1.getVersion(), 1);
    assertEq(mockLightOrbV1.name(), "Mock Light Orb");
    assertEq(mockLightOrbV1.symbol(), "MLORB");

    mockLightOrbV1.upgradeTo(address(implmentationV2));
    mockLightOrbV2 = MockLightOrbV2(
      address(wrappedLightOrbFactory.implementation())
    );
    assertEq(mockLightOrbV2.getVersion(), 2);
    assertEq(mockLightOrbV2.name(), "Mock Light Orb");
    assertEq(mockLightOrbV2.symbol(), "MLORB");

    vm.expectEmit(true, false, false, true);
    emit Upgraded(address(implmentationV3));
    wrappedLightOrbFactory._upgradeLightOrbs(address(implmentationV3));
    mockLightOrbV3 = MockLightOrbV3(
      address(wrappedLightOrbFactory.implementation())
    );

    assertEq(mockLightOrbV3.getVersion(), 3);
    assertEq(mockLightOrbV3.name(), "");
    assertEq(mockLightOrbV3.symbol(), "");
  }
}
