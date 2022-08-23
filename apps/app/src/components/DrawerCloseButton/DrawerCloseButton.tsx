import { XMarkIcon } from "@heroicons/react/24/solid";

import type { FC } from "react";

export const DrawerCloseButton: FC = () => {
  return (
    <div
      aria-label="Close drawer"
      className="transition duration-150 ease-in-out focus:outline-none"
    >
      <XMarkIcon className="h-6 w-6 text-contrast-high hover:text-contrast-medium" />
    </div>
  );
};
