import { Footer } from "@lightdotso/core";
import type { FC } from "react";

import { AuthGuard } from "@lightdotso/app/components/AuthGuard";
import { Header } from "@lightdotso/app/components/Header";
import { Profile } from "@lightdotso/app/components/Profile";

export const TimelinePage: FC = () => {
  return (
    <AuthGuard>
      <Header border={false} />
      <Profile active="Timeline" />
      <Footer />
    </AuthGuard>
  );
};

export default TimelinePage;
