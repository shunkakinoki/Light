// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;
import "forge-std/Test.sol";

contract Utils is Test {
  function detectSlots(address targetAddress) public {
    for (uint256 _i = 0; _i < type(uint256).max; _i++) {
      bytes32 proxySlot = vm.load(address(targetAddress), bytes32(uint256(_i)));
      bytes32 target;
      assembly {
        mstore(0, proxySlot)
        target := mload(0)
      }
      if (target != bytes32(uint256(0))) {
        console.log(_i);
        console2.logBytes32(target);
      }
    }
  }

  function consoleLogInterfaceId() public {
    // console2.logBytes4(type(ILightOperatable).interfaceId);
  }
}
