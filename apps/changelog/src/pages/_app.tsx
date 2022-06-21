import { Analytics, Seo, ThemeScript, ThemeProvider } from "@lightdotso/core";
import type { AppProps } from "next/app";
import type { FC } from "react";

import "@lightdotso/changelog/styles/index.css";

const CustomApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <ThemeScript />
      <ThemeProvider>
        <Analytics>
          <Seo />
          <Component {...pageProps} />
        </Analytics>
      </ThemeProvider>
    </>
  );
};

export default CustomApp;
