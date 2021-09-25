const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const paths = require('../config/paths');

function config() {
  const appConfig = {
    name: 'app',
    entry: paths.appIndex,
    output: {
      path: paths.appBuild,
      publicPath: '/',
      uniqueName: 'app'
    },

    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: { ecma: 8 },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2
            },
            mangle: { safari10: true },
            output: { ecma: 5, comments: false, ascii_only: true }
          }
        })
      ],
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          commons: {
            test: /[\\/].yarn[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      },
      runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`
      }
    },

    performance: {
      maxAssetSize: 650 * 1024,
      maxEntrypointSize: 650 * 1024
    },

    resolve: {
      extensions: ['.wasm', '.mjs', '.js', '.ts', '.d.ts', '.tsx', '.json']
    },

    module: {
      rules: [
        {
          oneOf: [
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: require.resolve('url-loader'),
              options: {
                limit: 10000,
                name: 'static/media/[name].[hash:8].[ext]'
              }
            },
            {
              test: /\.(js|mjs|ts|tsx)$/,
              include: paths.appSrc,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  rootMode: 'upward',
                  cacheDirectory: '.cache/babel-loader',
                  cacheCompression: false,
                  compact: false, // isEnvProduction,
                  sourceType: 'unambiguous'
                }
              }
            },
            {
              test: /\.svg$/,
              use: ['@svgr/webpack']
            },
            {
              test: /\.(eot|otf|ttf|woff|woff2)$/,
              loader: require.resolve('file-loader'),
              options: {
                name: 'static/media/[name].[hash:8].[ext]'
              }
            }
          ]
        }
      ]
    },

    resolve: {
      extensions: ['.js', '.jsx']
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env.APP_NAME': JSON.stringify('React App'),
        'process.env.APP_ORIGIN': JSON.stringify('http://localhost:3000')
      }),
      new WebpackManifestPlugin({ fileName: 'assets.json', publicPath: '/' }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      })
    ].filter(Boolean)
  };

  return appConfig;
}

module.exports = config;
