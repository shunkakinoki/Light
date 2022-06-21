import type { FC } from "react";

import { FollowGridRecommendations } from "@lightdotso/app/components/FollowGridRecommendations";
import { DEAD_WALLET_ADDRESS } from "@lightdotso/app/config/Default";
import { useWallet } from "@lightdotso/app/hooks/useWallet";

export const FollowGrid: FC = () => {
  const { address } = useWallet();

  return (
    <>
      <FollowGridRecommendations address={address || DEAD_WALLET_ADDRESS} />
    </>
  );
};
