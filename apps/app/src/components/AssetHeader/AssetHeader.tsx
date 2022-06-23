import type { FC } from "react";
import { useCallback } from "react";

import { useAssetTransition } from "@lightdotso/app/hooks/useAssetTransition";

export const AssetHeader: FC = () => {
  const { finishAssetTransition } = useAssetTransition();

  const onClick = useCallback(() => {
    finishAssetTransition();
  }, [finishAssetTransition]);

  return (
    <div className="flex items-center px-4 md:px-8 h-20">
      <button
        className="text-sm text-contrast-medium hover:text-contrast-high uppercase cursor-pointer"
        onClick={onClick}
      >
        ← Back to Light
      </button>
    </div>
  );
};
