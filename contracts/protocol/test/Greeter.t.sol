// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.15;

import "forge-std/Test.sol";
import "../Greeter.sol";

contract GreeterTest is Test {
  Greeter private greeter;

  function setUp() public {
    greeter = new Greeter("Hello World");
  }

  function testGreetIsHelloWorld() public {
    string memory greet = greeter.greet();
    assertEq(bytes32(bytes(greet)), bytes32(bytes("Hello World")));
  }

  function testSetGreetingIsNewWorld() public {
    greeter.setGreeting("New World");
    string memory greet = greeter.greet();
    assertEq(bytes32(bytes(greet)), bytes32(bytes("New World")));
  }
}
