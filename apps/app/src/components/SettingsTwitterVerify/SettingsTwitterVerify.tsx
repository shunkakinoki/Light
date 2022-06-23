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
      <div className="flex flex-col py-6 px-8 space-y-4">
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
          <div className="flex mt-20 rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 sm:text-sm text-contrast-medium rounded-l-md border border-r-0 border-contrast-medium">
              @
            </span>
            <input
              disabled
              type="text"
              name="twitter"
              id="twitter"
              className="block grow w-full min-w-0 sm:text-sm text-contrast-high bg-inherit rounded-none rounded-r-md border-contrast-medium focus:border-primary-light focus:ring-primary-light"
              defaultValue={identity?.social?.twitter}
            />
          </div>
        )}
      </div>
      <div className="flex items-center py-4 px-8 bg-contrast-lower">
        <p className="grow text-contrast-medium">
          Verify your Twitter account here.
        </p>
        <button
          type="submit"
          className="inline-flex flex-none justify-center py-2 px-4 text-sm font-medium text-bg bg-contrast-higher hover:bg-contrast-high rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-contrast-high focus:ring-offset-2 shadow-sm"
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
