import { Transition } from "@headlessui/react";
import type { FC, ReactNode } from "react";
import { Fragment } from "react";

export type ToastBaseProps = {
  show: boolean;
  icon: ReactNode;
};

export const ToastBase: FC<ToastBaseProps> = ({ show, children, icon }) => {
  return (
    <Transition
      show={show}
      as={Fragment}
      enter="transform duration-300"
      enterFrom="opacity-0 -translate-y-full"
      enterTo="opacity-100"
      leave="base ease-in duration-100"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 -translate-y-full"
    >
      <div className="w-full max-w-lg rounded-xl border border-contrast-lower bg-bg-light p-3 md:max-w-2xl">
        <div className="flex items-center">
          <div className="shrink-0">{icon}</div>
          <div className="ml-3">
            <p className="font-medium leading-8 text-contrast-higher">
              {children}
            </p>
          </div>
        </div>
      </div>
    </Transition>
  );
};
