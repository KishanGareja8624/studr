/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/dashboard/docs',
          permanent: true, 
        },
      ];
    },
  };
  
  export default nextConfig;
  