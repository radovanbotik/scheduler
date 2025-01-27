import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/users/:id/profile/settings",
        destination: "/users/:id/profile/settings/general",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
