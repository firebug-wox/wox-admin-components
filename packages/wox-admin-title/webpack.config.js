const path = require('path');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');

const config = {
  devtool: 'cheap-module-eval-source-map',
  entry: './app.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist',
    filename: 'app.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new DashboardPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.less'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' }
        ],
      },
      {
        test: /\.less$/,
        exclude: /\.mod\.(less|css)/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer'),
              ]
            }
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            }
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /\.mod\.(less|css)/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer'),
              ]
            }
          }
        ],
      },
      {
        test: /\.mod\.(less|css)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              modules: true,
              importLoaders: 2,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer'),
              ]
            }
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            }
          },
        ],
      },
      {
        test: /\.(gif|jpe?g|png|ico)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: '[name]-[sha512:hash:base64:7].[ext]',
            outputPath: '/images/'
          }
        }
      }
    ]
  }
};

module.exports = config;
