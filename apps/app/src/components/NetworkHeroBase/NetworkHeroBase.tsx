import type { FC, ReactNode } from "react";

import { NetworkHeroShareButton } from "@lightdotso/app/components/NetworkHeroShareButton";

export type NetworkHeroBaseProps = {
  id: string;
  isLoading: boolean;
  avatar: ReactNode;
  button: ReactNode;
  type: "snapshot" | "poap";
};

export const NetworkHeroBase: FC<NetworkHeroBaseProps> = ({
  id,
  isLoading,
  avatar,
  children,
  type,
  button,
}) => {
  return (
    <div className="mx-auto">
      <div className="flex justify-center lg:justify-start">{avatar}</div>
      {children}
      {!isLoading && (
        <div className="mt-6 flex w-full items-center justify-center space-x-3 md:mt-6 md:space-x-4 lg:justify-start">
          <div className="shrink-0">
            <NetworkHeroShareButton id={id} type={type} />
          </div>
          {button}
        </div>
      )}
    </div>
  );
};
