import { UserIcon } from "@heroicons/react/24/solid";
import type { FC } from "react";

export const FollowCardProofLoading: FC = () => {
  return (
    <div className="-mt-px flex items-center">
      <UserIcon className="mr-2 h-5 w-5 text-contrast-low" />
      <div className="h-3 w-32 overflow-hidden rounded-md bg-emphasis-medium" />
    </div>
  );
};
