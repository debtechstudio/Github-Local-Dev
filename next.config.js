/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'canvas': false,
      'pdfkit': false,
    };
    // Fixes npm packages that depend on `fs` module
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      module: false,
      path: false,
      os: false,
      crypto: false,
    };
    return config;
  },
};

module.exports = nextConfig;
