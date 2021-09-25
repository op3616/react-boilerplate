const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const paths = require('../config/paths');

module.exports = function config() {
  const appConfig = {
    mode: 'development',
    target: 'web',

    output: {
      filename: 'static/js/[name].js',
      chunkFilename: 'static/js/[name].js'
    },

    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.(js|mjs|ts|tsx)$/,
              include: paths.appSrc,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  plugins: [require.resolve('react-refresh/babel')]
                }
              }
            },
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader']
            }
          ]
        }
      ]
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin(),
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      })
    ],

    devtool: 'cheap-module-source-map'
  };

  const devServer = {
    static: {
      directory: paths.appPublic
    },
    compress: true,
    historyApiFallback: true,
    open: true,
    port: 3000
  };

  return { ...appConfig, devServer };
};
