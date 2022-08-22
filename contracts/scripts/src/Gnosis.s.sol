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

contract GnosisScript is Script {
  address GNOSIS_PROXY_FACTORY_ADDRESS_1_3_0 =
    address(0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2);
  address GNOSIS_L1_SINGLETON_ADDRESS_1_3_0 =
    address(0xd9Db270c1B5E3Bd161E8c8503c55cEABeE709552);
  address GNOSIS_L2_SINGLETON_ADDRESS_1_3_0 =
    address(0x3E5c63644E683549055b9Be8653de26E0B4CD36E);

  function run() external {
    GnosisProxyFactory proxy = GnosisProxyFactory(
      GNOSIS_PROXY_FACTORY_ADDRESS_1_3_0
    );
    address[] memory owners = new address[](3);
    owners[0] = address(0xA5A7468f177d94212cd0FDC0886EE732155c47e9);
    owners[1] = address(0x4fd9D0eE6D6564E80A9Ee00c0163fC952d0A45Ed);
    owners[2] = address(0x8AEdf14E0b8D010521537cd0c16645452A7D39BC);

    vm.startBroadcast();
    if (block.chainid == 1) {
      proxy.createProxyWithNonce(
        GNOSIS_L1_SINGLETON_ADDRESS_1_3_0,
        abi.encodeWithSignature(
          "setup(address[],uint256,address,bytes,address,address,uint256,address)",
          owners,
          1,
          address(0),
          "",
          address(0),
          address(0),
          0,
          0
        ),
        0
      );
    } else {
      proxy.createProxyWithNonce(
        GNOSIS_L2_SINGLETON_ADDRESS_1_3_0,
        abi.encodeWithSignature(
          "setup(address[],uint256,address,bytes,address,address,uint256,address)",
          owners,
          1,
          address(0),
          "",
          address(0),
          address(0),
          0,
          0
        ),
        0
      );
    }
    vm.stopBroadcast();
  }
}
