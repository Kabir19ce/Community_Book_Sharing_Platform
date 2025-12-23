/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8081",
        pathname: "/uploads/**", // allow images inside uploads folder
      },
    ],
  },
};

module.exports = nextConfig;
