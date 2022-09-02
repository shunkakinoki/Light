import { Footer } from "@lightdotso/common";
import type { FC } from "react";

import { Auth } from "@lightdotso/app/components/Auth";
import { FollowHome } from "@lightdotso/app/components/FollowHome";
import { Header } from "@lightdotso/app/components/Header";

export const IndexPage: FC = () => {
  return (
    <Auth>
      <Header active="Home" />
      <FollowHome />
      <Footer />
    </Auth>
  );
};

export default IndexPage;
