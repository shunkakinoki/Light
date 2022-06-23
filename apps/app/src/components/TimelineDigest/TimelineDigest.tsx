/* eslint-disable tailwindcss/no-custom-classname */

import { UserGroupIcon } from "@heroicons/react/solid";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IconPoap, IconNFT, IconDAO, IconTokens } from "@lightdotso/core";
import type { TimelineItem } from "@lightdotso/types";
import type { CategoryType } from "@prisma/client";
import clsx from "clsx";
import type { FC, SVGProps } from "react";

export type TimelineDigestProps = Pick<TimelineItem, "category">;

const navigation: Array<{
  name: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  category: CategoryType | "ALL";
}> = [
  {
    name: "NFT",
    icon: IconNFT,
    category: "NFT",
  },
  {
    name: "DAO",
    icon: IconDAO,
    category: "DAO",
  },
  {
    name: "Social",
    icon: UserGroupIcon,
    category: "SOCIAL",
  },
];

export const TimelineDigest: FC<TimelineDigestProps> = ({ category }) => {
  const first = navigation.find(item => {
    return item.category === category;
  });

  return (
    <div className="flex pt-3 md:pt-4">
      <div
        className={clsx(
          "flex items-center py-1 px-2.5 text-sm md:text-base rounded-full",
          category === "NFT" && "bg-[#DB61A2] bg-opacity-[0.15]",
          category === "DAO" && "bg-[#FFC328] bg-opacity-[0.15]",
          category === "SOCIAL" && "bg-[#4D7FFF] bg-opacity-[0.15]",
        )}
      >
        <first.icon
          className={clsx(
            "shrink-0 w-4 h-4 opacity-100",
            category === "NFT" && "fill-[#DB61A2]",
            category === "DAO" && "fill-[#FFC328]",
            category === "SOCIAL" && "fill-[#4D7FFF]",
          )}
          aria-hidden="true"
        />
        &nbsp;
        <span
          className={clsx(
            "text-xs font-bold opacity-100",
            category === "NFT" && "text-[#DB61A2]",
            category === "DAO" && "text-[#FFC328]",
            category === "SOCIAL" && "text-[#4D7FFF]",
          )}
        >
          {first.name}
        </span>
      </div>
    </div>
  );
};
