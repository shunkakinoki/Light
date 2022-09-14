/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import "forge-std/Test.sol";
import "@lightdotso/deployer/LightDeployerScript.s.sol";

contract LightDeployerScriptTest is Test {
  LightDeployerScript script;

  function setUp() public {
    script = new LightDeployerScript();
  }
}
