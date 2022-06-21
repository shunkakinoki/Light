// Code from: https://github.com/kodingdotninja/use-tailwind-breakpoint

import tailwindConfig from "@lightdotso/tailwindcss";
import { useState, useRef, useEffect } from "react";
import resolveConfig from "tailwindcss/resolveConfig";

export const useBreakpoint = (
  breakpoint: string,
  defaultValue: boolean = false,
) => {
  const [match, setMatch] = useState(() => {
    return defaultValue;
  });
  const matchRef = useRef(defaultValue);
  const config = resolveConfig(tailwindConfig);

  useEffect(() => {
    const track = () => {
      const value = (config.theme.screens[breakpoint] as string) ?? "999999px";
      const query = window.matchMedia(`(min-width: ${value})`);
      matchRef.current = query.matches;
      if (matchRef.current != match) {
        setMatch(matchRef.current);
      }
    };

    window.addEventListener("resize", track);
    return () => {
      return window.removeEventListener("resize", track);
    };
  });

  return match;
};
