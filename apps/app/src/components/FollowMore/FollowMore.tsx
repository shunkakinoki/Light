import type { FC } from "react";

import type { MoreButtonProps } from "@lightdotso/app/components/MoreButton";
import { MoreButton } from "@lightdotso/app/components/MoreButton";

export type FollowMoreProps = MoreButtonProps;

export const FollowMore: FC<FollowMoreProps> = ({ children, onClick }) => {
  return (
    <ul className="mt-10 grid grid-cols-1 gap-6 md:mt-14 lg:grid-cols-3">
      <li className="col-span-1" />
      <MoreButton onClick={onClick}>{children}</MoreButton>
    </ul>
  );
};
