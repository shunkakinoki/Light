const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["@lightdotso/core"]);

const plugins = [withTM];

/**
 * @type {import('next').NextConfig}
 */
const config = {
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
