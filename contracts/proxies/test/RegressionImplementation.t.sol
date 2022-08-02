// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "@lightdotso/proxies/LightProxy.sol";
import "@lightdotso/proxies/LightProxyAdmin.sol";
import { EmptyUUPS } from "@lightdotso/proxies/utils/EmptyUUPS.sol";
import { Implementation } from "./mocks/Implementation.sol";
import { Implementation1, Implementation2, Implementation3, Implementation4 } from "@openzeppelin/contracts/mocks/RegressionImplementation.sol";
import "forge-std/Test.sol";

contract LightProxiesE2ETest is Test {
  LightProxy internal proxy;
  LightProxyAdmin internal admin;
  EmptyUUPS internal v0;
  Implementation1 internal v1;
  Implementation2 internal v2;
  Implementation3 internal v3;
  Implementation4 internal v4;

  event AdminChanged(address previousAdmin, address newAdmin);
  event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner
  );
  event Initialized(uint8 version);
  event Upgraded(address indexed implementation);

  function setUp() public {
    vm.expectEmit(true, true, false, true);
    emit OwnershipTransferred(address(0), address(this));
    admin = new LightProxyAdmin();

    v0 = new EmptyUUPS();
    vm.expectEmit(true, false, false, true);
    vm.expectEmit(true, true, false, true);
    emit Upgraded(address(v0));
    emit AdminChanged(address(0), address(admin));
    proxy = new LightProxy(address(v0), address(admin), "");

    _testUUPSSlot(address(proxy), address(v0));

    v0 = EmptyUUPS(address(proxy));
    vm.expectEmit(true, false, false, true);
    emit Initialized(1);
    v0.initialize();
  }

  function testProxyAdmin() public {
    assertEq(admin.owner(), address(this));
    vm.expectEmit(true, true, false, true);
    emit OwnershipTransferred(address(this), address(0));
    admin.renounceOwnership();
    assertEq(admin.owner(), address(0));
  }

  function testProxyImplementation() public {
    v1 = new Implementation1();
    _upgradeUUPS(proxy, address(v1));
    _testUUPSSlot(address(proxy), address(v1));
    _testUUPSInitializeOnce(address(proxy));

    v1 = Implementation1(address(proxy));
    v1.setValue(1);

    v2 = new Implementation2();
    _upgradeUUPS(proxy, address(v2));
    _testUUPSSlot(address(proxy), address(v2));
    _testUUPSInitializeOnce(address(proxy));

    v2 = Implementation2(address(proxy));
    assertEq(v2.getValue(), 1);
    v2.setValue(2);
    assertEq(v2.getValue(), 2);

    v3 = new Implementation3();
    _upgradeUUPS(proxy, address(v3));
    _testUUPSSlot(address(proxy), address(v3));
    _testUUPSInitializeOnce(address(proxy));

    v3 = Implementation3(address(proxy));
    assertEq(v3.getValue(1), 3);
    v3.setValue(3);

    v4 = new Implementation4();
    _upgradeUUPS(proxy, address(v4));
    _testUUPSSlot(address(proxy), address(v4));
    _testUUPSInitializeOnce(address(proxy));

    v4 = Implementation4(address(proxy));
    assertEq(v4.getValue(), 3);
    v4.setValue(4);
    assertEq(v4.getValue(), 4);
    (bool status, ) = address(v4).call("");
    assertEq(status, true);
    assertEq(v4.getValue(), 1);
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

  function _testUUPSInitializeOnce(address _proxy) internal {
    vm.expectRevert(bytes("Initializable: contract is already initialized"));
    Implementation(_proxy).initialize();

    vm.expectRevert(bytes("Initializable: contract is already initialized"));
    (bool status, ) = _proxy.call(abi.encodeWithSignature("initialize()"));
    assertEq(status, true);
  }

  function _upgradeUUPS(TransparentUpgradeableProxy _proxy, address _impl)
    internal
  {
    vm.expectEmit(true, false, false, true);
    emit Upgraded(address(_impl));
    admin.upgrade(_proxy, _impl);
  }
}
