import dynamic from "next/dynamic";
import type { FC } from "react";

import { SeoBase } from "@lightdotso/app/components/SeoBase";
import { SettingsTwitterVerify } from "@lightdotso/app/components/SettingsTwitterVerify";
// import { SettingsUsername } from "@lightdotso/app/components/SettingsUsername";

const ModalTwitterVerify = dynamic(() => {
  return import("@lightdotso/app/components/ModalTwitterVerify").then(mod => {
    return mod.ModalTwitterVerify;
  });
});
export const Settings: FC = () => {
  return (
    <>
      <SeoBase base="Settings" />
      <div className="mx-auto max-w-3xl py-10 px-4 sm:py-12 sm:px-6 md:py-16 lg:py-28 lg:px-8 xl:py-32">
        <div className="sm:text-center lg:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-contrast-higher md:text-5xl">
            <span className="block xl:inline">Settings</span>
          </h1>
        </div>
        <div className="flex flex-col space-y-12 py-8">
          {/* <SettingsUsername /> */}
          <SettingsTwitterVerify />
        </div>
      </div>
      <ModalTwitterVerify />
    </>
  );
};
