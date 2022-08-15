import {
  Analytics,
  Seo,
  ThemeScript,
  ThemeProvider,
  ClientOnly,
} from "@lightdotso/core";
import type { AppProps } from "next/app";
import type { FC } from "react";
import "@lightdotso/changelog/styles/index.css";

const CustomApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ClientOnly>
      <ThemeScript />
      <ThemeProvider>
        <Analytics>
          <Seo />
          <Component {...pageProps} />
        </Analytics>
      </ThemeProvider>
    </ClientOnly>
  );
};

export default CustomApp;
