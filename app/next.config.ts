import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Previews carry `?v=<file mtime>` so a file replaced in place shows its new pixels
    // (Next 16 caches optimized images for 4 h by URL). `search` is left out on purpose:
    // that allows any query on /assets/**, which is fine for an internal helper that only
    // serves its own repo files.
    localPatterns: [
      { pathname: "/assets/**" }, // repo assets — any ?v=
      { pathname: "/**", search: "" }, // everything else (the header logo) — no query
    ],
  },
};

export default nextConfig;
