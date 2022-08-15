import { ThemeProvider as NextThemeProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import type { FC } from "react";
import { useEffect, useState } from "react";

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  ...props
}) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const savedTheme = isClient
    ? (localStorage.getItem("theme") as any)
    : undefined;
  const defaultTheme = ["dark", "light"].includes(savedTheme)
    ? savedTheme
    : "dark";

  return (
    <NextThemeProvider
      defaultTheme={defaultTheme}
      forcedTheme="dark"
      {...props}
    >
      {children}
    </NextThemeProvider>
  );
};
