import { XIcon } from "@heroicons/react/solid";

import type { MouseEventHandler, FC } from "react";

export type ModalCloseButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const ModalCloseButton: FC<ModalCloseButtonProps> = ({ onClick }) => {
  return (
    <button
      aria-label="Close panel"
      className="focus:outline-none transition duration-150 ease-in-out"
      onClick={onClick}
    >
      <XIcon className="w-6 h-6 text-contrast-high hover:text-contrast-medium" />
    </button>
  );
};
