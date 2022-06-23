import dynamic from "next/dynamic";
import type { FC } from "react";

import { SeoBase } from "@lightdotso/app/components/SeoBase";
import { SettingsTwitterVerify } from "@lightdotso/app/components/SettingsTwitterVerify";
import { SettingsUsername } from "@lightdotso/app/components/SettingsUsername";

const ModalTwitterVerify = dynamic(() => {
  return import("@lightdotso/app/components/ModalTwitterVerify").then(mod => {
    return mod.ModalTwitterVerify;
  });
});
export const Settings: FC = () => {
  return (
    <>
      <SeoBase base="Settings" />
      <div className="py-10 sm:py-12 md:py-16 lg:py-28 xl:py-32 px-4 sm:px-6 lg:px-8 mx-auto max-w-3xl">
        <div className="sm:text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-contrast-higher">
            <span className="block xl:inline">Settings</span>
          </h1>
        </div>
        <div className="flex flex-col py-8 space-y-12">
          <SettingsUsername />
          <SettingsTwitterVerify />
        </div>
      </div>
      <ModalTwitterVerify />
    </>
  );
};
