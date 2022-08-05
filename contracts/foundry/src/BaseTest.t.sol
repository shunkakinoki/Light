// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "@lightdotso/proxies/LightProxy.sol";
import "@lightdotso/proxies/LightProxyAdmin.sol";
import "@lightdotso/protocol/LightOrb.sol";
import "@lightdotso/protocol/LightSpace.sol";
import "@lightdotso/protocol/LightSpaceFactory.sol";
import { Empty } from "@lightdotso/proxies/utils/Empty.sol";
import { EmptyUUPS } from "@lightdotso/proxies/utils/EmptyUUPS.sol";
import { EmptyUUPSBeacon } from "@lightdotso/proxies/utils/EmptyUUPSBeacon.sol";
import { Implementation } from "./mocks/Implementation.sol";
import { TransparentUpgradeableProxy } from "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";

contract BaseTest is Test {
  Empty internal empty;
  EmptyUUPS internal emptyUUPS;
  EmptyUUPSBeacon internal emptyBeacon;

  address deployer = address(bytes20(keccak256("deployer")));
  address lightOrbProxy = address(bytes20(keccak256("lightOrbProxy")));
  address lightProxyAdminProxy =
    address(bytes20(keccak256("lightProxyAdminProxy")));
  address lightSpaceProxy = address(bytes20(keccak256("lightSpaceProxy")));
  address lightSpaceFactoryProxy =
    address(bytes20(keccak256("lightSpaceFactoryProxy")));

  LightOrb internal lightOrb;
  LightProxyAdmin internal lightProxyAdmin;
  LightSpace internal lightSpace;
  LightSpaceFactory internal lightSpaceFactory;

  event AdminChanged(address previousAdmin, address newAdmin);
  event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner
  );
  event Initialized(uint8 version);
  event Upgraded(address indexed implementation);

  function deployLightProxy(
    address implementation_,
    bytes memory data_,
    address etch_,
    string memory label_
  ) public returns (address proxyAddress) {
    /// Internal variables.
    TransparentUpgradeableProxy proxy;

    /// Deploy the LightProxy with EmptyUUPS and initialize calldata.
    vm.prank(deployer);
    vm.expectEmit(true, false, false, true);
    vm.expectEmit(true, true, false, true);
    vm.expectEmit(true, false, false, true);
    vm.expectEmit(true, true, false, true);
    emit Upgraded(implementation_);
    emit OwnershipTransferred(address(0), deployer);
    emit Initialized(1);
    emit AdminChanged(address(0), deployer);
    proxy = new TransparentUpgradeableProxy(implementation_, deployer, data_);

    bytes32 proxySlot;
    bytes32 implSlot = bytes32(
      uint256(keccak256("eip1967.proxy.implementation")) - 1
    );
    bytes32 adminSlot = bytes32(uint256(keccak256("eip1967.proxy.admin")) - 1);

    address addr;
    proxySlot = vm.load(address(proxy), implSlot);
    assembly {
      mstore(0, proxySlot)
      addr := mload(0)
    }
    assertEq(addr, implementation_);

    vm.etch(etch_, address(proxy).code);
    vm.store(etch_, implSlot, bytes32(abi.encode(implementation_)));

    proxySlot = vm.load(etch_, adminSlot);
    assembly {
      mstore(0, proxySlot)
      addr := mload(0)
    }

    proxySlot = vm.load(address(proxy), adminSlot);
    assembly {
      mstore(0, proxySlot)
      addr := mload(0)
    }
    assertEq(addr, deployer);

    vm.etch(etch_, address(proxy).code);
    vm.store(etch_, implSlot, bytes32(abi.encode(implementation_)));

    proxySlot = vm.load(etch_, implSlot);
    assembly {
      mstore(0, proxySlot)
      addr := mload(0)
    }

    /// Console log deploy and label.
    console2.log("Deployed", address(proxy), "with label", label_);
    console2.log("Deployed", address(proxy), "with admin", deployer);
    vm.label(address(etch_), label_);

    /// Test the proxy implementation slot.
    _testUUPSSlot(address(proxy), implementation_);
    _testProxyAdminSlot(address(proxy), deployer);
    _testArbitrarySlot(
      address(proxy),
      bytes32(uint256(0)),
      bytes32(uint256(1))
    );

    return address(proxy);
  }

  function upgradeLightProxy(address proxy_, address implementation_) public {
    vm.prank(deployer);
    vm.expectEmit(true, false, false, true);
    emit Upgraded(implementation_);
    TransparentUpgradeableProxy(payable(proxy_)).upgradeTo(implementation_);
    // assertEq(EmptyUUPS(payable(proxy_)).owner(), deployer);
  }

  function setUpProxies() public {
    vm.label(deployer, "deployer");

    /// Deploy the LightProxyAdmin and set lightProxyAdmin.
    vm.prank(deployer);
    vm.expectEmit(true, true, false, true);
    emit OwnershipTransferred(address(0), deployer);
    lightProxyAdmin = new LightProxyAdmin();

    /// Deploy the origin empty contracts for bytecode.
    empty = new Empty();
    emptyUUPS = new EmptyUUPS();
    emptyBeacon = new EmptyUUPSBeacon();

    /// Implement origin contracts and labels.
    lightOrb = new LightOrb();
    vm.label(address(lightOrb), "LightOrb");
    lightSpace = new LightSpace();
    vm.label(address(lightSpace), "LightSpace");
    lightSpaceFactory = new LightSpaceFactory();
    vm.label(address(lightSpaceFactory), "LightSpaceFactory");

    /// Initialize calldata for proxy deployment.
    bytes memory emptyUUPSInitializeCalldata = abi.encodePacked(
      EmptyUUPS.initialize.selector
    );
    bytes memory emptyBeaconInitializeCalldata = abi.encodeWithSelector(
      EmptyUUPSBeacon.initialize.selector,
      address(empty)
    );

    /// Deploy the proxies with corresponding implementations and calldata.
    lightOrbProxy = deployLightProxy(
      address(emptyUUPS),
      emptyUUPSInitializeCalldata,
      lightOrbProxy,
      "LightOrb Proxy"
    );
    assertEq((EmptyUUPS(payable(lightOrbProxy))).owner(), address(deployer));
    lightSpaceProxy = deployLightProxy(
      address(emptyUUPS),
      emptyUUPSInitializeCalldata,
      lightSpaceProxy,
      "LightSpace Proxy"
    );
    assertEq((EmptyUUPS(payable(lightSpaceProxy))).owner(), address(deployer));
    lightSpaceFactoryProxy = deployLightProxy(
      address(emptyBeacon),
      emptyBeaconInitializeCalldata,
      lightSpaceFactoryProxy,
      "LightSpaceFactory Proxy"
    );
    assertEq(
      (EmptyUUPSBeacon(payable(lightSpaceProxy))).owner(),
      address(deployer)
    );

    /// Upgrade the proxies to corresponding origin implementations.
    upgradeLightProxy(lightOrbProxy, address(lightOrb));
    upgradeLightProxy(lightSpaceProxy, address(lightSpace));
    upgradeLightProxy(lightSpaceFactoryProxy, address(lightSpaceFactory));
  }

  function testSetUpProxies() public {
    setUpProxies();
  }

  function testLightProxyAdmin() public {
    setUpProxies();

    // assertEq(lightProxyAdmin.owner(), deployer);
    vm.prank(deployer);
    vm.expectEmit(true, true, false, true);
    emit OwnershipTransferred(deployer, address(0));
    lightProxyAdmin.renounceOwnership();
    assertEq(lightProxyAdmin.owner(), address(0));
  }

  function _testArbitrarySlot(
    address _proxy,
    bytes32 _slot,
    bytes32 _expected
  ) internal {
    bytes32 proxySlot = vm.load(address(_proxy), _slot);
    bytes32 target;
    assembly {
      mstore(0, proxySlot)
      target := mload(0)
    }
    assertEq(target, _expected);
  }

  function _testUUPSSlot(address _proxy, address _impl) internal {
    bytes32 implSlot = bytes32(
      uint256(keccak256("eip1967.proxy.implementation")) - 1
    );
    bytes32 proxySlot = vm.load(address(_proxy), implSlot);
    address addr;
    assembly {
      mstore(0, proxySlot)
      addr := mload(0)
    }
    assertEq(addr, address(_impl));
  }

  function _testProxyAdminSlot(address _proxy, address _impl) internal {
    bytes32 adminSlot = bytes32(uint256(keccak256("eip1967.proxy.admin")) - 1);
    bytes32 proxySlot = vm.load(address(_proxy), adminSlot);
    address addr;
    assembly {
      mstore(0, proxySlot)
      addr := mload(0)
    }
    assertEq(addr, address(_impl));
  }

  function _testProxyBeaconSlot(address _proxy, address _impl) internal {
    bytes32 beaconSlot = bytes32(
      uint256(keccak256("eip1967.proxy.beacon")) - 1
    );
    bytes32 proxySlot = vm.load(address(_proxy), beaconSlot);
    address addr;
    assembly {
      mstore(0, proxySlot)
      addr := mload(0)
    }
    assertEq(addr, address(_impl));
  }

  function _testUUPSInitializeOnce(address _proxy) internal {
    vm.expectRevert(bytes("Initializable: contract is already initialized"));
    Implementation(_proxy).initialize();

    vm.expectRevert(bytes("Initializable: contract is already initialized"));
    (bool status, ) = _proxy.call(abi.encodeWithSignature("initialize()"));
    assertEq(status, true);
  }

  function _upgradeUUPS(address payable _proxy, address _impl) internal {
    vm.expectEmit(true, false, false, true);
    emit Upgraded(address(_impl));
    lightProxyAdmin.upgrade(TransparentUpgradeableProxy(_proxy), _impl);
  }

  function _upgradeAndCallUUPS(
    address payable _proxy,
    address _impl,
    bytes memory _data
  ) internal {
    vm.expectEmit(true, false, false, true);
    emit Upgraded(address(_impl));
    lightProxyAdmin.upgradeAndCall(
      TransparentUpgradeableProxy(_proxy),
      _impl,
      _data
    );
  }
}
