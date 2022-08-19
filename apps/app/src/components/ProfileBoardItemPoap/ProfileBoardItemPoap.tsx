import clsx from "clsx";
import type { FC } from "react";

import s from "./ProfileBoardItemPoap.module.css";

import type { BasePoapProps } from "@lightdotso/app/components/BasePoap";
import { BasePoap } from "@lightdotso/app/components/BasePoap";
import type { ProfileBoardItemProps } from "@lightdotso/app/components/ProfileBoardItem";
import { ProfileBoardItem } from "@lightdotso/app/components/ProfileBoardItem";
import { useDrawerAsset } from "@lightdotso/app/hooks/useDrawerAsset";

export type ProfileBoardItemPoapProps = ProfileBoardItemProps &
  BasePoapProps & { tokenId: string };

export const ProfileBoardItemPoap: FC<ProfileBoardItemPoapProps> = ({
  className,
  event,
  tokenId,
}) => {
  const { setDrawerAssetState } = useDrawerAsset();

  return (
    <ProfileBoardItem
      className={clsx(className, "bg-transparent", s.transitionfix)}
    >
      <button
        onClick={() => {
          setDrawerAssetState({
            id: tokenId,
            type: "POAP",
            open: true,
            show: false,
          });
        }}
      >
        <BasePoap event={event} />
      </button>
    </ProfileBoardItem>
  );
};
