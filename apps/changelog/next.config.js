const { withSentryConfig } = require("@sentry/nextjs");
const withPlugins = require("next-compose-plugins");
const { withPlausibleProxy } = require("next-plausible");
const withTM = require("next-transpile-modules")(["@lightdotso/core"]);

const SentryWebpackPluginOptions = {
  silent: false,
};

const plugins = [
  nextConfig => {
    if (process.env.VERCEL_ENV === "production") {
      return withSentryConfig(nextConfig, SentryWebpackPluginOptions);
    }
    return {};
  },
  withPlausibleProxy,
  withTM,
];

/**
 * @type {import('next').NextConfig}
 */
const config = {
  basePath: "/changelog",
  experimental: {
    optimizeCss: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = withPlugins(plugins, config);
