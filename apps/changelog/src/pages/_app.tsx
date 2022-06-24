import { Analytics, Seo, ThemeScript } from "@lightdotso/core";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import type { FC } from "react";
import "@lightdotso/changelog/styles/index.css";

const CustomApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <ThemeScript />
      <ThemeProvider defaultTheme="dark" forcedTheme="dark">
        <Analytics>
          <Seo />
          <Component {...pageProps} />
        </Analytics>
      </ThemeProvider>
    </>
  );
};

export default CustomApp;
