import { Analytics, Seo, ThemeScript, ThemeProvider } from "@lightdotso/common";
import type { Session } from "next-auth";
import type { AppProps } from "next/app";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";

import "@rainbow-me/rainbowkit/styles.css";
import "@lightdotso/app/styles/index.css";
import { Layout } from "@lightdotso/app/components/Layout";
import { NProgress } from "@lightdotso/app/components/NProgress";
import { SeoLight } from "@lightdotso/app/components/SeoLight";
import { Web3Provider } from "@lightdotso/app/components/Web3Provider";
import { splitAddress } from "@lightdotso/app/utils/splitAddress";

interface CustomAppProps extends AppProps {
  pageProps: {
    ens?: string;
    name?: string;
    id?: string;
    address?: string;
    session?: Session;
  };
}

const CustomApp: FC<CustomAppProps> = ({ Component, pageProps }) => {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return (
      <SeoLight
        ogpName={
          pageProps?.ens ??
          pageProps?.name ??
          pageProps?.id ??
          pageProps?.id.startsWith("0x")
            ? splitAddress(pageProps?.id)
            : pageProps?.id ??
              (pageProps?.address && splitAddress(pageProps?.address)) ??
              ""
        }
      />
    );
  }

  return (
    <>
      <ThemeScript />
      <Web3Provider session={pageProps?.session}>
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
    </>
  );
};

export default CustomApp;
