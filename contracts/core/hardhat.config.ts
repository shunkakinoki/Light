import defaultConfig from "@lightdotso/hardhat-config";
import type { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  ...defaultConfig,
  paths: {
    root: "../..",
    sources: "contracts/core/src",
    tests: "contracts/core/spec",
  },
};

export default config;
