import type { NextConfig } from "next";

const isExport = process.env.EXPORT === "1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(isExport
    ? { output: "export" as const, distDir: "static-site" }
    : {}),
};

export default nextConfig;
