import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ This disables ESLint errors during `next build`
  },
  // Add any other config you already have here
}

export default nextConfig
