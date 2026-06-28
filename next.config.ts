import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/nour-essence",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
