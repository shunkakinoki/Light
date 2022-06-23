import type { FC } from "react";

import type { FollowCardBannerProps } from "@lightdotso/app/components/FollowCardBanner";
import { FollowCardBanner } from "@lightdotso/app/components/FollowCardBanner";
import type { FollowCardProofProps } from "@lightdotso/app/components/FollowCardProof";
import { FollowCardProof } from "@lightdotso/app/components/FollowCardProof";
import type { NetworkStackProps } from "@lightdotso/app/components/NetworkStack";
import { NetworkStack } from "@lightdotso/app/components/NetworkStack";

type FollowCardProps = FollowCardBannerProps &
  FollowCardProofProps &
  NetworkStackProps;

export const FollowCard: FC<FollowCardProps> = ({
  address,
  recommendationReason,
  id,
}) => {
  return (
    <li className="col-span-1 p-4 bg-bg-lighter rounded-lg border border-contrast-lower shadow">
      <FollowCardBanner address={address} />
      <div className="flex overflow-x-scroll overflow-y-visible items-center py-4 space-x-2">
        <NetworkStack max address={address} id={id} />
      </div>
      <FollowCardProof recommendationReason={recommendationReason} />
    </li>
  );
};
