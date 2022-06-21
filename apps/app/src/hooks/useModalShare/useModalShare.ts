import { useRecoilState } from "recoil";

import { modalShareAtom } from "@lightdotso/app/atoms/modalShare";

export const useModalShare = () => {
  const [modalShareState, setModalShareState] = useRecoilState(modalShareAtom);

  const closeModalShare = () => {
    setModalShareState({
      ...modalShareState,
      open: false,
    });
  };

  return {
    modalShareState,
    setModalShareState,
    closeModalShare,
  } as const;
};
