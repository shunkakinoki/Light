import type { FC } from "react";

import { NetworkAvatar } from "@lightdotso/app/components/NetworkAvatar";
import { NetworkHeroBase } from "@lightdotso/app/components/NetworkHeroBase";
import { NetworkHeroDescription } from "@lightdotso/app/components/NetworkHeroDescription";
import { NetworkHeroDescriptionLoading } from "@lightdotso/app/components/NetworkHeroDescriptionLoading";
import { NetworkHeroExternalButton } from "@lightdotso/app/components/NetworkHeroExternalButton";
import { PlaceholderAvatarLoading } from "@lightdotso/app/components/PlaceholderAvatarLoading";
import { useQueueNetworkSnapshot } from "@lightdotso/app/hooks/useQueueNetworkSnapshot";
import { useSnapshotSpace } from "@lightdotso/app/hooks/useSnapshotSpace";

export type NetworkHeroProps = { spaceId: string };

export const NetworkHeroSnapshot: FC<NetworkHeroProps> = ({ spaceId }) => {
  useQueueNetworkSnapshot(spaceId);
  const { space, isLoading } = useSnapshotSpace(spaceId);

  return (
    <NetworkHeroBase
      isLoading={isLoading}
      id={spaceId}
      type="snapshot"
      avatar={
        <>
          {!space?.avatar ? (
            <PlaceholderAvatarLoading className="h-24 w-24 md:h-32 md:w-32" />
          ) : (
            <NetworkAvatar
              className="h-24 w-24 md:h-32 md:w-32"
              avatar={space?.avatar}
              name={space?.name}
              id={spaceId}
            />
          )}
        </>
      }
      button={
        <NetworkHeroExternalButton href={`https://snapshot.org/#/${spaceId}`}>
          View on Snapshot
        </NetworkHeroExternalButton>
      }
    >
      <div className="flex justify-center lg:justify-start" />
      {isLoading ? (
        <NetworkHeroDescriptionLoading />
      ) : (
        <NetworkHeroDescription
          title={space?.name}
          people={space?.followersCount}
          description={space?.about}
        />
      )}
    </NetworkHeroBase>
  );
};
