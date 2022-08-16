import { utils } from "ethers";
import { useRouter } from "next/router";
import { useMemo } from "react";

import { useEnsResolver } from "wagmi";

import { useWallet } from "@lightdotso/app/hooks/useWallet";

export const useProfileAddress = (address?: string) => {
  const { address: walletAddress, isConnecting: isWalletLoading } = useWallet();
  const { asPath } = useRouter();

  const slug = useMemo(() => {
    return asPath.split("/").pop();
  }, [asPath]);

  const { data: routerAddress, isLoading: isEnsResolverLoading } =
    useEnsResolver({ name: slug });

  const profileAddress = useMemo(() => {
    return address ?? asPath.startsWith("/profile")
      ? walletAddress
      : utils.isAddress(slug)
      ? slug
      : routerAddress;
  }, [address, asPath, walletAddress, slug, routerAddress]);

  return {
    isLoading: !profileAddress ?? isWalletLoading ?? isEnsResolverLoading,
    profileAddress: address ?? profileAddress,
  };
};
