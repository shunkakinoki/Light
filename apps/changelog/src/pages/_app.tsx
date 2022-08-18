import { Analytics, Seo, ThemeScript, ThemeProvider } from "@lightdotso/core";
import type { AppProps } from "next/app";
import type { FC } from "react";
import "@lightdotso/changelog/styles/index.css";
import { useEffect, useState } from "react";

const CustomApp: FC<AppProps> = ({ Component, pageProps }) => {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

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
