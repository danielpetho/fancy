const withMDX = require("@next/mdx")()

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        port: "",
        hostname: "musicbrainz.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fancycomponents.b-cdn.net",
        port: "",
        pathname: "/**",
      }
    ],
  },
}

module.exports = withMDX(nextConfig)
