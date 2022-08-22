import { Dialog, Transition } from "@headlessui/react";

import type { FC } from "react";
import { Fragment } from "react";

import s from "./Drawer.module.css";

import { DrawerCloseButton } from "@lightdotso/app/components/DrawerCloseButton";

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
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed ">
              <button className="fixed inset-0 w-full" onClick={onClose}>
                <span className="fixed top-0 right-0 p-4">
                  <DrawerCloseButton />
                </span>
              </button>
            </Dialog.Overlay>
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
