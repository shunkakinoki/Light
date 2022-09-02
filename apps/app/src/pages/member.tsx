import { Footer } from "@lightdotso/common";
import type { FC } from "react";

import { AuthGuard } from "@lightdotso/app/components/AuthGuard";
import { Center } from "@lightdotso/app/components/Center";
import { Header } from "@lightdotso/app/components/Header";
import { Member } from "@lightdotso/app/components/Member";

export const MemberPage: FC = () => {
  return (
    <AuthGuard>
      <Header />
      <Center>
        <Member />
      </Center>
      <Footer />
    </AuthGuard>
  );
};

export default MemberPage;
