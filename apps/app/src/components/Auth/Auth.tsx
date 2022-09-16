import type { FC } from "react";

import { useAuth } from "@lightdotso/app/hooks/useAuth";

type AuthProps = { guard?: boolean };

export const Auth: FC<AuthProps> = ({ children, guard = false }) => {
  useAuth(guard);

  return <>{children}</>;
};
