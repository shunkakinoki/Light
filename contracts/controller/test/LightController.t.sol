/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import { ILightController } from "@lightdotso/controller/ILightController.sol";
import "@lightdotso/foundry/BaseTest.sol";
import "@lightdotso/controller/LightController.sol";

contract LightControllerTest is BaseTest {
  LightController private lightController;

  function setUp() public {
    setUpLightProxies();
  }

  function testLightControllerDisableInitializersOnImplementation() public {
    lightController = new LightController();
    vm.expectRevert(bytes("Initializable: contract is already initialized"));
    lightController.initialize();
  }

  function testLightControllerSetContractProxy() public {
    wrappedLightController.setContractProxy(keccak256("one"), address(1));
    assertEq(
      wrappedLightController.getContractProxy(keccak256("one")),
      address(1)
    );
    wrappedLightController.setContractProxy(keccak256("two"), address(2));
    assertEq(
      wrappedLightController.getContractProxy(keccak256("two")),
      address(2)
    );
    wrappedLightController.setContractProxy(keccak256("three"), address(3));
    assertEq(
      wrappedLightController.getContractProxy(keccak256("three")),
      address(3)
    );
  }

  function testLightControllerSetContractProxyErrorOnAddressNotSet() public {
    vm.expectRevert(ILightController.ContractAddressNotSet.selector);
    wrappedLightController.setContractProxy(keccak256("error"), address(0));
  }

  function testLightControllerUnsetContractProxy() public {
    wrappedLightController.unsetContractProxy(keccak256("one"));
    assertEq(
      wrappedLightController.getContractProxy(keccak256("one")),
      address(0)
    );
    wrappedLightController.unsetContractProxy(keccak256("two"));
    assertEq(
      wrappedLightController.getContractProxy(keccak256("two")),
      address(0)
    );
    wrappedLightController.unsetContractProxy(keccak256("three"));
    assertEq(
      wrappedLightController.getContractProxy(keccak256("three")),
      address(0)
    );
  }
}
