// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "@lightdotso/foundry/BaseTest.t.sol";
import "@lightdotso/ens/ENS.sol";
import "@lightdotso/proxies/utils/EmptyUUPSTwo.sol";

contract TwoStepOwnableUpgradeableTest is BaseTest {
  LightProxy lightProxy;
  EmptyUUPSTwo private v02;

  event PotentialOwnerUpdated(address newPotentialOwner);

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
    lightProxy = new LightProxy(address(v02), address(admin), initCalldata);
    v02 = EmptyUUPSTwo(address(lightProxy));
  }

  function testTwoStepOwnableOwner() public {
    assertEq(v02.owner(), address(this));
  }

  function testTwoStepOwnableRenounceOwnership() public {
    assertEq(v02.owner(), address(this));
    v02.renounceOwnership();
    assertEq(v02.owner(), address(0));
  }

  function testTwoStepOwnableTransferOwnership() public {
    assertEq(v02.owner(), address(this));
    vm.expectEmit(true, false, false, true);
    emit PotentialOwnerUpdated(address(1));
    v02.transferOwnership(address(1));
    assertEq(v02.owner(), address(this));
    assertEq(v02.potentialOwner(), address(1));
    vm.prank(address(1));
    vm.expectEmit(true, false, false, true);
    vm.expectEmit(true, true, false, true);
    emit PotentialOwnerUpdated(address(0));
    emit OwnershipTransferred(address(this), address(1));
    v02.acceptOwnership();
  }

  function testTwoStepOwnableAcceptOwnershipFailNotPotentialOwner() public {
    v02.transferOwnership(address(1));
    vm.prank(address(2));
    vm.expectRevert(bytes("TwoStepOwnable: caller is not the potential owner"));
    v02.acceptOwnership();
  }

  function testTwoStepOwnableCancelTransferOwnership() public {
    v02.transferOwnership(address(1));
    vm.expectEmit(true, false, false, true);
    emit PotentialOwnerUpdated(address(0));
    v02.cancelTransferOwnership();
  }

  function testTwoStepOwnableCancelTransferOwnershipFailNotOwner() public {
    v02.transferOwnership(address(1));
    vm.prank(address(1));
    vm.expectRevert(bytes("TwoStepOwnable: caller is not the owner"));
    v02.cancelTransferOwnership();
  }
}
