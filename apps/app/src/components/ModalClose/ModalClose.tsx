import type { FC } from "react";

import type { ModalCloseButtonProps } from "@lightdotso/app/components/ModalCloseButton";
import { ModalCloseButton } from "@lightdotso/app/components/ModalCloseButton";

export type ModalCloseProps = ModalCloseButtonProps;

export const ModalClose: FC<ModalCloseProps> = ({ onClick }) => {
  return (
    <div className="mb-4 flex w-full items-center justify-end">
      <ModalCloseButton onClick={onClick} />
    </div>
  );
};
