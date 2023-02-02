export const Apis = [
  "API",
  "API_STAGING",
  "CACHE",
  "CRON",
  "IMAGE",
  "ALCHEMY",
  "COVALENT",
  "CYBER_CONNECT",
  "ENS_GRAPH",
  "GALAXY",
  "OGP",
  "OPEN_SEA",
  "POAP",
  "POAP_GRAPH",
  "SNAPSHOT",
  "ZERION",
] as const;

export const ApiLinks: {
  readonly [key in typeof Apis[number]]: string;
} = {
  API: "https://api.light.so",
  API_STAGING: "https://staging.api.light.so",
  CACHE: "https://lightcache.net",
  CRON: "https://lightcron.net",
  IMAGE: "https://lightimage.net",
  ALCHEMY: "https://eth-mainnet.alchemyapi.io/v2/",
  COVALENT: "https://api.covalenthq.com/v1/",
  CYBER_CONNECT: "https://api.cybertino.io/connect/",
  ENS_GRAPH: "https://api.thegraph.com/subgraphs/name/ensdomains/ens",
  GALAXY: "https://graphigo.prd.galaxy.eco/query",
  OGP: "https://og.light.so/api/image?fileType=png&layoutName=Profile&Theme=Dark&Name",
  OPEN_SEA: "https://api.opensea.io/api/v1",
  POAP: "https://api.poap.tech",
  POAP_GRAPH: "https://api.thegraph.com/subgraphs/name/poap-xyz/poap-xdai",
  SNAPSHOT: "https://hub.snapshot.org/graphql",
  ZERION: "wss://api-v4.zerion.io/socket.io",
};
