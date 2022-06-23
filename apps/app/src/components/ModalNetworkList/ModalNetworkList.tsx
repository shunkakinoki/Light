import type { FC } from "react";

import { ModalNetworkListCard } from "@lightdotso/app/components/ModalNetworkListCard";
import { useNetworks } from "@lightdotso/app/hooks/useNetworks";

type ModalNetworkListProps = {
  address: string;
};

export const ModalNetworkList: FC<ModalNetworkListProps> = ({ address }) => {
  const { networks } = useNetworks(address);

  return (
    <ul className="overflow-y-scroll mt-4 w-full h-96 rounded-xl border border-contrast-lower divide-y divide-bg-dark">
      {networks &&
        typeof networks[0] !== "undefined" &&
        networks.map((network, id) => {
          return (
            <ModalNetworkListCard
              key={id}
              id={id.toString()}
              network={network}
            />
          );
        })}
    </ul>
  );
};
