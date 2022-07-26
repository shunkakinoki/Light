// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "@lightdotso/proxies/LightProxy.sol";
import "@lightdotso/proxies/LightProxyAdmin.sol";
import "@openzeppelin/contracts/mocks/RegressionImplementation.sol";
import "forge-std/Test.sol";

contract LightProxiesE2ETest is Test {
  LightProxy internal proxy;
  LightProxyAdmin internal admin;
  Implementation1 internal v1;
  Implementation2 internal v2;
  Implementation3 internal v3;

  function setUp() public {
    v1 = new Implementation1();
    admin = new LightProxyAdmin();
    proxy = new LightProxy(address(v1), address(admin), "");
    v1 = Implementation1(address(proxy));
    v1.initialize();
  }

  function testProxy() public {
    v2 = new Implementation2();
    admin.upgrade(proxy, address(v2));
    v2 = Implementation2(address(proxy));
  }
}
