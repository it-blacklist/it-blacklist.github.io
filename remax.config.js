//const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  pxToRpx: false,
  configWebpack: ({ config, addCSSRule }) => {
    // 详细配置参考 copy-webpack-plugin
    //  config.plugin('copy').use(CopyPlugin, [[{ from: 'src/assets', to: 'assets' }]])
    // 引用 wxss
    addCSSRule({
      name: 'wxss',
      test: /\.wxss(\?.*)?$/,
    })
  }
}