import type { FC } from "react";

import { ModalNetworkListCard } from "@lightdotso/app/components/ModalNetworkListCard";
import { useNetworks } from "@lightdotso/app/hooks/useNetworks";

type ModalNetworkListProps = {
  address: string;
};

export const ModalNetworkList: FC<ModalNetworkListProps> = ({ address }) => {
  const { networks } = useNetworks(address);

  return (
    <ul className="mt-4 h-96 w-full divide-y divide-bg-dark overflow-y-scroll rounded-xl border border-contrast-lower">
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
