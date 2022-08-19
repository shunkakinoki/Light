import clsx from "clsx";
import type { FC } from "react";

import s from "./ProfileBoardItemNFT.module.css";

import type { BaseNFTProps } from "@lightdotso/app/components/BaseNFT";
import { BaseNFT } from "@lightdotso/app/components/BaseNFT";
import type { ProfileBoardItemProps } from "@lightdotso/app/components/ProfileBoardItem";
import { ProfileBoardItem } from "@lightdotso/app/components/ProfileBoardItem";
import { useDrawerAsset } from "@lightdotso/app/hooks/useDrawerAsset";

export type ProfileBoardItemNFTProps = ProfileBoardItemProps & BaseNFTProps;

export const ProfileBoardItemNFT: FC<ProfileBoardItemNFTProps> = ({
  className,
  asset,
}) => {
  const { setDrawerAssetState } = useDrawerAsset();

  const {
    asset_contract: { address },
    token_id,
  } = asset;

  return (
    <ProfileBoardItem
      className={clsx(className, "bg-transparent", s.transitionfix)}
    >
      <button
        onClick={() => {
          setDrawerAssetState({
            address: address,
            id: token_id,
            type: "NFT",
            url: `/asset/nft/${address}/${token_id}`,
            open: true,
            show: false,
          });
        }}
      >
        <BaseNFT asset={asset} />
      </button>
    </ProfileBoardItem>
  );
};
