import type { FC } from "react";

import { useCyberConnectIdentity } from "@lightdotso/app/hooks/useCyberConnectIdentity";
import { useModalTwitterVerify } from "@lightdotso/app/hooks/useModalTwitterVerify";
import { useWallet } from "@lightdotso/app/hooks/useWallet";

useModalTwitterVerify;
export const SettingsTwitterVerify: FC = () => {
  const { address } = useWallet();
  const { identity } = useCyberConnectIdentity(address);
  const { setModalTwitterVerifyState } = useModalTwitterVerify();

  return (
    <div className="rounded-md border border-contrast-lower">
      <div className="flex flex-col space-y-4 py-6 px-8">
        <label
          htmlFor="twitter"
          className="block text-xl font-extrabold text-contrast-high"
        >
          Your Twitter Account
        </label>
        <p className="text-contrast-medium">
          {identity?.social?.twitter
            ? "This is your linked Twitter Account name"
            : "Twitter not yet linked"}
        </p>
        {identity?.social?.twitter && (
          <div className="mt-20 flex rounded-md shadow-sm">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-contrast-medium px-3 text-contrast-medium sm:text-sm">
              @
            </span>
            <input
              disabled
              type="text"
              name="twitter"
              id="twitter"
              className="block w-full min-w-0 grow rounded-none rounded-r-md border-contrast-medium bg-inherit text-contrast-high focus:border-primary-light focus:ring-primary-light sm:text-sm"
              defaultValue={identity?.social?.twitter}
            />
          </div>
        )}
      </div>
      <div className="flex items-center bg-contrast-lower py-4 px-8">
        <p className="grow text-contrast-medium">
          Verify your Twitter account here.
        </p>
        <button
          type="submit"
          className="inline-flex flex-none justify-center rounded-md border border-transparent bg-contrast-higher py-2 px-4 text-sm font-medium text-bg shadow-sm hover:bg-contrast-high focus:outline-none focus:ring-2 focus:ring-contrast-high focus:ring-offset-2"
          onClick={() => {
            return setModalTwitterVerifyState({ open: true });
          }}
        >
          {identity?.social?.twitter ? "Re-verify" : "Verify"}
        </button>
      </div>
    </div>
  );
};
