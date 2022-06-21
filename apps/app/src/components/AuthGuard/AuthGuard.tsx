import type { FC } from "react";

import { Auth } from "@lightdotso/app/components/Auth";

export const AuthGuard: FC = ({ children }) => {
  return <Auth guard>{children}</Auth>;
};
