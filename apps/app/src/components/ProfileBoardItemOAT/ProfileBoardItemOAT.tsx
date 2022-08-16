import clsx from "clsx";
import Link from "next/link";
import type { FC } from "react";

import s from "./ProfileBoardItemOAT.module.css";

import type { BaseOATProps } from "@lightdotso/app/components/BaseOAT";
import { BaseOAT } from "@lightdotso/app/components/BaseOAT";
import type { ProfileBoardItemProps } from "@lightdotso/app/components/ProfileBoardItem";
import { ProfileBoardItem } from "@lightdotso/app/components/ProfileBoardItem";

export type ProfileBoardItemOATProps = ProfileBoardItemProps &
  BaseOATProps & { oatId: string };

export const ProfileBoardItemOAT: FC<ProfileBoardItemOATProps> = ({
  className,
  oat,
  oatId,
}) => {
  return (
    <ProfileBoardItem
      className={clsx(className, "bg-transparent", s.transitionfix)}
    >
      <Link passHref href={`/asset/oat/${oatId}`}>
        <a>
          <BaseOAT oat={oat} />
        </a>
      </Link>
    </ProfileBoardItem>
  );
};
