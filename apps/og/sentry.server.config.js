import * as Sentry from "@sentry/nextjs";

const version = require("./package.json").version;

const SENTRY_DSN = process.env.SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
  environment: "production",
  tracesSampleRate: 1.0,
  release: `lightdotso@${version}`,
});
