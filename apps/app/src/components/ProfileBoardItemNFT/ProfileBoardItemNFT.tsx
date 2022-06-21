import clsx from "clsx";
import Link from "next/link";
import type { FC } from "react";

import s from "./ProfileBoardItemNFT.module.css";

import type { BaseNFTProps } from "@lightdotso/app/components/BaseNFT";
import { BaseNFT } from "@lightdotso/app/components/BaseNFT";
import type { ProfileBoardItemProps } from "@lightdotso/app/components/ProfileBoardItem";
import { ProfileBoardItem } from "@lightdotso/app/components/ProfileBoardItem";

export type ProfileBoardItemNFTProps = ProfileBoardItemProps & BaseNFTProps;

export const ProfileBoardItemNFT: FC<ProfileBoardItemNFTProps> = ({
  className,
  asset,
}) => {
  const {
    asset_contract: { address },
    token_id,
  } = asset;

  return (
    <ProfileBoardItem
      className={clsx(className, "bg-transparent", s.transitionfix)}
    >
      <Link passHref href={`/asset/nft/${address}/${token_id}`}>
        <a>
          <BaseNFT asset={asset} />
        </a>
      </Link>
    </ProfileBoardItem>
  );
};
