import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    resolveAlias: {
      '@src': './src/app',
      '@components': './src/components',
      '@types': './src/types',
      '@stores': './src/stores',
      '@styles': './src/styles',
      '@lib': './src/lib',
      '@hooks': './src/hooks',
      '@localses': './public/locales',
      '@assets': './src/assets',
    },
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  webpack: (config: any) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@src': path.resolve(__dirname, 'src/app'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@stores': path.resolve(__dirname, 'src/stores'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@localses': path.resolve(__dirname, 'public/locales'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    }
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

export default nextConfig
