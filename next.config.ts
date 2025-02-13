import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Replace with the actual domain
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
