/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "job-portal-version1.s3.us-east-1.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
