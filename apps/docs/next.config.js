const { withSentryConfig } = require("@sentry/nextjs");
const withPlugins = require("next-compose-plugins");
const { withPlausibleProxy } = require("next-plausible");
const withTM = require("next-transpile-modules")(["@lightdotso/core"]);
const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.js",
  unstable_contentDump: true,
  unstable_flexsearch: true,
  unstable_staticImage: true,
});

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
  withNextra,
  withPlausibleProxy,
  withTM,
];

/**
 * @type {import('next').NextConfig}
 */
const config = {
  basePath: "/docs",
  eslint: {
    ignoreDuringBuilds: true,
  },
  redirects: () => {
    return [
      {
        source: "/home",
        destination: "https://light.so",
        statusCode: 301,
      },
    ];
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
