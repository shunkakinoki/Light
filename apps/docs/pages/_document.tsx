import { SkipNavLink } from "@reach/skip-nav";
import {
  Head,
  Html,
  Main,
  default as NextDocument,
  NextScript,
} from "next/document";

class CustomDocument extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.svg" />
        </Head>
        <body>
          <SkipNavLink />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
