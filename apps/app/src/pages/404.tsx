import { Footer } from "@lightdotso/core";
import type { FC } from "react";

import { Header } from "@lightdotso/app/components/Header";
import { NotFound } from "@lightdotso/app/components/NotFound";

export const NotFoundPage: FC = () => {
  return (
    <>
      <Header />
      <NotFound />
      <Footer />
    </>
  );
};

export default NotFoundPage;
