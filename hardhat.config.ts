import type { HardhatUserConfig } from "hardhat/config";

import "@matterlabs/hardhat-zksync-deploy";
import defaultConfig from "@lightdotso/hardhat-config";

const config: HardhatUserConfig = {
  ...defaultConfig,
  zkSyncDeploy: {
    zkSyncNetwork: "https://zksync2-testnet.zksync.dev",
    ethNetwork: "goerli",
  },
};

export default config;
