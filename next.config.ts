import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config: any) => {
    config.resolve.alias = {
      ...config(config.resolve.alias || {}),
      '@src': path.resolve(__dirname, 'src/app'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@stores': path.resolve(__dirname, 'src/stores'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@localses': path.resolve(__dirname, 'public/locales'),
    }
    return config
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
