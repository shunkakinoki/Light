import type { FC } from "react";

import { Auth } from "@lightdotso/app/components/Auth";
import { AuthSessionAdmin } from "@lightdotso/app/components/AuthSessionAdmin";
import { SpaceConfig } from "@lightdotso/app/components/SpaceConfig";
import { SpaceLayoutViewer } from "@lightdotso/app/components/SpaceLayoutViewer";

export const SpaceConfigPage: FC = () => {
  return (
    <Auth>
      <AuthSessionAdmin>
        <div className="flex h-screen items-center justify-center">
          <section className="grid w-full max-w-4xl grid-cols-1 md:grid-cols-2 md:gap-16">
            <SpaceConfig />
            <SpaceLayoutViewer />
          </section>
        </div>
      </AuthSessionAdmin>
    </Auth>
  );
};

export default SpaceConfigPage;
