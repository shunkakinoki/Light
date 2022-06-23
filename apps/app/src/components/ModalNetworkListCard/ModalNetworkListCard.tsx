/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */

import Link from "next/link";
import type { FC } from "react";

import type { NetworkItemProps } from "@lightdotso/app/components/NetworkItem";
import { NetworkItem } from "@lightdotso/app/components/NetworkItem";
import { useModalNetwork } from "@lightdotso/app/hooks/useModalNetwork";

export type ModalNetworkListCardProps = NetworkItemProps;

export const ModalNetworkListCard: FC<ModalNetworkListCardProps> = ({
  id,
  network,
}) => {
  const { modalNetworkState, setModalNetworkState } = useModalNetwork();

  if (!network) {
    return;
  }

  const { type, id: networkId, name, count } = network;

  return (
    <Link passHref href={`/${type.toLowerCase()}/${networkId}`}>
      <a
        className="group flex items-center py-3 px-4 w-full bg-bg-lighter hover:bg-emphasis-high"
        onClick={e => {
          e.stopPropagation();
          setModalNetworkState({ ...modalNetworkState, open: false });
        }}
      >
        <NetworkItem id={id} network={network} effect={false} />
        <div className="grow pl-8 text-lg font-semibold text-contrast-higher group-hover:text-contrast-high text-ellipsis line-clamp-3">
          {name}
        </div>
        <div className="shrink-0 ml-3 text-contrast-medium">
          {count?.toLocaleString()} People
        </div>
      </a>
    </Link>
  );
};
