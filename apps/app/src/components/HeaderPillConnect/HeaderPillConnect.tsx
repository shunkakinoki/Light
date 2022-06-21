import type { FC, MouseEventHandler } from "react";

import { PlaceholderBlur } from "@lightdotso/app/components/PlaceholderBlur";

export interface HeaderPillConnectProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const HeaderPillConnect: FC<HeaderPillConnectProps> = ({ onClick }) => {
  return (
    <div className="group relative">
      <PlaceholderBlur />
      <button
        className="relative flex items-center rounded-full border border-contrast-high bg-contrast-higher py-2 px-3 leading-none ring-offset-bg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        onClick={onClick}
      >
        <span className="text-sm text-bg transition duration-200">
          Connect Wallet
        </span>
      </button>
    </div>
  );
};
