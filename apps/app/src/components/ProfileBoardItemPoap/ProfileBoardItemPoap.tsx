import clsx from "clsx";
import Link from "next/link";
import type { FC } from "react";

import s from "./ProfileBoardItemPoap.module.css";

import type { BasePoapProps } from "@lightdotso/app/components/BasePoap";
import { BasePoap } from "@lightdotso/app/components/BasePoap";
import type { ProfileBoardItemProps } from "@lightdotso/app/components/ProfileBoardItem";
import { ProfileBoardItem } from "@lightdotso/app/components/ProfileBoardItem";

export type ProfileBoardItemPoapProps = ProfileBoardItemProps &
  BasePoapProps & { tokenId: string };

export const ProfileBoardItemPoap: FC<ProfileBoardItemPoapProps> = ({
  className,
  event,
  tokenId,
}) => {
  return (
    <ProfileBoardItem
      className={clsx(className, "bg-transparent", s.transitionfix)}
    >
      <Link passHref href={`/asset/poap/${tokenId}`}>
        <a>
          <BasePoap event={event} />
        </a>
      </Link>
    </ProfileBoardItem>
  );
};
