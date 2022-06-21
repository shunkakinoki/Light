import type { FC } from "react";

import { NetworkPeopleListCardLoading } from "@lightdotso/app/components/NetworkPeopleListCardLoading";
import { NETWORK_PEOPLE_QUERY_NUMBER } from "@lightdotso/app/config/Query";

export const NetworkPeopleListLoading: FC = () => {
  return (
    <>
      {[...Array(NETWORK_PEOPLE_QUERY_NUMBER)].map((value, key) => {
        return <NetworkPeopleListCardLoading key={key} />;
      })}
    </>
  );
};
