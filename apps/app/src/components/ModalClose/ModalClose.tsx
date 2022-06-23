import type { FC } from "react";

import type { ModalCloseButtonProps } from "@lightdotso/app/components/ModalCloseButton";
import { ModalCloseButton } from "@lightdotso/app/components/ModalCloseButton";

export type ModalCloseProps = ModalCloseButtonProps;

export const ModalClose: FC<ModalCloseProps> = ({ onClick }) => {
  return (
    <div className="flex justify-end items-center mb-4 w-full">
      <ModalCloseButton onClick={onClick} />
    </div>
  );
};
