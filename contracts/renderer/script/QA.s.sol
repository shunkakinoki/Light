// SPDX-License-Identifier: MIT
// Code from: https://github.com/jameswenzel/hot-chain-svg/blob/main/script/qa.s.sol

pragma solidity ^0.8.13;

import { Script, console } from "forge-std/Script.sol";
import { Strings } from "@openzeppelin/contracts/utils/Strings.sol";
import { LightOrbRenderer } from "@lightdotso/renderer/LightOrbRenderer.sol";

interface IRenderer {
  function render(uint256 _tokenId) external view returns (string memory);
}

contract QA is Script {
  using Strings for uint256;

  function deployAndConfigureRenderer()
    internal
    virtual
    returns (LightOrbRenderer)
  {
    return new LightOrbRenderer();
  }

  function run() public {
    run(100_000_000, 100_000_001);
  }

  function run(uint256 start, uint256 stop) public {
    LightOrbRenderer renderer = deployAndConfigureRenderer();

    string[] memory args = new string[](3);

    args[0] = "mkdir";
    args[1] = "-p";
    args[2] = "./qa";
    vm.ffi(args);

    args[0] = "sh";
    args[1] = "-c";
    for (uint256 i = start; i < stop; i++) {
      string memory output = renderer.renderRaw(i, msg.sender, 0);
      string[] memory subCommandInputs = new string[](4);
      subCommandInputs[0] = "echo '";
      subCommandInputs[1] = output;
      subCommandInputs[2] = "' > ";
      string memory path = string.concat("./qa/", i.toString(), ".svg");
      subCommandInputs[3] = path;
      args[2] = string.concat(
        subCommandInputs[0],
        subCommandInputs[1],
        subCommandInputs[2],
        subCommandInputs[3]
      );
      vm.ffi(args);

      subCommandInputs[0] = "(xmllint ";
      subCommandInputs[1] = path;
      subCommandInputs[2] = ' 2>&1 >/dev/null) > error.txt; echo "0x0$?"';
      args[2] = string.concat(
        subCommandInputs[0],
        subCommandInputs[1],
        subCommandInputs[2]
      );
      bytes memory result = vm.ffi(args);

      bytes1 exitCode = result[0];
      if (exitCode != 0x00) {
        subCommandInputs[0] = 'cast abi-encode "response(bytes)" $((xmllint ';
        subCommandInputs[1] = path;
        subCommandInputs[2] = " 2>&1 >/dev/null) | xxd -p -c 1000000)";
        args[2] = string.concat(
          subCommandInputs[0],
          subCommandInputs[1],
          subCommandInputs[2]
        );
        bytes memory errorStr = vm.ffi(args);
        string memory revertMessage = string.concat(
          "Validation for ",
          i.toString(),
          ".svg failed with exit code ",
          uint256(uint8(exitCode)).toString(),
          ". Error:\n",
          string(errorStr),
          "\nThis error message has been saved to ./error.txt"
        );
        revert(revertMessage);
      }
    }
  }
}
