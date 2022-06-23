import clsx from "clsx";
import type { FC } from "react";
import { FaTwitter } from "react-icons/fa";

import s from "./ProfileHeroTwitter.module.css";

import { useModalTwitterVerify } from "@lightdotso/app/hooks/useModalTwitterVerify";
import { useWallet } from "@lightdotso/app/hooks/useWallet";

export type ProfileHeroTwitterProps = {
  address: string;
  username: string;
};

export const ProfileHeroTwitter: FC<ProfileHeroTwitterProps> = ({
  address,
  username,
}) => {
  const { address: walletAddress } = useWallet();
  const { setModalTwitterVerifyState } = useModalTwitterVerify();

  if (address === walletAddress && username === "") {
    return (
      <button
        className={clsx(
          "inline-flex overflow-hidden items-center py-1 px-6 text-sm text-blue-500 hover:bg-blue-300/10 rounded-full border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-4 ring-offset-bg shadow-sm transition-all cursor-pointer",
          s.transitionfix,
        )}
        onClick={() => {
          return setModalTwitterVerifyState({ open: true });
        }}
      >
        <FaTwitter className="mr-3 -ml-1 w-4 h-4" aria-hidden="true" />
        Verify Twitter
      </button>
    );
  }

  if (username !== "") {
    return (
      <a
        href={`https://twitter.com/${username}`}
        target="_blank"
        rel="noreferrer"
        type="button"
        className={clsx(
          "inline-flex overflow-hidden items-center py-1 px-6 text-sm text-blue-500 hover:bg-blue-300/10 rounded-full border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-4 ring-offset-bg shadow-sm transition-all cursor-pointer",
          s.transitionfix,
        )}
      >
        <FaTwitter className="mr-3 -ml-1 w-4 h-4" aria-hidden="true" />
        {username}
      </a>
    );
  }

  return null;
};
