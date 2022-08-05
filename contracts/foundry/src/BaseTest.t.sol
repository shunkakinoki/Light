// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "@lightdotso/proxies/LightProxy.sol";
import "@lightdotso/proxies/LightProxyAdmin.sol";
import { Empty } from "@lightdotso/proxies/utils/Empty.sol";
import { EmptyUUPS } from "@lightdotso/proxies/utils/EmptyUUPS.sol";
import { EmptyUUPSBeacon } from "@lightdotso/proxies/utils/EmptyUUPSBeacon.sol";
import { Implementation } from "./mocks/Implementation.sol";

contract BaseTest is Test {
  LightProxyAdmin internal admin;
  Empty internal empty;
  EmptyUUPS internal emptyUUPS;
  EmptyUUPSBeacon internal emptyBeacon;

  event AdminChanged(address previousAdmin, address newAdmin);
  event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner
  );
  event Initialized(uint8 version);
  event Upgraded(address indexed implementation);

  function deployLightProxyAdmin() public {
    /// Deploy the LightProxyAdmin and set admin.
    vm.expectEmit(true, true, false, true);
    emit OwnershipTransferred(address(0), address(this));
    admin = new LightProxyAdmin();
  }

  function deployLightProxy(string memory label_)
    public
    returns (address proxyAddress)
  {
    /// Internal variables.
    LightProxy proxy;

    /// Deploy the LightProxy with EmptyUUPS and initialize calldata.
    emptyUUPS = new EmptyUUPS();
    vm.expectEmit(true, false, false, true);
    vm.expectEmit(true, true, false, true);
    vm.expectEmit(true, false, false, true);
    vm.expectEmit(true, true, false, true);
    emit Upgraded(address(emptyUUPS));
    emit OwnershipTransferred(address(0), address(this));
    emit Initialized(1);
    emit AdminChanged(address(0), address(admin));
    bytes memory initCalldata = abi.encodePacked(EmptyUUPS.initialize.selector);
    proxy = new LightProxy(address(emptyUUPS), address(admin), initCalldata);

    /// Console log deploy and label.
    console2.log("Deployed", address(proxy), "with label", label_);
    console2.log("Deployed", address(proxy), "with admin", address(admin));
    vm.label(address(proxy), label_);

    /// Test the proxy implementation slot.
    _testUUPSSlot(address(proxy), address(emptyUUPS));

    return address(proxy);
  }

  function setUpProxies() public {
    deployLightProxyAdmin();

    deployLightProxy("Light Proxy A");
    deployLightProxy("Light Proxy B");
    deployLightProxy("Light Proxy C");

    empty = new Empty();
    emptyBeacon = new EmptyUUPSBeacon();
  }

  function testLightProxyAdmin() public {
    deployLightProxyAdmin();

    assertEq(admin.owner(), address(this));
    vm.expectEmit(true, true, false, true);
    emit OwnershipTransferred(address(this), address(0));
    admin.renounceOwnership();
    assertEq(admin.owner(), address(0));
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

  function _upgradeUUPS(address payable _proxy, address _impl) internal {
    vm.expectEmit(true, false, false, true);
    emit Upgraded(address(_impl));
    admin.upgrade(TransparentUpgradeableProxy(_proxy), _impl);
  }

  function _upgradeAndCallUUPS(
    address payable _proxy,
    address _impl,
    bytes memory _data
  ) internal {
    vm.expectEmit(true, false, false, true);
    emit Upgraded(address(_impl));
    admin.upgradeAndCall(TransparentUpgradeableProxy(_proxy), _impl, _data);
  }
}
