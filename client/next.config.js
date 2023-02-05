/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
  i18n: {
    locales: ["ru", "en", "kz"],
    defaultLocale: "ru",
  },
}

module.exports = nextConfig
