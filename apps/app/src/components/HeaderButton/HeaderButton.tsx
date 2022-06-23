import { MenuIcon, XIcon } from "@heroicons/react/outline";
import type { FC, MouseEventHandler } from "react";

export type HeaderButtonProps = {
  open: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const HeaderButton: FC<HeaderButtonProps> = ({ open, onClick }) => {
  return (
    <button
      className="inline-flex justify-center items-center p-2 text-contrast-medium hover:text-contrast-high hover:bg-contrast-lower rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
      onClick={onClick}
    >
      <span className="sr-only">Open menu</span>
      {open ? (
        <XIcon className="block w-6 h-6" aria-hidden="true" />
      ) : (
        <MenuIcon className="block w-6 h-6" aria-hidden="true" />
      )}
    </button>
  );
};
