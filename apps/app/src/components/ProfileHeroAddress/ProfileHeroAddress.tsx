import { DuplicateIcon, ClipboardCheckIcon } from "@heroicons/react/outline";
import type { FC } from "react";

import { useCopy } from "@lightdotso/app/hooks/useCopy";
import { splitAddress } from "@lightdotso/app/utils/splitAddress";

export interface ProfileHeroAddressProps {
  address: string;
  ens?: string;
}

export const ProfileHeroAddress: FC<ProfileHeroAddressProps> = ({
  address,
  ens,
}) => {
  const [isCopied, copy] = useCopy();

  return (
    <div className="sm:mx-0 space-y-5 sm:space-y-4 sm:max-w-xl">
      <h2 className="flex overflow-hidden justify-start text-2xl sm:text-3xl font-extrabold tracking-tight text-left text-contrast-higher text-ellipsis">
        {ens ?? splitAddress(address)}
      </h2>
      <div className="flex flex-row justify-center sm:justify-start mx-auto space-x-3">
        <div className="flex py-1.5 px-3 bg-bg-dark rounded-md">
          <p className="mr-2 text-base text-contrast-low">
            {splitAddress(address)}
          </p>
          <button
            onClick={() => {
              return copy(address);
            }}
          >
            {!isCopied ? (
              <DuplicateIcon className="w-6 h-6 text-contrast-low hover:text-contrast-medium" />
            ) : (
              <ClipboardCheckIcon className="w-6 h-6 text-contrast-low hover:text-contrast-medium" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
