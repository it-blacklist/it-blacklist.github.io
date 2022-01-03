const {
  when,
  whenDev,
  whenProd,
  whenTest,
  ESLINT_MODES,
  POSTCSS_MODES,
  loaderByName,
} = require('@craco/craco')
const CracoLessPlugin = require('craco-less')

module.exports = {
  reactScriptsVersion: 'react-scripts' /* (default value) */,
  style: {
    modules: {
      localIdentName: '',
    },
    css: {
      loaderOptions: (cssLoaderOptions, { env, paths }) => {
        return cssLoaderOptions
      },
    },
  },
  babel: {
    presets: [],
    plugins: [],
    loaderOptions: (babelLoaderOptions, { env, paths }) => {
      return babelLoaderOptions
    },
  },
  typescript: {
    enableTypeChecking: true, /* (default value)  */
  },
  webpack: {
    alias: {}, plugins: {
      add: [], /* An array of plugins */
      remove: [],  /* An array of plugin constructor's names (i.e. "StyleLintPlugin", "ESLintWebpackPlugin" ) */
    }, configure: (webpackConfig, { env, paths }) => {
      return webpackConfig
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://it-blacklist-a6de4b.service.tcloudbase.com/',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
  plugins: [
    {
      plugin: {
        overrideCracoConfig: ({
          cracoConfig,
          pluginOptions,
          context: { env, paths },
        }) => {
          return cracoConfig
        },
        overrideWebpackConfig: ({
          webpackConfig,
          cracoConfig,
          pluginOptions,
          context: { env, paths },
        }) => {
          return webpackConfig
        },
        overrideDevServerConfig: ({
          devServerConfig,
          cracoConfig,
          pluginOptions,
          context: { env, paths, proxy, allowedHost },
        }) => {
          return devServerConfig
        },
        overrideJestConfig: ({
          jestConfig,
          cracoConfig,
          pluginOptions,
          context: { env, paths, resolve, rootDir },
        }) => {
          return jestConfig
        },
      }, options: {},
    },
    {
      plugin: CracoLessPlugin,
      options: {
        modifyLessRule (lessRule, context) {
          // You have to exclude these file suffixes first,
          // if you want to modify the less module's suffix
          lessRule.exclude = /\.module\.less$/
          return lessRule
        },
        modifyLessModuleRule (lessModuleRule, context) {
          // Configure the file suffix
          lessModuleRule.test = /\.module\.less$/

          // Configure the generated local ident name.
          const cssLoader = lessModuleRule.use.find(loaderByName('css-loader'))
          cssLoader.options.modules = {
            localIdentName: '[local]_[hash:base64:5]',
          }
          return lessModuleRule
        },
      },
    }],
}