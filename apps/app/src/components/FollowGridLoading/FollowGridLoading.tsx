import type { FC } from "react";

import { FollowCardLoading } from "@lightdotso/app/components/FollowCardLoading";

export type FollowGridLoadingProps = {
  number: number;
};

export const FollowGridLoading: FC<FollowGridLoadingProps> = ({ number }) => {
  return (
    <>
      {[...Array(number)].map((value, key) => {
        return <FollowCardLoading key={key} />;
      })}
    </>
  );
};
