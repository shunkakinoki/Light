import { Footer } from "@lightdotso/core";
import type { FC } from "react";

import { Auth } from "@lightdotso/app/components/Auth";
import { Center } from "@lightdotso/app/components/Center";
import { Header } from "@lightdotso/app/components/Header";
import { Wallet } from "@lightdotso/app/components/Wallet";

export const AuthPage: FC = () => {
  return (
    <Auth>
      <Header />
      <Center>
        <div className="px-3">
          <Wallet />
        </div>
      </Center>
      <Footer />
    </Auth>
  );
};

export default AuthPage;
