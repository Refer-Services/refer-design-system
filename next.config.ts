import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  outputFileTracingIncludes: {
    "/*": ["./registry/**/*"],
    // Component pages read demo and gallery sources with fs at request time (the (app) layout reads cookies, so
    // they render per request), so the function has to ship those files.
    "/components/*": ["./components/**/*.tsx"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "avatar.vercel.sh",
      },
    ],
  },
}

export default nextConfig
