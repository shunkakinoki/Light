import type { FC } from "react";

import { NetworkAvatar } from "@lightdotso/app/components/NetworkAvatar";
import { NetworkHeroBase } from "@lightdotso/app/components/NetworkHeroBase";
import { NetworkHeroDescription } from "@lightdotso/app/components/NetworkHeroDescription";
import { NetworkHeroDescriptionLoading } from "@lightdotso/app/components/NetworkHeroDescriptionLoading";
import { NetworkHeroInternalButton } from "@lightdotso/app/components/NetworkHeroInternalButton";
import { PlaceholderAvatarLoading } from "@lightdotso/app/components/PlaceholderAvatarLoading";
import { NETWORK_PEOPLE_QUERY_NUMBER } from "@lightdotso/app/config/Query";
import { usePoapEvent } from "@lightdotso/app/hooks/usePoapEvent";
import { usePoapEventTokens } from "@lightdotso/app/hooks/usePoapEventTokens";

export type NetworkHeroProps = { eventId: string };

export const NetworkHeroPoap: FC<NetworkHeroProps> = ({ eventId }) => {
  const { event, isLoading } = usePoapEvent(eventId);
  const {
    total,
    tokens,
    isLoading: isTokensLoading,
  } = usePoapEventTokens(eventId, NETWORK_PEOPLE_QUERY_NUMBER);

  return (
    <NetworkHeroBase
      isLoading={isLoading}
      id={eventId}
      type="poap"
      avatar={
        <>
          {!event ? (
            <PlaceholderAvatarLoading className="h-24 w-24" />
          ) : (
            <NetworkAvatar
              className="h-24 w-24"
              avatar={event.image_url}
              name={event.name}
              id={eventId}
            />
          )}
        </>
      }
      button={
        <>
          {!isTokensLoading && (
            <NetworkHeroInternalButton href={`/asset/poap/${tokens[0][0].id}`}>
              View POAP
            </NetworkHeroInternalButton>
          )}
        </>
      }
    >
      <div className="flex justify-center lg:justify-start" />
      {isLoading ? (
        <NetworkHeroDescriptionLoading />
      ) : (
        <NetworkHeroDescription
          title={event.name}
          people={total}
          description={event.description}
        />
      )}
    </NetworkHeroBase>
  );
};
