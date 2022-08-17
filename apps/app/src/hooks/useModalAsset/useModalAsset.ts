import { useRecoilState } from "recoil";

import { modalAssetAtom } from "@lightdotso/app/atoms/modalAsset";

export const useModalAsset = () => {
  const [modalAssetState, setModalAssetState] = useRecoilState(modalAssetAtom);

  const closeModalAsset = () => {
    setModalAssetState({
      ...modalAssetState,
      open: false,
    });
  };

  return {
    modalAssetState,
    setModalAssetState,
    closeModalAsset,
  } as const;
};
