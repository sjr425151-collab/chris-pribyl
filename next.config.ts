import type { NextConfig } from "next";

/**
 * Preview build: a fully static export served under a sub-path
 * (default /preview/dynamicconstruction). No server runtime is required, so
 * any static host can serve the `out/` folder.
 *
 * For the production launch, remove `output`/`basePath`, re-enable the image
 * optimizer and add server-side lead delivery (see README → "Going to production").
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/preview/dynamicconstruction";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    // Static export has no image optimizer; source photos are pre-sized WebP.
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
