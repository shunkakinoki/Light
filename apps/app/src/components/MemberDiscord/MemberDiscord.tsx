import { SocialLinks } from "@lightdotso/const";
import type { FC } from "react";

import { FaDiscord } from "react-icons/fa";

export const MemberDiscord: FC = () => {
  return (
    <>
      <div className="mt-8">
        <a
          href={SocialLinks.Discord}
          target="_blank"
          rel="noreferrer"
          className="text-center text-contrast-higher hover:text-contrast-high"
        >
          <FaDiscord className="h-10 w-10" aria-hidden="true" />
        </a>
      </div>
      <p className="mt-4 text-lg text-contrast-medium">
        Join our{" "}
        <a
          className="text-contrast-higher hover:text-contrast-high hover:underline"
          target="_blank"
          rel="noreferrer"
          href={SocialLinks.Discord}
        >
          Discord
        </a>{" "}
        to learn more.
      </p>
    </>
  );
};
