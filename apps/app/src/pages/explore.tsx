import { Footer } from "@lightdotso/common";
import type { FC } from "react";

import { Auth } from "@lightdotso/app/components/Auth";
import { FollowExplore } from "@lightdotso/app/components/FollowExplore";
import { Header } from "@lightdotso/app/components/Header";

export const ExplorePage: FC = () => {
  return (
    <Auth>
      <Header active="Explore" />
      <FollowExplore />
      <Footer />
    </Auth>
  );
};

export default ExplorePage;
