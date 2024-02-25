/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        REACT_APP_API_BASEURL: process.env.REACT_APP_API_BASEURL,
    }
};

export default nextConfig;
