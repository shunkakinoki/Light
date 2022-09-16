import { Analytics } from "@lightdotso/common";
import dynamic from "next/dynamic";
import type { FC } from "react";

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
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      {children}
      {!isProduction && <Breakpoint />}
    </>
  );
};
