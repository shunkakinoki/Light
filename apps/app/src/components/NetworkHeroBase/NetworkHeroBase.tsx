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
        <div className="flex justify-center lg:justify-start items-center mt-6 md:mt-6 space-x-3 md:space-x-4 w-full">
          <div className="shrink-0">
            <NetworkHeroShareButton id={id} type={type} />
          </div>
          {button}
        </div>
      )}
    </div>
  );
};
