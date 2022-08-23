import { MenuIcon, XIcon } from "@heroicons/react/24/outline";
import type { FC, MouseEventHandler } from "react";

export type HeaderButtonProps = {
  open: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const HeaderButton: FC<HeaderButtonProps> = ({ open, onClick }) => {
  return (
    <button
      className="inline-flex items-center justify-center rounded-md p-2 text-contrast-medium hover:bg-contrast-lower hover:text-contrast-high focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
      onClick={onClick}
    >
      <span className="sr-only">Open menu</span>
      {open ? (
        <XIcon className="block h-6 w-6" aria-hidden="true" />
      ) : (
        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
      )}
    </button>
  );
};
