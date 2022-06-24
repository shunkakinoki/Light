import type { MouseEventHandler, FC } from "react";

import { MoreButton } from "@lightdotso/app/components/MoreButton";
import { NetworkPeopleListLoading } from "@lightdotso/app/components/NetworkPeopleListLoading";

export type NetworkPeopleListBaseProps = {
  isLoadingInitial: boolean;
  isEnd: boolean;
  isLoadingMore: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const NetworkPeopleListBase: FC<NetworkPeopleListBaseProps> = ({
  children,
  isEnd,
  isLoadingInitial,
  isLoadingMore,
  onClick,
}) => {
  return (
    <div className="py-8 px-3">
      <ul className="flex overflow-visible flex-col space-y-2.5 w-full">
        {isLoadingInitial && <NetworkPeopleListLoading />} {children}
      </ul>
      {!isEnd && (
        <ul className="grid grid-cols-1 lg:grid-cols-7 gap-6 mt-8">
          <li className="col-span-2" />
          <MoreButton
            disabled={isLoadingMore || isEnd}
            className="col-span-3"
            onClick={onClick}
          >
            {isLoadingMore ? "Loading..." : "Load more"}
          </MoreButton>
        </ul>
      )}
    </div>
  );
};
