const { ModuleFederationPlugin } = require('webpack').container;

const { dependencies } = require('./package.json');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    if (!options.isServer) {
      config.plugins.push(
        new ModuleFederationPlugin({
          name: 'host',
          filename: 'remoteEntry.js',
          remotes: {
            webrtcMfe: 'webrtcMfe@http://localhost:3002/remoteEntry.js'
          },
          shared: dependencies
        })
      );
    }

    return config;
  }
};

module.exports = nextConfig;
