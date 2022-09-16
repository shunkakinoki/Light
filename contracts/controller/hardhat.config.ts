import defaultConfig from "@lightdotso/hardhat-config";
import type { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  ...defaultConfig,
  paths: {
    root: "../..",
    sources: "contracts/controller/src",
    tests: "contracts/controller/spec",
  },
};

export default config;
