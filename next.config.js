const withTypescript = require('@zeit/next-typescript')
const cssLoaderConfig = require('@zeit/next-css/css-loader-config')
const path = require('path')
module.exports = withTypescript({
  webpack (config, options) {
    const { dev, isServer } = options
    config.module.rules.push(
      {
        test: /\.scss$/,
        exclude: path.resolve(__dirname, 'static/lib'),
        use: cssLoaderConfig(config, {
          extensions: ['scss', 'sass'],
          cssModules: true,
          cssLoaderOptions: {
            // modules: true,
            importLoaders: 1,
            localIdentName: '[local]-[hash:base64:5]'
            // localIdentName: '[path][name][local]--[hash:base64:5]'
          },
          dev,
          isServer,
          loaders: [
            {
              loader: 'sass-loader',
              options: {
                includePaths: [path.resolve(__dirname, 'static/style')]
              }
            }
          ]
        })
      },
      // 全局样式 不使用css modules
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'static/lib'),
        use: cssLoaderConfig(config, {
          extensions: ['scss', 'sass'],
          dev,
          isServer,
          loaders: [
            {
              loader: 'sass-loader'
            }
          ]
        })
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            publicPath: './',
            outputPath: 'static/',
            name: 'img/[name].[hash:7].[ext]'
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          publicPath: './',
          outputPath: 'static/',
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          publicPath: './',
          outputPath: 'static/',
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    )
    return config
  }
})