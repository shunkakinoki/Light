import { Dialog, Transition } from "@headlessui/react";

import type { FC } from "react";
import { Fragment } from "react";

import s from "./Modal.module.css";

export type ModalProps = {
  show: boolean;
  onClose: () => void;
};

export const Modal: FC<ModalProps> = ({ children, show, onClose }) => {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className={s.root} onClose={onClose}>
        <div className="flex min-h-screen items-center justify-center px-3">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
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
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative inline-block w-full overflow-hidden rounded-xl border border-contrast-lower bg-bg shadow-xl transition-all focus:outline-none">
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
