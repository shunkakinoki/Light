import clsx from "clsx";
import type { FC } from "react";

import s from "./ProfileBoardItemOAT.module.css";

import type { BaseOATProps } from "@lightdotso/app/components/BaseOAT";
import { BaseOAT } from "@lightdotso/app/components/BaseOAT";
import type { ProfileBoardItemProps } from "@lightdotso/app/components/ProfileBoardItem";
import { ProfileBoardItem } from "@lightdotso/app/components/ProfileBoardItem";
import { useModalAsset } from "@lightdotso/app/hooks/useModalAsset";

export type ProfileBoardItemOATProps = ProfileBoardItemProps &
  BaseOATProps & { oatId: string };

export const ProfileBoardItemOAT: FC<ProfileBoardItemOATProps> = ({
  className,
  oat,
  oatId,
}) => {
  const { setModalAssetState } = useModalAsset();

  return (
    <ProfileBoardItem
      className={clsx(className, "bg-transparent", s.transitionfix)}
    >
      <button
        onClick={() => {
          setModalAssetState({
            src: `/asset/oat/${oatId}`,
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
