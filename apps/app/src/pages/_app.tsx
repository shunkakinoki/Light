import { Analytics, Seo, ThemeScript } from "@lightdotso/core";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import type { FC } from "react";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";
import "@lightdotso/app/styles/index.css";

import { Layout } from "@lightdotso/app/components/Layout";
import { NProgress } from "@lightdotso/app/components/NProgress";
import { Web3Provider } from "@lightdotso/app/components/Web3Provider";

const CustomApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <ThemeScript />
      <Web3Provider>
        <RecoilRoot>
          <SWRConfig
            value={{
              onError: (err, key, config) => {
                console.error(err, key, config);
              },
              onErrorRetry: (err, key, config, revalidate, revalidateOps) => {
                console.error(err, key, config, revalidate, revalidateOps);
              },
              onSuccess: (data, key, config) => {
                // eslint-disable-next-line no-console
                console.info(data, key, config);
              },
            }}
          >
            <ThemeProvider defaultTheme="dark" forcedTheme="dark">
              <Analytics>
                <Layout>
                  <Seo />
                  <NProgress />
                  <Component {...pageProps} />
                </Layout>
              </Analytics>
            </ThemeProvider>
          </SWRConfig>
        </RecoilRoot>
      </Web3Provider>
    </>
  );
};

export default CustomApp;
