import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com', 'upload.wikimedia.org', 'commons.wikimedia.org', 'ico.org', 'ethiopiancoffeeassociation.org'],
  },
};

export default nextConfig;
