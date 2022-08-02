// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.15;

import "forge-std/Test.sol";
import "@lightdotso/renderer/Renderer.sol";

contract RendererTest is Test {
  Renderer private renderer;

  function setUp() public {
    renderer = new Renderer();
  }

  function testRenderer() public {
    string memory hello = renderer.render(0, address(0), 0, 0, "");
    assertEq(hello, "Hello from renderer");
  }
}
