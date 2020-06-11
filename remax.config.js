module.exports = {
  pxToRpx: false,
  configWebpack: ({ addCSSRule }) => {
    // 引用 wxss
    addCSSRule({
      name: 'wxss',
      test: /\.wxss(\?.*)?$/,
    })
  }
}