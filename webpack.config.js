import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    filename: '[name].[contenthash].js',
    // path: path.resolve(__dirname, '../dist'),
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: 'body',
      scriptLoading: 'defer',
      templateParameters: {
        scriptType: 'text/javascript',
      },
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
