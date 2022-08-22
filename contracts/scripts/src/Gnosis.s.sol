// SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.13;

import "forge-std/Script.sol";

interface GnosisProxyFactory {
  function createProxyWithNonce(
    address _singleton,
    bytes memory initializer,
    uint256 saltNonce
  ) external;
}

contract GnosisL1Script is Script {
  address GNOSIS_L1_SINGLETON_ADDRESS_1_3_0 =
    address(0xd9Db270c1B5E3Bd161E8c8503c55cEABeE709552);
  address GNOSIS_L1_PROXY_FACTORY_ADDRESS_1_3_0 =
    address(0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2);

  function run() external {
    GnosisProxyFactory proxy = GnosisProxyFactory(
      GNOSIS_L1_PROXY_FACTORY_ADDRESS_1_3_0
    );
    vm.startBroadcast();
    proxy.createProxyWithNonce(
      GNOSIS_L1_SINGLETON_ADDRESS_1_3_0,
      abi.encodeWithSignature(
        "setup(address[],uint256,address,bytes,address,address,uint256,address)",
        [address(0)],
        1,
        address(0),
        0x0,
        address(0),
        address(0),
        0,
        address(0)
      ),
      0
    );
    vm.stopBroadcast();
  }
}
