const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const { join } = require('path');

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: join(__dirname, 'public'),
    writeToDisk: true,
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 3001,
    host: '192.168.0.107',
  },
  plugins: [
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify('http://localhost:3001/api'),
    }),
    new HtmlWebpackPlugin({
      template: './template.dev.html',
      filename: 'index.html',
      cache: false,
    }),
  ],
});
