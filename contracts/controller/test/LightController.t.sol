/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import { ILightController } from "@lightdotso/controller/ILightController.sol";
import "@lightdotso/foundry/BaseTest.sol";
import "@lightdotso/controller/LightController.sol";

contract LightControllerTest is BaseTest {
  LightController private lightController;

  function setUp() public {
    setUpEmpties();
    setUpEmptyProxies();
    setUpLightImplementations();
    setUpEmptyProxyInitializations();
    setUpLightProxyUpgrades();
    setUpWrappedLightProxies();
  }

  function testLightControllerProxyInitialize() public {
    vm.expectEmit(true, true, false, true, address(wrappedLightController));
    vm.expectEmit(true, false, false, true, address(wrappedLightController));
    emit OwnershipTransferred(address(this), address(this));
    emit Initialized(2);
    wrappedLightController.initialize();
  }

  function testLightControllerDisableInitializersOnImplementation() public {
    lightController = new LightController();
    vm.expectRevert(bytes("Initializable: contract is already initialized"));
    lightController.initialize();
  }

  function testLightControllerSetContractProxy() public {
    testLightControllerProxyInitialize();

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
    testLightControllerSetContractProxy();

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

  function testLightControllerStorageSlot() public {
    testLightControllerSetContractProxy();

    /// Proxy Implementation
    _testProxyImplementationSlot(
      address(proxyLightController),
      address(implementationLightController)
    );
    /// Initializable
    _testArbitrarySlot(
      address(proxyLightController),
      bytes32(uint256(0)),
      bytes32(uint256(2))
    );
    /// OwnableUpgradeable
    _testArbitrarySlot(
      address(proxyLightController),
      bytes32(uint256(51)),
      bytes32(uint256(uint160(address(this))))
    );
    /// UUPSUpgradeable
    _testArbitrarySlot(
      address(proxyLightCore),
      bytes32(uint256(101)),
      bytes32(uint256(0))
    );
    /// PausableUpgradeable
    _testArbitrarySlot(
      address(proxyLightController),
      bytes32(uint256(201)),
      bytes32(uint256(0))
    );
    /// LightControllerStorageV1
    _testArbitrarySlot(
      address(proxyLightController),
      bytes32(
        keccak256(abi.encodePacked(abi.encode(keccak256("one")), uint256(251)))
      ),
      bytes32(uint256(uint160(address(1))))
    );
    _testArbitrarySlot(
      address(proxyLightController),
      bytes32(
        keccak256(abi.encodePacked(abi.encode(keccak256("two")), uint256(251)))
      ),
      bytes32(uint256(uint160(address(2))))
    );
    _testArbitrarySlot(
      address(proxyLightController),
      bytes32(
        keccak256(
          abi.encodePacked(abi.encode(keccak256("three")), uint256(251))
        )
      ),
      bytes32(uint256(uint160(address(3))))
    );
  }

  function testLightControllerStorageSlotBeforeInitialization() public {
    /// Proxy Implementation
    _testProxyImplementationSlot(
      address(proxyLightController),
      address(implementationLightController)
    );
    /// Initializable
    _testArbitrarySlot(
      address(proxyLightController),
      bytes32(uint256(0)),
      bytes32(uint256(1))
    );
    /// OwnableUpgradeable
    _testArbitrarySlot(
      address(proxyLightController),
      bytes32(uint256(51)),
      bytes32(uint256(uint160(address(this))))
    );
    /// UUPSUpgradeable
    _testArbitrarySlot(
      address(proxyLightCore),
      bytes32(uint256(101)),
      bytes32(uint256(0))
    );
    /// PausableUpgradeable
    _testArbitrarySlot(
      address(proxyLightController),
      bytes32(uint256(201)),
      bytes32(uint256(0))
    );
    /// LightControllerStorageV1
    _testArbitrarySlot(
      address(proxyLightController),
      bytes32(
        keccak256(abi.encodePacked(abi.encode(keccak256("one")), uint256(251)))
      ),
      bytes32(uint256(0))
    );
    _testArbitrarySlot(
      address(proxyLightController),
      bytes32(
        keccak256(abi.encodePacked(abi.encode(keccak256("two")), uint256(251)))
      ),
      bytes32(uint256(0))
    );
    _testArbitrarySlot(
      address(proxyLightController),
      bytes32(
        keccak256(
          abi.encodePacked(abi.encode(keccak256("three")), uint256(251))
        )
      ),
      bytes32(uint256(0))
    );
  }
}
