import type { SnapshotVote } from "@lightdotso/types";
import type { FC } from "react";

import { NextImage } from "@lightdotso/app/components/NextImage";
import { ipfsAddress } from "@lightdotso/app/utils/ipfsAddress";

export type BaseSnapshotProps = { vote: SnapshotVote };

export const BaseSnapshot: FC<BaseSnapshotProps> = ({
  vote: {
    space: { avatar, name },
  },
}) => {
  return (
    <NextImage
      layout="fill"
      className="object-cover w-full h-full"
      src={ipfsAddress(avatar.substring(7))}
      alt={name}
      loading="lazy"
    />
  );
};
