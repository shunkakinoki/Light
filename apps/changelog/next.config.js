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
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        __SENTRY_DEBUG__: false,
        __SENTRY_TRACING__: false,
      }),
    );
    return config;
  },
};

module.exports = withPlugins(plugins, config);
