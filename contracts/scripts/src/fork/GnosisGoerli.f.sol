// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

import "forge-std/Test.sol";
import "@lightdotso/scripts/Gnosis.s.sol";

contract GnosisGoerliTest is Test {
  GnosisScript script;

  function setUp() public {
    vm.chainId(5);
    string memory GOERLI_RPC_URL = vm.envString("GOERLI_RPC_URL");
    vm.createSelectFork(GOERLI_RPC_URL);

    script = new GnosisScript();
  }

  function testForkRun() public {
    vm.activeFork();
    script.run();
    assertEq(script.safeL2().getChainId(), 31337);
  }
}
