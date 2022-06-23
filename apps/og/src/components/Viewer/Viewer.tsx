import clsx from "clsx";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import type { FC } from "react";

import { useConfig } from "@lightdotso/og/hooks/useConfig";
import { useCopy } from "@lightdotso/og/hooks/useCopy";
import { useDebouncedValue } from "@lightdotso/og/hooks/useDebouncedValue";
import { useLayoutConfig } from "@lightdotso/og/hooks/useLayoutConfig";

export const Viewer: FC = () => {
  const [config] = useConfig();
  const [isCopied, copy] = useCopy();
  const [layoutConfig] = useLayoutConfig();
  const [isLoaded, setIsLoaded] = useState(true);
  const [host, setHost] = useState("");

  const router = useRouter();

  useEffect(() => {
    const host = window.location.host;
    setHost(host);
  }, [router.pathname]);

  const query = useMemo(() => {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries({ ...config, ...layoutConfig })) {
      if (value != null) {
        searchParams.set(key, value);
      }
    }

    return searchParams.toString();
  }, [config, layoutConfig]);

  const imageURL = useMemo(() => {
    return `/api/image?${query}`;
  }, [query]);

  const htmlURL = useMemo(() => {
    return `/api/html?${query}`;
  }, [query]);

  const debouncedImageURL = useDebouncedValue(imageURL, 200);

  useEffect(() => {
    return setIsLoaded(false);
  }, [debouncedImageURL]);

  const className =
    "inline-flex cursor-pointer hover:bg-contrast-medium items-center justify-center rounded-md border border-transparent bg-contrast-higher py-2 px-4 text-center text-sm font-medium leading-6";

  return (
    <div className="col-span-2 w-full">
      <div className="relative w-full rounded-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height={1080}
          width={2048}
          className={clsx(
            "bg-emphasis-medium rounded-md",
            !isLoaded && "blur-sm",
          )}
          src={debouncedImageURL}
          alt={`OG for the ${config.layoutName} layout`}
          onLoad={(): void => {
            return setIsLoaded(true);
          }}
        />
      </div>
      <div className="flex justify-end mt-12 space-x-2">
        <button
          className={className}
          onClick={(): void => {
            return copy(`https://${host}${imageURL}`);
          }}
        >
          {isCopied ? "Copied!" : "Copy Image URL"}
        </button>
        <a
          className={className}
          href={`${htmlURL}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open HTML Page
        </a>
      </div>
    </div>
  );
};
