/// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import "forge-std/Test.sol";
import "@lightdotso/deployer/LightControllerDeployerScript.s.sol";

contract LightControllerDeployerScriptForkTest is Test {
  LightControllerDeployerScript script;

  function setUp() public {
    string memory GOERLI_RPC_URL = vm.envString("GOERLI_RPC_URL");
    vm.createSelectFork(GOERLI_RPC_URL);
    script = new LightControllerDeployerScript();
  }

  function testForkRun() public {
    script.run();
  }
}
