/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  experimental: { esmExternals: true },
  trailingSlash: true,
}

const removeImports = require('next-remove-imports')()
module.exports = removeImports(nextConfig)
