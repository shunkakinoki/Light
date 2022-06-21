import type { FC } from "react";

import { HeaderSearchBarItemLoading } from "@lightdotso/app/components/HeaderSearchBarItemLoading";

export const HeaderSearchBarLoading: FC = () => {
  return (
    <>
      {[...Array(3)].map((value, key) => {
        return <HeaderSearchBarItemLoading key={key} />;
      })}
    </>
  );
};
