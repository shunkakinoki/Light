import defaultConfig from "@lightdotso/hardhat-config";
import type { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  ...defaultConfig,
  paths: {
    root: "../..",
    sources: "contracts/credentials/src",
    tests: "contracts/credentials/spec",
  },
};

export default config;
