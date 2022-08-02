// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "@lightdotso/proxies/LightProxy.sol";
import "@lightdotso/proxies/LightProxyAdmin.sol";
import { EmptyUUPS } from "@lightdotso/proxies/utils/EmptyUUPS.sol";
import { Implementation } from "./mocks/Implementation.sol";

contract BaseTest is Test {
  LightProxy internal proxy;
  LightProxyAdmin internal admin;
  EmptyUUPS internal v0;

  event AdminChanged(address previousAdmin, address newAdmin);
  event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner
  );
  event Initialized(uint8 version);
  event Upgraded(address indexed implementation);

  function setUpProxies() public {
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

  function _upgradeAndCallUUPS(
    TransparentUpgradeableProxy _proxy,
    address _impl,
    bytes memory _data
  ) internal {
    vm.expectEmit(true, false, false, true);
    emit Upgraded(address(_impl));
    admin.upgradeAndCall(_proxy, _impl, _data);
  }
}
