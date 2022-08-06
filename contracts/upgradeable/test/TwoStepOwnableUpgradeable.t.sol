// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "@lightdotso/foundry/BaseTest.sol";
import "@lightdotso/proxies/utils/EmptyUUPSTwoStep.sol";

contract TwoStepOwnableUpgradeableTest is BaseTest {
  UUPSProxy internal proxy;

  EmptyUUPSTwoStep internal emptyUUPSTwoStep;
  EmptyUUPSTwoStep internal wrappedEmptyUUPSTwoStep;

  event PotentialOwnerUpdated(address newPotentialOwner);

  function setUp() public {
    emptyUUPSTwoStep = new EmptyUUPSTwoStep();
    proxy = new UUPSProxy(address(emptyUUPSTwoStep), "");

    vm.expectEmit(true, true, false, true);
    vm.expectEmit(true, false, false, true);
    emit OwnershipTransferred(address(0), address(this));
    emit Initialized(1);
    EmptyUUPSTwoStep(address(proxy)).initialize();

    wrappedEmptyUUPSTwoStep = EmptyUUPSTwoStep(address(proxy));
  }

  function testTwoStepOwnableOwner() public {
    assertEq(wrappedEmptyUUPSTwoStep.owner(), address(this));
  }

  function testTwoStepOwnableRenounceOwnership() public {
    assertEq(wrappedEmptyUUPSTwoStep.owner(), address(this));
    wrappedEmptyUUPSTwoStep.renounceOwnership();
    assertEq(wrappedEmptyUUPSTwoStep.owner(), address(0));
  }

  function testTwoStepOwnableTransferOwnership() public {
    assertEq(wrappedEmptyUUPSTwoStep.owner(), address(this));
    vm.expectEmit(true, false, false, true);
    emit PotentialOwnerUpdated(address(1));
    wrappedEmptyUUPSTwoStep.transferOwnership(address(1));
    assertEq(wrappedEmptyUUPSTwoStep.owner(), address(this));
    assertEq(wrappedEmptyUUPSTwoStep.potentialOwner(), address(1));
    vm.prank(address(1));
    vm.expectEmit(true, false, false, true);
    vm.expectEmit(true, true, false, true);
    emit PotentialOwnerUpdated(address(0));
    emit OwnershipTransferred(address(this), address(1));
    wrappedEmptyUUPSTwoStep.acceptOwnership();
  }

  function testTwoStepOwnableAcceptOwnershipFailNotPotentialOwner() public {
    wrappedEmptyUUPSTwoStep.transferOwnership(address(1));
    vm.prank(address(2));
    vm.expectRevert(bytes("TwoStepOwnable: caller is not the potential owner"));
    wrappedEmptyUUPSTwoStep.acceptOwnership();
  }

  function testTwoStepOwnableCancelTransferOwnership() public {
    wrappedEmptyUUPSTwoStep.transferOwnership(address(1));
    vm.expectEmit(true, false, false, true);
    emit PotentialOwnerUpdated(address(0));
    wrappedEmptyUUPSTwoStep.cancelTransferOwnership();
  }

  function testTwoStepOwnableCancelTransferOwnershipFailNotOwner() public {
    wrappedEmptyUUPSTwoStep.transferOwnership(address(1));
    vm.prank(address(1));
    vm.expectRevert(bytes("TwoStepOwnable: caller is not the owner"));
    wrappedEmptyUUPSTwoStep.cancelTransferOwnership();
  }
}
