// remax.config.js 默认配置
module.exports = {
  // boolean | RegExp 开启或关闭 css modules，支持传入正则表达式配置开启的文件命名格式
  cssModules: /\.module\.(less|scss|css)$/,
  // 配置项目路径，默认当前路径
  cwd: process.cwd(),
  // 是否显示 build 进度，默认显示
  progress: true,
  // 指定代码的根目录，默认 src
  rootDir: 'src',
  // build 目录，默认 dist
  output: 'dist',
  // 配置路径别名
  alias: {},
  // 是否开启 wxml/axml 文件压缩
  compressTemplate: process.env.NODE_ENV === 'production',
  // 是否将 px 转换为 rpx, 默认是 true
  pxToRpx: false,
  postcss: {
    options: {
      //use: [
      //  [
      //    'less',
      //    {
      //      paths: [
      //        // 可方便解析 node_modules 中样式文件
      //        //path.resolve(__dirname, 'node_modules'),
      //        // 可作为全局样式目录
      //        //path.resolve(__dirname, 'src/assets/styles'),
      //      ],
      //    },
      //  ],
      //  // 其他样式文件配置，比如sass, stylus, 如果有多种样式文件，则也需要添加对应配置
      //  ['stylus', {}],
      //],
    },
    url: {
      // 是否自动将图片转换成 base64
      inline: false,
      // 转换图片的最大限制， 单位 KB
      maxSize: 8,
    },
    // 其他postcss 插件, 会和默认的插件进行拼接
    plugins: [],
  },
  // 修改 rollup 的配置
  //rollupOptions: options => {
  //  options.input.push('foo.js');
  //  return options;
  //},
};