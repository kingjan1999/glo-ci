const webpack = require('webpack')
module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development',
        DEBUG: false,
        SERVER_URL: ''
      })
    ]
  }
}
