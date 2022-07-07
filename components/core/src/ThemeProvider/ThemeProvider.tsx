import { ThemeProvider as NextThemeProvider } from "next-themes";
import type { FC } from "react";

export const ThemeProvider: FC = ({ children }) => {
  const savedTheme =
    typeof window !== "undefined"
      ? (localStorage.getItem("theme") as any)
      : undefined;
  const defaultTheme = ["dark", "light"].includes(savedTheme)
    ? savedTheme
    : "dark";

  return (
    <NextThemeProvider defaultTheme={defaultTheme} forcedTheme="dark">
      {children}
    </NextThemeProvider>
  );
};
