const path = require('path');

module.exports = {
    entry: [
       __dirname+"/assets/js/panel.js",
    ],
    output: {
      path: __dirname+'/www',
      publicPath: '/',
      filename: 'panel.js'
    },
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
        publicPath:  "/",
        compress: true,
        port: 8000
    }
  };