import type { FC } from "react";

import { Auth } from "@lightdotso/app/components/Auth";
import { SpaceConfig } from "@lightdotso/app/components/SpaceConfig";
import { SpaceLayoutViewer } from "@lightdotso/app/components/SpaceLayoutViewer";

export const SpaceConfigPage: FC = () => {
  return (
    <Auth>
      <div className="my-12 mx-auto flex h-screen w-full max-w-6xl flex-col items-center justify-center lg:my-8">
        <section className="grid grid-cols-1 gap-y-8 px-4 md:grid-cols-3 md:gap-8">
          <SpaceConfig />
          <SpaceLayoutViewer />
        </section>
      </div>
    </Auth>
  );
};

export default SpaceConfigPage;
