const path = require('path');
const nodeExternals=require('webpack-node-externals');

module.exports = {
    entry: [
       __dirname+"/src/js/panel.js",
    ],
    output: {
      path: __dirname+'/www',
      publicPath: '/',
      filename: 'panel.js'
    },
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals:[
      nodeExternals()
    ],
    devtool: 'sourcemaps',
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
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
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
        contentBase: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'node_modules'),
        ],
        publicPath:  "/",
        compress: true,
        port: 8000
    }
  };