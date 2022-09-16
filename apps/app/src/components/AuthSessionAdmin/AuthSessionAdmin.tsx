import type { FC } from "react";

import { useAccount } from "wagmi";

import { useClientOnly } from "@lightdotso/app/hooks/useClientOnly";

const ADMIN_ADDRESSES = ["0x4fd9D0eE6D6564E80A9Ee00c0163fC952d0A45Ed"];
export const AuthSessionAdmin: FC = ({ children }) => {
  const isClient = useClientOnly();
  const { address: accountAddress } = useAccount();

  if (!isClient) {
    return null;
  }

  if (
    !ADMIN_ADDRESSES.some(address => {
      return address === accountAddress;
    })
  ) {
    return null;
  }

  return <>{children}</>;
};
