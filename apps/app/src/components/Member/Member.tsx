// import { NotionLinks } from "@lightdotso/const";
import type { FC } from "react";

import { MemberDiscord } from "@lightdotso/app/components/MemberDiscord";
import { MemberNFT } from "@lightdotso/app/components/MemberNFT";
import { SeoBase } from "@lightdotso/app/components/SeoBase";

// import { DEAD_ADDRESS } from "@lightdotso/app/dummy/address";
// import { splitAddress } from "@lightdotso/app/utils/splitAddress";

export const Member: FC = () => {
  return (
    <div className="flex flex-col items-center px-3">
      <SeoBase base="Member" />
      <MemberNFT />
      <div className="mt-12 md:mt-20">
        <div className="max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-contrast-higher">
            Get Membership Card
          </h2>
          <p className="mt-4 text-lg text-contrast-medium">
            Become one of our early supporters
            {/* Required tokens not owned by address:{" "}
            <span className="text-contrast-higher">
              {splitAddress(DEAD_ADDRESS)}
            </span>
            <br />
            You must have a{" "}
            <a
              className="text-contrast-higher underline hover:text-contrast-medium"
              target="_blank"
              rel="noreferrer"
              href={NotionLinks["Terms of Service"]}
            >
              Membership NFT
            </a>{" "}
            to get access to Light. */}
          </p>
        </div>
      </div>
      {/* <button
        type="button"
        className="mt-8 inline-flex items-center rounded-md border border-transparent bg-contrast-higher py-3 px-14 text-base font-medium text-bg ring-offset-bg hover:bg-contrast-high focus:outline-none focus:ring-4 focus:ring-primary focus:ring-offset-2"
      >
        Retry
      </button> */}
      <MemberDiscord />
    </div>
  );
};
