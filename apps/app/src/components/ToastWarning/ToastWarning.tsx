import { ExclamationCircleIcon } from "@heroicons/react/solid";
import type { FC } from "react";

import type { ToastBaseProps } from "@lightdotso/app/components/ToastBase";
import { ToastBase } from "@lightdotso/app/components/ToastBase";

type ToastWarningProps = Pick<ToastBaseProps, "show">;

export const ToastWarning: FC<ToastWarningProps> = ({ show, children }) => {
  return (
    <ToastBase
      icon={
        <ExclamationCircleIcon
          className="h-5 w-5 text-warning"
          aria-hidden="true"
        />
      }
      show={show}
    >
      {children}
    </ToastBase>
  );
};
