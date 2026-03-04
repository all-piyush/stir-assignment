/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */

  images: {
    domains: ["m.media-amazon.com"],
  },
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://movie-ai-app-env.eba-sk3fwnp8.ap-south-1.elasticbeanstalk.com/api/:path*',
      },
    ];
  },
};

export default nextConfig;
