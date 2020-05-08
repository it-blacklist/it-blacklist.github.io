const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  pxToRpx: false,
  configWebpack: ({ config }) => {
    // 详细配置参考 copy-webpack-plugin
    config.plugin('copy').use(CopyPlugin, [[{ from: 'src/assets', to: 'assets' }]])
  }
}