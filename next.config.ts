import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
