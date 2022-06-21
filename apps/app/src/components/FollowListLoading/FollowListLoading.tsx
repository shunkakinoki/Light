import type { FC } from "react";

import { FollowListCardLoading } from "@lightdotso/app/components/FollowListCardLoading";
import { FOLLOW_QUERY_NUMBER } from "@lightdotso/app/config/Query";

export const FollowListLoading: FC = () => {
  return (
    <>
      {[...Array(FOLLOW_QUERY_NUMBER)].map((value, key) => {
        return <FollowListCardLoading key={key} />;
      })}
    </>
  );
};
