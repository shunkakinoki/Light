import { ExclamationCircleIcon } from "@heroicons/react/solid";
import type { FC } from "react";

import type { ToastBaseProps } from "@lightdotso/app/components/ToastBase";
import { ToastBase } from "@lightdotso/app/components/ToastBase";

type ToastErrorProps = Pick<ToastBaseProps, "show">;

export const ToastError: FC<ToastErrorProps> = ({ show, children }) => {
  return (
    <ToastBase
      icon={
        <ExclamationCircleIcon
          className="w-5 h-5 text-error"
          aria-hidden="true"
        />
      }
      show={show}
    >
      {children}
    </ToastBase>
  );
};
