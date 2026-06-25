import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org"
      },
      {
        protocol: "https",
        hostname: "img.youtube.com"
      },
       {
        protocol: "https",
        hostname: "res.cloudinary.com"
      }
    ]
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);