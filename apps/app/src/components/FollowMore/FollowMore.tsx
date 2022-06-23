import type { FC } from "react";

import type { MoreButtonProps } from "@lightdotso/app/components/MoreButton";
import { MoreButton } from "@lightdotso/app/components/MoreButton";

export type FollowMoreProps = MoreButtonProps;

export const FollowMore: FC<FollowMoreProps> = ({ children, onClick }) => {
  return (
    <ul className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10 md:mt-14">
      <li className="col-span-1" />
      <MoreButton onClick={onClick}>{children}</MoreButton>
    </ul>
  );
};
