const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
      app: './src/index.js',
    },
  
    output: {
      filename: 'js/app.js',
      chunkFilename: 'js/[name].[chunkhash].js',
      path: path.resolve(__dirname,'dist'),
    },
  
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: 'images/[name].[hash].[ext]',
              },
            },
          ],
        },
  
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: 'fonts/[name].[hash].[ext]',
              },
            },
          ],
        },
      ],
    },
  
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        inject: true,
        template: 'public/index.html',
      }),
    ],
  
    optimization: {
      runtimeChunk: true,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendors: {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -20,
          },
        },
      },
    },
  };
  