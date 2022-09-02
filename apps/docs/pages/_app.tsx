import { Analytics, Seo, ThemeScript, ThemeProvider } from "@lightdotso/common";
import type { AppProps } from "next/app";
import type { FC } from "react";

// eslint-disable-next-line no-restricted-imports
import "../styles/globals.css";
import "nextra-theme-docs/style.css";

const CustomApp: FC<AppProps> = ({ Component, pageProps }) => {
  const getLayout =
    (Component as any).getLayout ||
    ((page: React.ReactElement) => {
      return page;
    });

  return (
    <>
      <ThemeScript />
      <ThemeProvider forcedTheme={undefined}>
        <Analytics>
          <Seo />
          {getLayout(<Component {...pageProps} />)}
        </Analytics>
      </ThemeProvider>
    </>
  );
};

export default CustomApp;
