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
      <ul className="flex w-full flex-col space-y-2.5 overflow-visible">
        {isLoadingInitial && <NetworkPeopleListLoading />} {children}
      </ul>
      {!isEnd && (
        <ul className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-7">
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
