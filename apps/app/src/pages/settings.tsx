import { Footer } from "@lightdotso/core";
import type { FC } from "react";

import { AuthGuard } from "@lightdotso/app/components/AuthGuard";
import { Header } from "@lightdotso/app/components/Header";
import { Settings } from "@lightdotso/app/components/Settings";

export const SettingsPage: FC = () => {
  return (
    <AuthGuard>
      <Header />
      <Settings />
      <Footer />
    </AuthGuard>
  );
};

export default SettingsPage;
