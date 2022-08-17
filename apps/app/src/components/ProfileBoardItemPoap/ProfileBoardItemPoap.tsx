import clsx from "clsx";
import type { FC } from "react";

import s from "./ProfileBoardItemPoap.module.css";

import type { BasePoapProps } from "@lightdotso/app/components/BasePoap";
import { BasePoap } from "@lightdotso/app/components/BasePoap";
import type { ProfileBoardItemProps } from "@lightdotso/app/components/ProfileBoardItem";
import { ProfileBoardItem } from "@lightdotso/app/components/ProfileBoardItem";
import { useModalAsset } from "@lightdotso/app/hooks/useModalAsset";

export type ProfileBoardItemPoapProps = ProfileBoardItemProps &
  BasePoapProps & { tokenId: string };

export const ProfileBoardItemPoap: FC<ProfileBoardItemPoapProps> = ({
  className,
  event,
  tokenId,
}) => {
  const { setModalAssetState } = useModalAsset();

  return (
    <ProfileBoardItem
      className={clsx(className, "bg-transparent", s.transitionfix)}
    >
      <button
        onClick={() => {
          setModalAssetState({
            src: `/asset/poap/${tokenId}`,
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
