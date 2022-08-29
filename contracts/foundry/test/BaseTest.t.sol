// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;
import "../src/BaseTest.sol";

contract BaseTestTest is BaseTest {
  function testDeployLightProxies() public {
    setUpLightProxies();
  }
}
