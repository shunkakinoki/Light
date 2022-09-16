/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import "forge-std/Test.sol";
import "@lightdotso/deployer/LightOrbDeployerScript.s.sol";

contract LightOrbDeployerScriptForkTest is Test {
  LightOrbDeployerScript script;

  function setUp() public {
    string memory GOERLI_RPC_URL = vm.envString("GOERLI_RPC_URL");
    vm.createSelectFork(GOERLI_RPC_URL);
    script = new LightOrbDeployerScript();
  }

  function testForkRun() public {
    script.run();
  }
}
