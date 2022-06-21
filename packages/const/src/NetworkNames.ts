export enum NetworkNamesEnum {
  ARBITRUM = "Arbitrum",
  ARBITRUM_RINKEBY = "Arbitrum Rinkeby",
  GOERLI = "Goerli",
  HARDHAT = "Hardhat",
  KOVAN = "Kovan",
  LOCALHOST = "Localhost",
  MAINNET = "Mainnet",
  OPTIMISM = "Optimism",
  OPTIMISM_KOVAN = "Optimism Kovan",
  POLYGON = "Polygon",
  POLYGON_MUMBAI = "Polygon Mumbai",
  RINKEBY = "Rinkeby",
  ROPSTEN = "Ropsten",
}

export const NetworkNames = { ...NetworkNamesEnum };
export type Network = keyof typeof NetworkNamesEnum;
