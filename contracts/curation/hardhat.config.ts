import defaultConfig from "@lightdotso/hardhat-config";
import type { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  ...defaultConfig,
  paths: {
    root: "../..",
    sources: "contracts/curation/src",
    tests: "contracts/curation/spec",
  },
};

export default config;
