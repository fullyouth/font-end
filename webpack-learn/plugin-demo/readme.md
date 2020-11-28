## loader
|名称|作用|
|:----|:----|
raw-loader|加载文件原始内容（utf-8）
style-loader|将模块的导出作为样式添加到 DOM 中
css-loader|解释(interpret) @import 和 url() ，会 import/require() 后再解析(resolve)它们。
extract-loader|extract HTML and CSS from the bundle
## plugin

|名称|作用|
|:----|:----|
HtmlWebpackPlugin|自动输出html
extract-text-webpack-plugin|已弃用
mini-css-extract-plugin|该插件将CSS提取到单独的文件中
DefinePlugin|定义全局变量

- HtmlWebpackPlugin
简化了HTML文件的创建，这对于`文件名中包含哈希值的bundle`尤其有用，

- mini-css-extract-plugin vs extract-text-webpack-plugin

- DefinePlugin
定义全局变量
