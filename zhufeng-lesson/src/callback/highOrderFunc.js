// 高阶函数   1.参数 是函数 2.返回函数

// 装饰器模式(对原本的功能进行包装)
function core(...arg) {
  console.log(arg)
}

Function.prototype.before = function(beforeFn) {
  return (...args) => { // 剩余运算符
    beforeFn()
    this(...args) // 拓展运算符
  }
}

const wrap = core.before(() => {
  console.log('1')
})

wrap(2, 3, 4)