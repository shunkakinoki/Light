import type { FC } from "react";
import { useCallback } from "react";

import { useAssetTransition } from "@lightdotso/app/hooks/useAssetTransition";

export const AssetHeader: FC = () => {
  const { finishAssetTransition } = useAssetTransition();

  const onClick = useCallback(() => {
    finishAssetTransition();
  }, [finishAssetTransition]);

  return (
    <div className="flex h-20 items-center px-4 md:px-8">
      <button
        className="cursor-pointer text-sm uppercase text-contrast-medium hover:text-contrast-high"
        onClick={onClick}
      >
        ← Back to Light
      </button>
    </div>
  );
};
