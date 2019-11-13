const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: [
        __dirname+"/assets/js/panel.js",
    ],
    output: {
      path: __dirname+'/www',
      publicPath: '/',
      filename: 'panel.js'
    },
    target: 'node',
    externals:[nodeExternals()],
    module: {
      rules: [
        {
           test: /\.css$/,
           use: [
            'style-loader',
            'css-loader',
           ],
        },
        {
          test: /\.js$/,
          loader: 'babel-loader'
        },
        {
            test: /\.scss$/,
            use: [ 
              {
                loader:'style-loader',
              },
              // Translates CSS into CommonJS
              {
                loader:'css-loader'
              },
              // Compiles Sass to CSS
              {
                loader:'sass-loader'
              },
            ],
        },
        {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
              { 
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: 'fonts/'
               }
              }
            ]
        }
      ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'www'),
        compress: true,
        port: 8000
    }
  };