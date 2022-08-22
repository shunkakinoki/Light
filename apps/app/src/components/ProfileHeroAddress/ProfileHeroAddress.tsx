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
    <div className="space-y-5 sm:mx-0 sm:max-w-xl sm:space-y-4">
      <h2 className="flex justify-start overflow-hidden text-ellipsis text-left text-2xl font-extrabold tracking-tight text-contrast-higher sm:text-3xl">
        {ens ?? (typeof address === "string" && splitAddress(address))}
      </h2>
      <div className="mx-auto flex flex-row justify-center space-x-3 sm:justify-start">
        <div className="flex rounded-md bg-bg-dark py-1.5 px-3">
          <p className="mr-2 text-base text-contrast-low">
            {splitAddress(address)}
          </p>
          <button
            onClick={() => {
              return copy(address);
            }}
          >
            {!isCopied ? (
              <DuplicateIcon className="h-6 w-6 text-contrast-low hover:text-contrast-medium" />
            ) : (
              <ClipboardCheckIcon className="h-6 w-6 text-contrast-low hover:text-contrast-medium" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
