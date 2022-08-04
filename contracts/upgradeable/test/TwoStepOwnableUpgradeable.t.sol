// SPDX-License-Identifier: GPL-3.0
// Code from: https://github.com/jameswenzel/utility-contracts/blob/main/test/TwoStepOwnable.t.sol

pragma solidity ^0.8.13;

import "@lightdotso/foundry/BaseTest.t.sol";
import "@lightdotso/ens/ENS.sol";

contract TwoStepOwnableUpgradeableTest is BaseTest {
  ENS private ens;

  function setUp() public {
    setUpProxies();
  }

  function testENSProxyImplementation() public {
    ens = new ENS();
    bytes memory payload = abi.encodeWithSignature(
      "setNode(address)",
      address(0)
    );
    _upgradeAndCallUUPS(proxy, address(ens), payload);
    _testUUPSSlot(address(proxy), address(ens));
    vm.expectRevert(bytes("Initializable: contract is already initialized"));
    ENS(address(proxy)).initialize(address(0));

    assertEq(ens.getNode(), address(0));
  }

  function testENSProxyImplementationSequential() public {
    ens = new ENS();
    _upgradeUUPS(proxy, address(ens));
    _testUUPSSlot(address(proxy), address(ens));
    vm.expectRevert(bytes("Initializable: contract is already initialized"));
    ENS(address(proxy)).initialize(address(0));

    ens = ENS(address(proxy));
    ens.setNode(address(0));
    assertEq(ens.getNode(), address(0));
  }
}
