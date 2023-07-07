/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/solidity-website',
  experimental: { esmExternals: true },
  images: {
    unoptimized: true,
  },
  env: {
    PUBLIC_URL: 'https://wackerow.github.io/solidity-website',
    assetPrefix: './',
  },
}

const removeImports = require('next-remove-imports')()
module.exports = removeImports(nextConfig)
