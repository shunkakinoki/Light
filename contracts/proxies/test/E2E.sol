// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "@lightdotso/proxies/LightProxy.sol";
import "@lightdotso/proxies/LightProxyAdmin.sol";
import { Implementation1, Implementation2, Implementation3 } from "@openzeppelin/contracts/mocks/RegressionImplementation.sol";
import "forge-std/Test.sol";

contract LightProxiesE2ETest is Test {
  LightProxy internal proxy;
  LightProxyAdmin internal admin;
  Implementation1 internal v1;
  Implementation2 internal v2;
  Implementation3 internal v3;

  event AdminChanged(address previousAdmin, address newAdmin);
  event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner
  );
  event Initialized(uint8 version);
  event Upgraded(address indexed implementation);

  function setUp() public {
    vm.expectEmit(true, true, false, true);
    emit OwnershipTransferred(address(0), address(this));
    admin = new LightProxyAdmin();
    v1 = new Implementation1();
    vm.expectEmit(true, false, false, true);
    emit Upgraded(address(v1));
    vm.expectEmit(true, true, false, true);
    emit AdminChanged(address(0), address(admin));
    proxy = new LightProxy(address(v1), address(admin), "");
    vm.expectEmit(true, false, false, true);
    emit Initialized(1);
    v1.initialize();
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
  }
}
