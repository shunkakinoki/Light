// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "@lightdotso/foundry/BaseTest.t.sol";
import "@lightdotso/ens/ENS.sol";

contract ENSTest is BaseTest {
  ENS private ens;

  function setUp() public {
    setUpProxies();
  }

  function testENSProxyImplementation() public {
    ens = new ENS();
    _upgradeUUPS(proxy, address(ens));
    _testUUPSSlot(address(proxy), address(ens));
    _testUUPSInitializeOnce(address(proxy));
  }
}
