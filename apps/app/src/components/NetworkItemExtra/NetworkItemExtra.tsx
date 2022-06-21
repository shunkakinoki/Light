import { m } from "framer-motion";
import type { FC, MouseEventHandler } from "react";

import { NETWORK_STACK_NUMBER } from "@lightdotso/app/config/Networks";

import { useModalNetwork } from "@lightdotso/app/hooks/useModalNetwork";

export type NetworkItemExtraProps = {
  address: string;
  id: string;
  length: number;
  onMouseEnter: MouseEventHandler<HTMLLIElement>;
};

export const NetworkItemExtra: FC<NetworkItemExtraProps> = ({
  address,
  id,
  length,
  onMouseEnter,
}) => {
  const { setModalNetworkState } = useModalNetwork();

  const item = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -10 },
  };

  return (
    <m.li
      id={id}
      style={{
        listStyle: "none",
        marginRight: "-10px",
      }}
      variants={item}
      whileHover={{
        scale: 1.2,
        marginRight: "5px",
        transition: { ease: "easeOut" },
      }}
      onMouseEnter={onMouseEnter}
    >
      <button
        className="mr-1.5 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-bg-darker bg-bg-lighter text-base font-extrabold text-contrast-high hover:bg-bg-light hover:text-contrast-higher"
        onClick={e => {
          e.stopPropagation();
          setModalNetworkState({ address: address, open: true });
        }}
      >
        <span>+{length - NETWORK_STACK_NUMBER}</span>
      </button>
    </m.li>
  );
};
