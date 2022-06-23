import { SocialLinks } from "@lightdotso/const";
import type { FC } from "react";
import { FaTwitter } from "react-icons/fa";

export const TwitterNotice: FC = () => {
  return (
    <div className="w-full h-48">
      <div className="flex flex-col justify-center items-center">
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
          className="inline-flex items-center p-3 mt-4 text-sm text-contrast-higher hover:text-contrast-medium rounded-full cursor-pointer"
        >
          <FaTwitter className="w-10 h-10" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};
