// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "@lightdotso/foundry/BaseTest.t.sol";
import "@lightdotso/proxies/LightProxy.sol";
import "@lightdotso/proxies/LightProxyAdmin.sol";
import { EmptyUUPS } from "@lightdotso/proxies/utils/EmptyUUPS.sol";
import { Implementation1, Implementation2, Implementation3, Implementation4 } from "@openzeppelin/contracts/mocks/RegressionImplementation.sol";
import "forge-std/Test.sol";

contract LightProxiesE2ETest is BaseTest {
  Implementation1 internal v1;
  Implementation2 internal v2;
  Implementation3 internal v3;
  Implementation4 internal v4;

  function setUp() public {
    setUpProxies();
  }

  function testProxyAdmin() public {
    assertEq(admin.owner(), address(this));
    vm.expectEmit(true, true, false, true);
    emit OwnershipTransferred(address(this), address(0));
    admin.renounceOwnership();
    assertEq(admin.owner(), address(0));
  }

  function testProxyImplementation() public {
    v1 = new Implementation1();
    _upgradeUUPS(proxy, address(v1));
    _testUUPSSlot(address(proxy), address(v1));
    _testUUPSInitializeOnce(address(proxy));

    v1 = Implementation1(address(proxy));
    v1.setValue(1);

    v2 = new Implementation2();
    _upgradeUUPS(proxy, address(v2));
    _testUUPSSlot(address(proxy), address(v2));
    _testUUPSInitializeOnce(address(proxy));

    v2 = Implementation2(address(proxy));
    assertEq(v2.getValue(), 1);
    v2.setValue(2);
    assertEq(v2.getValue(), 2);

    v3 = new Implementation3();
    _upgradeUUPS(proxy, address(v3));
    _testUUPSSlot(address(proxy), address(v3));
    _testUUPSInitializeOnce(address(proxy));

    v3 = Implementation3(address(proxy));
    assertEq(v3.getValue(1), 3);
    v3.setValue(3);

    v4 = new Implementation4();
    _upgradeUUPS(proxy, address(v4));
    _testUUPSSlot(address(proxy), address(v4));
    _testUUPSInitializeOnce(address(proxy));

    v4 = Implementation4(address(proxy));
    assertEq(v4.getValue(), 3);
    v4.setValue(4);
    assertEq(v4.getValue(), 4);
    (bool status, ) = address(v4).call("");
    assertEq(status, true);
    assertEq(v4.getValue(), 1);
  }
}
