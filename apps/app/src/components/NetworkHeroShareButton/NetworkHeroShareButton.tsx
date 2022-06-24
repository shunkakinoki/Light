import type { FC } from "react";
import { FiShare } from "react-icons/fi";

import { useModalShare } from "@lightdotso/app/hooks/useModalShare";

export type NetworkHeroShareButtonProps = {
  id: string;
  type: "snapshot" | "poap";
};

export const NetworkHeroShareButton: FC<NetworkHeroShareButtonProps> = ({
  id,
  type,
}) => {
  const { setModalShareState } = useModalShare();

  return (
    <button
      type="button"
      className="inline-flex items-center p-2.5 text-contrast-higher hover:text-contrast-medium bg-bg-lighter hover:bg-bg lg:bg-bg rounded-full border border-contrast-lower focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ring-offset-bg-light shadow-sm"
      onClick={() => {
        setModalShareState({
          name: id,
          open: true,
          type: type === "snapshot" ? "networkSnapshot" : "networkPoap",
        });
      }}
    >
      <FiShare className="w-4 h-4" aria-hidden="true" />
    </button>
  );
};
