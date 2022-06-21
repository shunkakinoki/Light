import { UserIcon } from "@heroicons/react/solid";
import type { FC } from "react";

export type FollowCardProofProps = {
  recommendationReason: string;
};
export const FollowCardProof: FC<FollowCardProofProps> = ({
  recommendationReason,
}) => {
  return (
    <div className="-mt-px flex items-center">
      <UserIcon className="mr-2 h-5 w-5 text-contrast-low" />
      <p className="truncate text-sm text-contrast-low">
        {recommendationReason}
      </p>
    </div>
  );
};
