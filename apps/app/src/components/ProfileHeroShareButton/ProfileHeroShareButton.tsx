import { useRouter } from "next/router";
import type { FC } from "react";
import { FiShare } from "react-icons/fi";

import { useEns } from "@lightdotso/app/hooks/useEns";
import { useModalShare } from "@lightdotso/app/hooks/useModalShare";

export type ProfileHeroShareButtonProps = {
  address: string;
};

export const ProfileHeroShareButton: FC<ProfileHeroShareButtonProps> = ({
  address,
}) => {
  const { setModalShareState } = useModalShare();
  const { ens } = useEns(address);
  const { asPath } = useRouter();

  return (
    <button
      type="button"
      className="inline-flex items-center rounded-full border border-contrast-lower bg-bg-lighter p-2.5 text-contrast-higher shadow-sm ring-offset-bg-light hover:bg-bg hover:text-contrast-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      onClick={() => {
        setModalShareState({
          address: address,
          name: ens ?? null,
          open: true,
          type: asPath.startsWith("/profile") ? "profileSelf" : "profileLight",
        });
      }}
    >
      <FiShare className="h-4 w-4" aria-hidden="true" />
    </button>
  );
};
