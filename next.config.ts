import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` writes the site to ./out, which `pnpm start` serves.
  output: "export",
  // URLs like /vi/products/ map to /vi/products/index.html in the exported folder.
  trailingSlash: true,
  // `next dev` blocks JS/HMR requests from other origins; allow Cloudflare quick tunnels.
  allowedDevOrigins: ["*.trycloudflare.com"],
  images: {
    // The default image optimizer needs a Node server, which a static export doesn't have.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
};

export default nextConfig;
