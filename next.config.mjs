/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
		  { protocol: 'https', hostname: '*' },
		  { protocol: 'http', hostname: '*' },
		],
		domains: ['cdn-icons-png.flaticon.com'], // FLATICON domenini qo‘shdik
	  },
	};

export default nextConfig
