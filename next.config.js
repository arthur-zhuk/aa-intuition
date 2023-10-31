/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: { appDir: true },
  // reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        port: "",
        pathname: "/**/*",
      },
    ],
  },
};

module.exports = nextConfig;
