import tailwindConfig from "@lightdotso/tailwindcss";
import { useEffect, useState } from "react";
import resolveConfig from "tailwindcss/resolveConfig";

export const useIsMobile = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const handleSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    handleSize();

    window.addEventListener("resize", handleSize);

    return () => {
      return window.removeEventListener("resize", handleSize);
    };
  }, []);

  return (
    resolveConfig(tailwindConfig).theme.screens["sm"].replace(/\D/g, "") >
    windowSize.width
  );
};
