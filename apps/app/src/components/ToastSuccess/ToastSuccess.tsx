import { CheckCircleIcon } from "@heroicons/react/outline";
import type { FC } from "react";

import type { ToastBaseProps } from "@lightdotso/app/components/ToastBase";
import { ToastBase } from "@lightdotso/app/components/ToastBase";

type ToastSuccessProps = Pick<ToastBaseProps, "show">;

export const ToastSuccess: FC<ToastSuccessProps> = ({ show, children }) => {
  return (
    <ToastBase
      icon={
        <CheckCircleIcon className="w-5 h-5 text-success" aria-hidden="true" />
      }
      show={show}
    >
      {children}
    </ToastBase>
  );
};
