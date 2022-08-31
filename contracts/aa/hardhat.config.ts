import fs, { readFileSync } from "fs";

import { TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS } from "hardhat/builtin-tasks/task-names";
import type { HardhatUserConfig } from "hardhat/config";
import { subtask } from "hardhat/config";
import "hardhat-preprocessor";

import * as toml from "toml";

subtask(TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS).setAction(
  async (_, __, runSuper) => {
    const paths = await runSuper();

    return paths.filter((p: any) => {
      return !p.endsWith(".t.sol");
    });
  },
);

let foundry = toml.parse(readFileSync("../../foundry.toml").toString());

const getRemappings = () => {
  return fs
    .readFileSync("../../remappings.txt", "utf8")
    .split("\n")
    .filter(Boolean)
    .map(line => {
      return line.trim().split("=");
    });
};

const config: HardhatUserConfig = {
  solidity: {
    version: foundry?.profile?.default?.solc_version,
    settings: {
      optimizer: {
        enabled: foundry?.profile?.default?.optimizer || true,
        runs: foundry?.profile?.default?.optimizer_runs || 200,
      },
    },
  },
  defaultNetwork: "hardhat",
  paths: {
    root: "../..",
    artifacts: "contracts/aa/artifacts",
    cache: "contracts/aa/cache",
    sources: "contracts/aa/src",
  },
  preprocess: {
    eachLine: (hre: any) => {
      return {
        transform: (line: string) => {
          if (line.match(/^\s*import /i)) {
            getRemappings().forEach(([find, replace]) => {
              if (line.match(find)) {
                line = line.replace(find, replace);
              }
            });
          }
          return line;
        },
      };
    },
  },
};

export default config;
