const webpack = require('webpack')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development',
        DEBUG: false,
        SERVER_URL: ''
      }),
      new FaviconsWebpackPlugin({
        logo: './public/img/logo.png',
        prefix: 'icons/',
        title: 'Glo CI',
        background: '#141422'
      })
    ]
  },
  pwa: {
    themeColor: '#141422',
    iconPaths: {
      favicon32: 'icons/favicon-32x32.png',
      favicon16: 'icons/favicon-16x16.png',
      appleTouchIcon: 'icons/apple-touch-icon-152x152.png',
      maskIcon: 'icons/safari-pinned-tab.svg',
      msTileImage: 'icons/msapplication-icon-144x144.png'
    }
  }
}
