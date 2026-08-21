/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xvfkjtxglaxvmtpedkkx.supabase.co",
      },
    ],
  },
};

export default nextConfig;