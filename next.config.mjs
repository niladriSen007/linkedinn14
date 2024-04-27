/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "links.papareact.com",
      },
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },
}

export default nextConfig
