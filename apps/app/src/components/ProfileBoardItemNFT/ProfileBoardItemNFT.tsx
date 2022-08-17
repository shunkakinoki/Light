import clsx from "clsx";
import type { FC } from "react";

import s from "./ProfileBoardItemNFT.module.css";

import type { BaseNFTProps } from "@lightdotso/app/components/BaseNFT";
import { BaseNFT } from "@lightdotso/app/components/BaseNFT";
import type { ProfileBoardItemProps } from "@lightdotso/app/components/ProfileBoardItem";
import { ProfileBoardItem } from "@lightdotso/app/components/ProfileBoardItem";
import { useModalAsset } from "@lightdotso/app/hooks/useModalAsset";

export type ProfileBoardItemNFTProps = ProfileBoardItemProps & BaseNFTProps;

export const ProfileBoardItemNFT: FC<ProfileBoardItemNFTProps> = ({
  className,
  asset,
}) => {
  const { setModalAssetState } = useModalAsset();

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
          setModalAssetState({
            src: `/asset/nft/${address}/${token_id}`,
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
