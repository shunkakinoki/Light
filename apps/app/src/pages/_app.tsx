import { Analytics, Seo, ThemeScript, ThemeProvider } from "@lightdotso/core";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import type { FC } from "react";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";
import "@lightdotso/app/styles/index.css";

import { Layout } from "@lightdotso/app/components/Layout";
import { NProgress } from "@lightdotso/app/components/NProgress";
import { Web3Provider } from "@lightdotso/app/components/Web3Provider";

// const Web3Provider = dynamic(
//   () => {
//     return import("@lightdotso/app/components/Web3Provider").then(mod => {
//       return mod.Web3Provider;
//     });
//   },
//   {
//     ssr: false,
//   },
// );

const CustomApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Web3Provider>
      <ThemeScript />
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
          <ThemeProvider>
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
  );
};

export default CustomApp;
