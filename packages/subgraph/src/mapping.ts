/* eslint-disable no-restricted-imports */
/* eslint-disable @typescript-eslint/consistent-type-imports */

import { NFT as GeneratedNFT, Transfer } from "../generated/NFT/NFT";
import { NFT } from "../generated/schema";

export const handleTransfer = (event: Transfer): void => {
  const contract = GeneratedNFT.bind(event.address);

  const nft = new NFT(event.params.tokenId.toString());
  nft.owner = event.params.to;
  nft.tokenURI = contract.tokenURI(event.params.tokenId);
  nft.save();
};
