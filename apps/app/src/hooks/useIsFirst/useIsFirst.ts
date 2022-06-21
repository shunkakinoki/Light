import { useRecoilState } from "recoil";

import { isFirstAtom } from "@lightdotso/app/atoms/isFirst";

export const useIsFirst = () => {
  const [isFirst, setIsFirst] = useRecoilState(isFirstAtom);

  return {
    isFirst,
    setIsFirst,
  };
};
