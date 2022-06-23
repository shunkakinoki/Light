import type { CyberConnectStatus, PlausibleEvents } from "@lightdotso/types";
import clsx from "clsx";
import { usePlausible } from "next-plausible";
import type { FC, ButtonHTMLAttributes, MouseEvent } from "react";
import { useEffect, useState, useCallback } from "react";

import { LoadingDots } from "@lightdotso/app/components/LoadingDots";
import { useCyberConnectIdentity } from "@lightdotso/app/hooks/useCyberConnectIdentity";
import { useCyberConnectStatus } from "@lightdotso/app/hooks/useCyberConnectStatus";
import { useHover } from "@lightdotso/app/hooks/useHover";
import { useModalWallet } from "@lightdotso/app/hooks/useModalWallet";
import { useProviderCyberConnect } from "@lightdotso/app/hooks/useProviderCyberConnect";
// import { useProviderCyberConnectDefault } from "@lightdotso/app/hooks/useProviderCyberConnectDefault";
import { useWallet } from "@lightdotso/app/hooks/useWallet";
import { error } from "@lightdotso/app/libs/toast/error";

export type FollowButtonProps = {
  address: string;
  initialStatus?: CyberConnectStatus;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const FollowButton: FC<FollowButtonProps> = ({
  address,
  initialStatus,
  ...rest
}) => {
  const cyberconnectProvider = useProviderCyberConnect();
  // const cyberconnectProviderDefault = useProviderCyberConnectDefault();
  const plausible = usePlausible<PlausibleEvents>();
  const { openModalWallet } = useModalWallet();
  const [isLoading, setIsLoading] = useState<boolean>();
  const { address: walletAddress } = useWallet();
  const {
    isFollowing,
    mutate: mutateStatus,
    isLoading: isCyberConnectLoading,
  } = useCyberConnectStatus(walletAddress, address, initialStatus);
  const { mutate: mutateIdentity, identity } = useCyberConnectIdentity();
  const [hoverRef, isHovered] = useHover<HTMLButtonElement>();

  const onClick = useCallback(
    async (event: MouseEvent<HTMLButtonElement, any>) => {
      event.preventDefault();
      event.stopPropagation();
      if (!walletAddress) {
        plausible("FollowButton", { props: { type: "OpenModalWallet" } });
        return openModalWallet();
      }

      setIsLoading(true);
      try {
        if (isFollowing) {
          try {
            await cyberconnectProvider.disconnect(address);
          } catch (e) {
            console.error("Light Unfollow Error");
          }
          // try {
          //   setTimeout(() => {
          //     cyberconnectProviderDefault.disconnect(address);
          //   });
          // } catch (e) {
          //   console.error("Default Unfollow Error");
          // }
          mutateStatus({ followStatus: { isFollowing: false } });
          mutateIdentity({
            identity: { followingCount: identity?.followingCount - 1 },
          });
          plausible("FollowButton", {
            props: { type: "Unfollow" },
          });
        } else {
          try {
            await cyberconnectProvider.connect(address);
          } catch (e) {
            console.error("Light Follow Error");
          }
          // try {
          //   setTimeout(() => {
          //     cyberconnectProviderDefault.connect(address), 3000;
          //   });
          // } catch (e) {
          //   console.error("Default Follow Error");
          // }
          mutateStatus({ followStatus: { isFollowing: true } });
          mutateIdentity({
            identity: { followingCount: identity?.followingCount + 1 },
          });
          plausible("FollowButton", {
            props: { type: "Follow" },
          });
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        error(err?.message);
      }
    },
    [
      address,
      cyberconnectProvider,
      identity?.followingCount,
      isFollowing,
      mutateIdentity,
      mutateStatus,
      openModalWallet,
      plausible,
      walletAddress,
    ],
  );

  useEffect(() => {
    setIsLoading(isCyberConnectLoading);
  }, [isCyberConnectLoading]);

  if (address === walletAddress) {
    return null;
  }

  return (
    <button
      ref={hoverRef}
      className={clsx(
        "flex shrink justify-center items-center py-2 px-10 w-full md:max-w-[101px] text-sm rounded-md focus:ring-2 focus:ring-primary focus:ring-offset-2 ring-offset-bg",
        !walletAddress
          ? "text-contrast-lower bg-contrast-higher hover:bg-contrast-medium"
          : isLoading
          ? "text-contrast-medium bg-contrast-lower animate-pulse"
          : isFollowing
          ? "text-contrast-high hover:text-error-darker bg-bg hover:bg-error-dark/30 border hover:border-error"
          : "text-bg bg-contrast-higher hover:bg-contrast-medium",
      )}
      onClick={event => {
        return onClick(event);
      }}
      {...rest}
    >
      {!walletAddress ? (
        "Follow"
      ) : isLoading ? (
        <>
          <LoadingDots />
          &nbsp;
        </>
      ) : isFollowing ? (
        isHovered ? (
          "Unfollow"
        ) : (
          "Following"
        )
      ) : (
        "Follow"
      )}
    </button>
  );
};
