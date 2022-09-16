import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import type { FC } from "react";

type AuthProps = { guard?: boolean };

export const Auth: FC<AuthProps> = ({ children, guard = false }) => {
  const { data: session } = useSession();
  const router = useRouter();
  if (guard && !session) {
    router.replace("/auth");
  }

  return <>{children}</>;
};
