import type { FC } from "react";

import { splitAddress } from "@lightdotso/app/utils/splitAddress";

export type AssetDetailsSegmentMetaProps = {
  address: string;
  contractAddress: string;
  tokenId: string;
};

export const AssetDetailsSegmentMeta: FC<AssetDetailsSegmentMetaProps> = ({
  address,
  contractAddress,
  tokenId,
}) => {
  return (
    <div className="mt-8">
      <div className="text-sm font-normal leading-5 text-contrast-high">
        Owned by
      </div>
      <a
        href={address ? `https://etherscan.io/address/${address}` : ""}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 overflow-hidden text-lg font-semibold leading-8 text-contrast-higher hover:underline"
      >
        {address ? splitAddress(address) : ""}
      </a>
      <div className="mt-4 text-sm font-normal leading-5 text-contrast-high">
        Created by
      </div>
      <a
        href={
          contractAddress
            ? `https://etherscan.io/address/${contractAddress}`
            : ""
        }
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 overflow-hidden text-lg font-semibold leading-8 text-contrast-higher hover:underline"
      >
        {contractAddress ? splitAddress(contractAddress) : ""}
      </a>
      <div className="mt-4 text-sm font-normal leading-5 text-contrast-high">
        Token ID
      </div>
      <div className="mt-2 text-lg font-semibold leading-8 text-contrast-higher">
        {tokenId?.length > 9 ? splitAddress(tokenId) : tokenId}
      </div>
    </div>
  );
};
