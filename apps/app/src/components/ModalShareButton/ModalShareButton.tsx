import { ClipboardIcon, ClipboardCheckIcon } from "@heroicons/react/solid";
import type { FC } from "react";
import { useMemo } from "react";
import { FaTwitter } from "react-icons/fa";

import { useCopy } from "@lightdotso/app/hooks/useCopy";
import type { ModalType } from "@lightdotso/app/types/modal";

type ModalShareButtonProps = {
  address?: string;
  name: string;
  type: ModalType;
};

export const ModalShareButton: FC<ModalShareButtonProps> = ({
  address,
  name,
  type,
}) => {
  const [isCopied, copy] = useCopy();

  const lightUrl = useMemo(() => {
    const baseUrl = "https://light.so/";

    if (type.startsWith("profile")) {
      if (name) {
        return baseUrl + name;
      }
      return baseUrl + address;
    }
    if (type === "networkSnapshot") {
      return baseUrl + "dao/" + name;
    }
    if (type === "networkPoap") {
      return baseUrl + "poap/" + name;
    }
  }, [address, name, type]);

  const shareTextLink = useMemo(() => {
    const baseText = "http://twitter.com/share?text=";
    const suffixText = ` on @LightDotSo %0A%0A${lightUrl}`;

    if (type.startsWith("profileSelf")) {
      return baseText + "See my metaverse profile" + suffixText;
    }

    if (type.startsWith("profileLight")) {
      return baseText + "See this profile" + suffixText;
    }

    if (type.startsWith("orbSnapshot")) {
      return baseText + `See ${name}` + suffixText;
    }
  }, [lightUrl, name, type]);

  return (
    <>
      <div className="flex mt-4 space-x-4 w-full">
        <div className="inline-flex flex-1 rounded-md shadow">
          <button
            className="inline-flex justify-center items-center py-3 w-full text-base font-medium text-contrast-medium hover:text-contrast-higher hover:bg-contrast-lower rounded-md border border-contrast-medium"
            onClick={() => {
              return copy(lightUrl);
            }}
          >
            {!isCopied ? (
              <ClipboardIcon
                className="mr-2 -ml-1 w-5 h-5"
                aria-hidden="true"
              />
            ) : (
              <ClipboardCheckIcon className="mr-2 -ml-1 w-5 h-5" />
            )}
            {!isCopied ? "Copy Link" : "Copied!"}
          </button>
        </div>
        <div className="inline-flex flex-1 rounded-md shadow">
          <a
            href={shareTextLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center items-center py-3 w-full text-base font-medium text-contrast-lower bg-contrast-higher hover:bg-contrast-medium rounded-md border border-transparent"
          >
            <FaTwitter className="mr-2 -ml-1 w-5 h-5" aria-hidden="true" />
            Share on Twitter
          </a>
        </div>
      </div>
    </>
  );
};
