/** @type {import('next').NextConfig} */
import withPlaiceholder from "@plaiceholder/next";
const nextConfig = {
  images: {
    domains: ["api.themoviedb.org", "image.tmdb.org"],
  },
};

export default withPlaiceholder(nextConfig);
