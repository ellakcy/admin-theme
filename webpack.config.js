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
      ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'www'),
        compress: true,
        port: 8000
    }
  };