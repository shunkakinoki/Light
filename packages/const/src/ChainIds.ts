import type { Network } from "./NetworkNames";

export const ChainIds: {
  readonly [key in Network]: number;
} = {
  MAINNET: 1,
  ROPSTEN: 3,
  RINKEBY: 4,
  GOERLI: 5,
  KOVAN: 42,
  OPTIMISM: 10,
  OPTIMISM_KOVAN: 69,
  POLYGON: 137,
  POLYGON_MUMBAI: 80_001,
  ARBITRUM: 42_161,
  ARBITRUM_RINKEBY: 421_611,
  LOCALHOST: 1_337,
  HARDHAT: 31_337,
};
