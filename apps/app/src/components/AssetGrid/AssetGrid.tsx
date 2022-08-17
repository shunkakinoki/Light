import { Transition } from "@headlessui/react";
import clsx from "clsx";
import type { FC, ReactNode } from "react";
import { useEffect } from "react";

import { Center } from "@lightdotso/app/components/Center";
import { useAssetTransition } from "@lightdotso/app/hooks/useAssetTransition";
import { useIsIframe } from "@lightdotso/app/hooks/useIsIframe";

export type AssetGridProps = { base: ReactNode };

const AssetGridLayout: FC = ({ children }) => {
  const isIframe = useIsIframe();

  return (
    <div
      className={clsx(
        "grid h-full w-full max-w-container grid-flow-col",
        isIframe ? "pb-10" : "p-6 sm:p-10 md:p-16",
      )}
    >
      <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-24 lg:gap-x-36">
        {children}
      </div>
    </div>
  );
};

export const AssetGrid: FC<AssetGridProps> = ({ base, children }) => {
  const { assetTransitionState, startAssetTransition } = useAssetTransition();

  useEffect(() => {
    startAssetTransition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Center>
      <Transition
        show={assetTransitionState}
        enter="transition duration-300 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-100 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <AssetGridLayout>
          <div className="col-span-2 hidden w-[9999px] md:block" />
          <div className="col-span-1 flex p-12 sm:p-16 md:p-12">
            <div className="aspect-w-1 aspect-h-1 col-span-1 w-full sm:my-auto">
              {base}
            </div>
          </div>
          <div className="col-span-1 flex">{children}</div>
        </AssetGridLayout>
      </Transition>
    </Center>
  );
};
