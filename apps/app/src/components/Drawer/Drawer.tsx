import { Dialog, Transition } from "@headlessui/react";

import type { FC } from "react";
import { Fragment } from "react";

import s from "./Drawer.module.css";

export type DrawerProps = {
  show: boolean;
  onClose: () => void;
};

export const Drawer: FC<DrawerProps> = ({ children, show, onClose }) => {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className={s.root} onClose={onClose}>
        <div className="flex min-h-screen items-end justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="translate-y-full"
            enterTo="translate-y-0"
            leave="ease-in-out duration-300"
            leaveFrom="translate-y-0"
            leaveTo="translate-y-full"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0 scale-95 translate-y-full"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-full"
          >
            <div className="relative inline-block w-full overflow-hidden rounded-xl bg-bg shadow-xl transition-all focus:outline-none">
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
