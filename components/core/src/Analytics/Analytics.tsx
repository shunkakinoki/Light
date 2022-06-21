import PlausibleProvider from "next-plausible";
import type { FC } from "react";

export const Analytics: FC = ({ children }) => {
  return (
    <PlausibleProvider trackOutboundLinks domain="light.so">
      {children}
    </PlausibleProvider>
  );
};
