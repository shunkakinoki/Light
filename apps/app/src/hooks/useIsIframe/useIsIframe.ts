import { useEffect, useState } from "react";

export const useIsIframe = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (window && (window === window.parent) === false) {
      return setMounted(true);
    }
  }, []);

  return mounted;
};
