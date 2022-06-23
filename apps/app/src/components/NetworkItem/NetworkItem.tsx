import type { Network } from "@lightdotso/types";
import clsx from "clsx";
import { m } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import type { FC, MouseEventHandler } from "react";

import s from "./NetworkItem.module.css";

import { NextImage } from "@lightdotso/app/components/NextImage";
import { ipfsAddress } from "@lightdotso/app/utils/ipfsAddress";
import { shortenName } from "@lightdotso/app/utils/shortenName";

export type NetworkItemProps = {
  className?: string;
  id: string;
  useBlur?: boolean;
  effect?: boolean;
  onMouseEnter?: MouseEventHandler<HTMLLIElement>;
  network: Network;
};

export const NetworkItem: FC<NetworkItemProps> = ({
  className,
  id,
  network,
  useBlur = true,
  effect = true,
  onMouseEnter,
}) => {
  const [isFallback, setIsFallback] = useState(false);

  if (!network) {
    return null;
  }

  const { id: networkId, src, name, type } = network;

  const item = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -10 },
  };

  return (
    <m.li
      className={className}
      id={id}
      style={{
        listStyle: "none",
        marginRight: "-5px",
      }}
      variants={item}
      whileHover={
        effect
          ? {
              scale: 1.2,
              marginRight: "5px",
              transition: { ease: "easeOut" },
            }
          : {}
      }
      onMouseEnter={onMouseEnter}
    >
      <Link passHref href={`/${type.toLowerCase()}/${networkId}`}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions  */}
        <a
          className={clsx(
            "flex overflow-hidden justify-center items-center w-12 h-12 text-3xl bg-bg-lighter hover:bg-contrast-lower rounded-full border-2 border-bg-darker cursor-pointer",
            s.transitionfix,
          )}
          onClick={e => {
            return e.stopPropagation();
          }}
        >
          {isFallback ? (
            <span className="text-sm font-semibold leading-none text-contrast-low">
              {shortenName(name ?? networkId)}
            </span>
          ) : src.includes("ipfs") ? (
            <NextImage
              useBlur={useBlur}
              height={48}
              width={48}
              src={ipfsAddress(src.substring(7))}
              alt={name ?? networkId}
              onError={() => {
                return setIsFallback(true);
              }}
            />
          ) : src.includes("https") ? (
            <NextImage
              useBlur={useBlur}
              height={48}
              width={48}
              src={src}
              alt={name ?? networkId}
              onError={() => {
                return setIsFallback(true);
              }}
            />
          ) : (
            <span className="text-sm font-semibold leading-none text-contrast-low">
              {shortenName(name ?? networkId)}
            </span>
          )}
        </a>
      </Link>
    </m.li>
  );
};
