import { Transition } from "@headlessui/react";
import type { FC, ReactNode } from "react";
import { useEffect } from "react";

import { Center } from "@lightdotso/app/components/Center";
import { useAssetTransition } from "@lightdotso/app/hooks/useAssetTransition";

export type AssetGridProps = { base: ReactNode };

const AssetGridLayout: FC = ({ children }) => {
  return (
    <div className="grid grid-flow-col p-6 sm:p-10 md:p-16 w-full max-w-container h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-24 lg:gap-x-36 gap-y-8">
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
          <div className="hidden md:block col-span-2 w-[9999px]" />
          <div className="flex col-span-1 p-12 sm:p-16 md:p-12">
            <div className="col-span-1 sm:my-auto w-full aspect-w-1 aspect-h-1">
              {base}
            </div>
          </div>
          <div className="flex col-span-1">{children}</div>
        </AssetGridLayout>
      </Transition>
    </Center>
  );
};
