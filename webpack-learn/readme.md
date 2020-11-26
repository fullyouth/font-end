## 环境变量
参数配置
|参数|说明|类型
|:----|:----|:----|
--env | 当配置文件是一个函数时，会将环境变量传给这个函数 | string
--mode | 'development' 或者 'production' | string

webpack --env prod=1
```js
module.exports = (env, arg) => {
  // env { prod:1 }
  // arg.env = env
}
```

webpack --mode production
注意⚠️ `命令行`中的mode参数，会覆盖`配置文件`中的mode
```js
module.exports = (env, arg) => {
  // env { prod:1 }
  // arg { env, mode: 'production' }
  mode: 'development' // 打包模式实际是production
}
```
总结: 
- webpack命令行中的`--env` `--mode`作为参数传给 `webpack函数`中
- webpack`命令行mode` 会覆盖`config中的mode`配置

### 在配置文件中使用命令行参数
webpack.config.js
```js
// webpack.config.js是运行在node的,所以这里的环境变量需要通过命令行来设置
// cross-env NODE_ENV_1=true webpack 下面才能返回true
console.log(process.env.NODE_ENV_1) // undefined
module.exports = (env, arg) => {
  console.log(process.env.NODE_ENV_1) // undefined
}
```

### 代码中使用环境变量(全局)
这个需要使用webpack的一个插件`webpack.DefinePlugin`
```js
// cross-env NODE_ENV_1=true webpack
new webpack.DefinePlugin({
  'process.env.NODE_ENV_1': process.env.NODE_ENV_1
})
```
index.js
```js
// cross-env NODE_ENV_1=true webpack
// 在文件中使用环境变量，是webpack直接将字符转换成对应的字符串 写入文件
// console.log(true)
console.log(process.env.NODE_ENV_1)
```

还有一个问题
我们即使没有使用`webpack.DefinePlugin` 代码中依然可以使用`process.env.NODE_ENV` 本质是webpack内部默认调用了`webpack.DefinePlugin`来将`mode`注入到全局变量`process.env.NODE_ENV`中

注意⚠️: process.env.NODE_ENV 永远是根据webpack mode的模式来的，自定义`process.env.NODE_ENV`会覆盖mode传入给`process.env.NODE_ENV`的数据
## loader
|名称|作用|
|:----|:----|
raw-loader|
style-loader|
css-loader|解释(interpret) @import 和 url() ，会 import/require() 后再解析(resolve)它们。
extract-loader|
## plugin

|名称|作用|
|:----|:----|
HtmlWebpackPlugin|自动输出html