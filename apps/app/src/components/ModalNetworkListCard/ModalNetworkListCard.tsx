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
        className="group flex w-full items-center bg-bg-lighter py-3 px-4 hover:bg-emphasis-high"
        onClick={e => {
          e.stopPropagation();
          setModalNetworkState({ ...modalNetworkState, open: false });
        }}
      >
        <NetworkItem id={id} network={network} effect={false} />
        <div className="grow text-ellipsis pl-8 text-lg font-semibold text-contrast-higher line-clamp-3 group-hover:text-contrast-high">
          {name}
        </div>
        <div className="ml-3 shrink-0 text-contrast-medium">
          {count?.toLocaleString()} People
        </div>
      </a>
    </Link>
  );
};
