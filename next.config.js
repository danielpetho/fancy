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
        hostname: "images.ctfassets.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        port: "",
        hostname: "videos.ctfassets.net",
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
        hostname: "cdn.cosmos.so",
        port: "",
        pathname: "/**",
      },
    ],
  },
}

module.exports = withMDX(nextConfig)
