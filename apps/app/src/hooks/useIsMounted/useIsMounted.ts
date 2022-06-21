import { useEffect, useState } from "react";

export const useIsMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    return setMounted(true);
  }, []);

  return mounted;
};
