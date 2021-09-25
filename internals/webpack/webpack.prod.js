const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const InlineChunkHtmlPlugin = require('inline-chunk-html-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const paths = require('../config/paths');

module.exports = function config() {
  const isEnvProductionProfile = process.argv.includes('--profile');

  const appConfig = {
    mode: 'production',
    target: 'browserslist',
    bail: true,

    output: {
      filename: 'static/js/[name].[contenthash:8].js',
      chunkFilename: 'static/js/[name].[contenthash:8].js'
    },

    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            keep_classnames: isEnvProductionProfile,
            keep_fnames: isEnvProductionProfile
          }
        }),
        new CssMinimizerPlugin()
      ]
    },

    resolve: {
      alias: {
        ...(isEnvProductionProfile && {
          'react-dom$': 'react-dom/profiling',
          'scheduler/tracing': 'scheduler/tracing-profiling'
        })
      }
    },

    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        }
      ]
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
      }),
      new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: paths.appPublic,
            filter: filename => filename !== paths.appHtml
          }
        ]
      })
    ],

    devtool: 'source-map'
  };

  return appConfig;
};
