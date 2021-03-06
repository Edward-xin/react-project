const {
  override,
  fixBabelImports,
  addLessLoader,
  addDecoratorsLegacy,
  addWebpackAlias
} = require("customize-cra");

module.exports = override(
  // 按需加载
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  // 自定义主题
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#1DA57A" }
  }),
  // ES7装饰器语法支持
  addDecoratorsLegacy(),
  // 路径别名
  addWebpackAlias({})
);
