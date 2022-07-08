import { SocialLinks } from "@lightdotso/const";
import type { FC } from "react";
import { FaTwitter } from "react-icons/fa";

export const TwitterNotice: FC = () => {
  return (
    <div className="h-48 w-full">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold leading-7 text-contrast-higher">
          Coming soon...
        </h1>
        <h2 className="mt-4 text-lg text-contrast-medium">
          Follow our Twitter to get updates!
        </h2>
        <a
          href={SocialLinks.Twitter}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex cursor-pointer items-center rounded-full p-3 text-sm text-contrast-higher hover:text-contrast-medium"
        >
          <FaTwitter className="h-10 w-10" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};
