/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["www.airlinestaffrates.com", "media.istockphoto.com"], // Add the domain here
    // You can also use a wildcard (*) to allow all hosts:
    // domains: ['*'],
    // Note: Using a wildcard (*) may have security implications, so use it cautiously.
    // Make sure to remove any sensitive information from your images or use other means to secure them.
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
