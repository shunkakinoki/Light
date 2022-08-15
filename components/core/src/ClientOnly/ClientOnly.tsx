import type { FC } from "react";
import { useEffect, useState } from "react";

export const ClientOnly: FC = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return children;
};
