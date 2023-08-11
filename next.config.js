const { ModuleFederationPlugin } = require('webpack').container;

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
          }
        })
      );
    }

    return config;
  }
};

module.exports = nextConfig;
