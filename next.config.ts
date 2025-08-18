import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      new URL(
        "https://production-wemany-infra-st-communitybucketee1e8e45-pinluwumir3m.s3.us-east-2.amazonaws.com/**"
      ),
      new URL("https://cdn.wemany.com/**"),
    ],
  },
};

export default nextConfig;
