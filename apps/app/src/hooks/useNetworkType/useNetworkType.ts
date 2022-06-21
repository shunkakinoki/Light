import { useRecoilState } from "recoil";

import { networkTypeAtom } from "@lightdotso/app/atoms/networkType";

export const useNetworkType = () => {
  const [networkType, setNetworkType] = useRecoilState(networkTypeAtom);

  return {
    networkType,
    setNetworkType,
  };
};
