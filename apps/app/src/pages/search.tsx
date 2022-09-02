import { Footer } from "@lightdotso/common";
import type { FC } from "react";

import { AuthGuard } from "@lightdotso/app/components/AuthGuard";
import { Center } from "@lightdotso/app/components/Center";
import { Header } from "@lightdotso/app/components/Header";

export const SearchPage: FC = () => {
  return (
    <AuthGuard>
      <Header active="Home" />
      <Center />
      <Footer />
    </AuthGuard>
  );
};

export default SearchPage;
