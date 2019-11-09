const path = require('path');

module.exports = {
    entry: [
        __dirname+"/assets/js/panel.js",
        __dirname+'/assets/saas/panel.scss'
    ],
    output: {
      path: __dirname+'/www',
      publicPath: '/',
      filename: 'panel.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader",
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: "[name]_[local]_[hash:base64]",
                sourceMap: true,
                minimize: true
              }
            }
          ]
        },
        {
            test: /\.s[ac]ss$/i,
            use: [ 
              {
                loader: 'file-loader',
                options: {
                    name:  __dirname+'/www/[name].css',
                }
              },
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