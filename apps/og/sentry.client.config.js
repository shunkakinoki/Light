import {
  ReportingObserver as ReportingObserverIntegration,
  ExtraErrorData as ExtraErrorDataIntegration,
  Debug as DebugIntegration,
  CaptureConsole as CaptureConsoleIntegration,
  Offline as OfflineIntegration,
} from "@sentry/integrations";
import * as Sentry from "@sentry/nextjs";

const version = require("./package.json").version;

const SENTRY_DSN = process.env.SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
  environment: "production",
  autoSessionTracking: true,
  tracesSampleRate: 1.0,
  release: `lightdotso@${version}`,
  integrations: [
    new CaptureConsoleIntegration({
      levels: ["error"],
    }),
    new DebugIntegration(),
    new ExtraErrorDataIntegration(),
    new ReportingObserverIntegration(),
    new OfflineIntegration(),
  ],
});
