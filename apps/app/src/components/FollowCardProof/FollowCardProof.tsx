import { UserIcon } from "@heroicons/react/solid";
import type { FC } from "react";

export type FollowCardProofProps = {
  recommendationReason: string;
};
export const FollowCardProof: FC<FollowCardProofProps> = ({
  recommendationReason,
}) => {
  return (
    <div className="flex items-center -mt-px">
      <UserIcon className="mr-2 w-5 h-5 text-contrast-low" />
      <p className="text-sm text-contrast-low truncate">
        {recommendationReason}
      </p>
    </div>
  );
};
