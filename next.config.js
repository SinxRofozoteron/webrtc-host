const { ModuleFederationPlugin } = require('webpack').container;

const federationConfig = {
  name: 'host',
  filename: 'remoteEntry.js',
  remotes: {
    webrtcMfe: 'webrtcMfe@http://localhost:3002/remoteEntry.js'
  }
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    if (!options.isServer) {
      config.plugins.push(new ModuleFederationPlugin(federationConfig));
    }

    return config;
  }
};

module.exports = nextConfig;
