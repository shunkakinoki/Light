const { withSentryConfig } = require("@sentry/nextjs");
const withPlugins = require("next-compose-plugins");
const { withPlausibleProxy } = require("next-plausible");
const withTM = require("next-transpile-modules")([
  "@lightdotso/const",
  "@lightdotso/core",
  "@lightdotso/types",
]);

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
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    forceSwcTransforms: process.env.CYPRESS_INSTRUMENT_CODE !== 1,
    scrollRestoration: true,
  },
  publicRuntimeConfig: {
    env: process.env.VERCEL_ENV || process.env.NEXT_PUBLIC_VERCEL_ENV,
  },
  async rewrites() {
    return [
      {
        source: "/changelog",
        destination: "https://changelog.light.so/changelog",
      },
      {
        source: "/changelog/:path*",
        destination: "https://changelog.light.so/changelog/:path*",
      },
      {
        source: "/docs",
        destination: "https://docs.light.so/docs",
      },
      {
        source: "/docs/:path*",
        destination: "https://docs.light.so/docs/:path*",
      },
      {
        source: "/home",
        destination: "https://home.light.so/home",
      },
      {
        source: "/home/:path*",
        destination: "https://home.light.so/home/:path*",
      },
      {
        source: "/lightpaper",
        destination: "https://home.light.so/home/lightpaper",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/analytics",
        destination: "https://plausible.io/light.so",
        permanent: true,
      },
      {
        source: "/notion",
        destination: "https://lightdotso.notion.site",
        permanent: true,
      },
      {
        source: "/whitepaper",
        destination: "/docs",
        permanent: true,
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
