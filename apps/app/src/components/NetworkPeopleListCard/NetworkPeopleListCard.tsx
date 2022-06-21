import type { FC } from "react";

import type { FollowListCardProps } from "@lightdotso/app/components/FollowListCard";
import { FollowListCard } from "@lightdotso/app/components/FollowListCard";

export const NetworkPeopleListCard: FC<FollowListCardProps> = ({
  id,
  address,
}) => {
  return <FollowListCard id={id} address={address} />;
};
