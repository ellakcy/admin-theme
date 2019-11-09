const path = require('path');

module.exports = {
    entry: [
        __dirname+"/assets/js/panel.js",
        __dirname+'/assets/saas/panel.scss'
    ],
    output: {
      path: __dirname+'/vendor',
      publicPath: '/',
      filename: 'panel.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "script-loader"
          }
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
                    name:  __dirname+'/assets/css/[name].css',
                }
              },
              // Creates `style` nodes from JS strings
              'style-loader',
              // Translates CSS into CommonJS
              'css-loader',
              // Compiles Sass to CSS
              'sass-loader',

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