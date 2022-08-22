import { Analytics } from "@lightdotso/core";
import dynamic from "next/dynamic";
import type { FC } from "react";

import { ModalWallet } from "@lightdotso/app/components/ModalWallet";
import { isProduction } from "@lightdotso/app/utils/isProduction";

const Breakpoint = dynamic(() => {
  return import("@lightdotso/app/components/Breakpoint").then(mod => {
    return mod.Breakpoint;
  });
});

const Toaster = dynamic(() => {
  return import("react-hot-toast").then(mod => {
    return mod.Toaster;
  });
});

export const Layout: FC = ({ children }) => {
  return (
    <>
      <Analytics />
      <ModalWallet />
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      {children}
      {!isProduction && <Breakpoint />}
    </>
  );
};
