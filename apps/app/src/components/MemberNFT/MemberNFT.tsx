import { SocialLinks } from "@lightdotso/const";
import Image from "next/image";
import type { FC } from "react";
import { useEffect, useRef } from "react";
import Tilt from "vanilla-tilt";

import CardImage from "@lightdotso/app/public/card.png";

export const MemberNFT: FC = () => {
  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ticketRef.current && !window.matchMedia("(pointer: coarse)").matches) {
      Tilt.init(ticketRef.current, {
        glare: true,
        max: 8,
        startY: 45,
        "max-glare": 0.24,
        "full-page-listening": true,
      });
    }
  }, [ticketRef]);

  return (
    <div
      ref={ticketRef}
      className="relative aspect-[1200/630] w-full rounded-2xl hover:animate-pulse"
    >
      <a
        className="rounded-xl"
        href={SocialLinks.Opensea}
        target="_blank"
        rel="noreferrer"
      >
        <Image
          className="cursor-pointer"
          placeholder="blur"
          src={CardImage}
          alt="Member NFT"
          layout="fill"
          objectFit="cover"
        />
      </a>
    </div>
  );
};
