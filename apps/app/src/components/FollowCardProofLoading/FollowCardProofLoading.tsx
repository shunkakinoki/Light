import { UserIcon } from "@heroicons/react/solid";
import type { FC } from "react";

export const FollowCardProofLoading: FC = () => {
  return (
    <div className="flex items-center -mt-px">
      <UserIcon className="mr-2 w-5 h-5 text-contrast-low" />
      <div className="overflow-hidden w-32 h-3 bg-emphasis-medium rounded-md" />
    </div>
  );
};
