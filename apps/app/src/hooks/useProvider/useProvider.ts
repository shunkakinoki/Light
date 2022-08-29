import { useMemo, useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const useProvider = () => {
  const { connector } = useAccount();
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const loadProvider = async () => {
      setProvider(await connector?.getProvider());
    };
    loadProvider();
  }, [connector]);

  return useMemo(() => {
    if (provider) {
      return provider;
    }
  }, [provider]);
};
