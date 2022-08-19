import clsx from "clsx";
import type { FC } from "react";

import s from "./ProfileBoardItemOAT.module.css";

import type { BaseOATProps } from "@lightdotso/app/components/BaseOAT";
import { BaseOAT } from "@lightdotso/app/components/BaseOAT";
import type { ProfileBoardItemProps } from "@lightdotso/app/components/ProfileBoardItem";
import { ProfileBoardItem } from "@lightdotso/app/components/ProfileBoardItem";
import { useDrawerAsset } from "@lightdotso/app/hooks/useDrawerAsset";

export type ProfileBoardItemOATProps = ProfileBoardItemProps &
  BaseOATProps & { oatId: string };

export const ProfileBoardItemOAT: FC<ProfileBoardItemOATProps> = ({
  className,
  oat,
  oatId,
}) => {
  const { setDrawerAssetState } = useDrawerAsset();

  return (
    <ProfileBoardItem
      className={clsx(className, "bg-transparent", s.transitionfix)}
    >
      <button
        onClick={() => {
          setDrawerAssetState({
            id: oatId,
            type: "OAT",
            url: `/asset/oat/${oatId}`,
            open: true,
            show: false,
          });
        }}
      >
        <BaseOAT oat={oat} />
      </button>
    </ProfileBoardItem>
  );
};
