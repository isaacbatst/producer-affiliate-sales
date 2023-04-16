/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
  }
}

if(process.env.STANDALONE) {
  nextConfig.output = 'standalone'
}

module.exports = nextConfig
