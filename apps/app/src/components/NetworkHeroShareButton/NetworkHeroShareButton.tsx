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
      className="inline-flex items-center rounded-full border border-contrast-lower bg-bg-lighter p-2.5 text-contrast-higher shadow-sm ring-offset-bg-light hover:bg-bg hover:text-contrast-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 lg:bg-bg"
      onClick={() => {
        setModalShareState({
          name: id,
          open: true,
          type: type === "snapshot" ? "networkSnapshot" : "networkPoap",
        });
      }}
    >
      <FiShare className="h-4 w-4" aria-hidden="true" />
    </button>
  );
};
