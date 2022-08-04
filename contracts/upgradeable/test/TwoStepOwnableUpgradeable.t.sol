// SPDX-License-Identifier: GPL-3.0
// Code from: https://github.com/jameswenzel/utility-contracts/blob/main/test/TwoStepOwnable.t.sol

pragma solidity ^0.8.13;

import "@lightdotso/foundry/BaseTest.t.sol";
import "@lightdotso/ens/ENS.sol";
import "@lightdotso/proxies/utils/EmptyUUPSTwo.sol";

contract TwoStepOwnableUpgradeableTest is BaseTest {
  EmptyUUPSTwo private v02;

  function setUp() public {
    setUpProxies();

    v02 = new EmptyUUPSTwo();
    vm.expectEmit(true, false, false, true);
    vm.expectEmit(true, true, false, true);
    vm.expectEmit(true, false, false, true);
    vm.expectEmit(true, true, false, true);
    emit Upgraded(address(v02));
    emit OwnershipTransferred(address(0), address(this));
    emit Initialized(1);
    emit AdminChanged(address(0), address(admin));
    bytes memory initCalldata = abi.encodePacked(
      EmptyUUPSTwo.initialize.selector
    );
    proxy = new LightProxy(address(v02), address(admin), initCalldata);
  }
}
