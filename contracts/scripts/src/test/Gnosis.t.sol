// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "forge-std/Test.sol";

contract GnosisTest is Test {
  function testFailInitializer() public {
    bytes memory sig = abi.encodeWithSignature(
      "setup(address[],uint256,address,bytes,address,address,uint256,address)",
      [address(this)],
      1,
      address(0),
      0x0,
      address(0),
      address(0),
      0,
      address(0)
    );
    bytes memory expected = bytes("");
    assertEq(sig, expected);
  }
}
