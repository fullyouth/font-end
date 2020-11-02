let m = Symbol();
let n = Symbol();
console.log(m, n)

let obj = {
  name: 'zhq',
  [m] : '1',
  [n] : '1',
}

for(let key in obj) {
  console.log(key)
}
console.log(obj[n])

// 消除魔术字符串


/**
 * Symbol 不能被new 
 * instanceOf false
 * Symbol.prototype = Object(Symbol())
 * Symbol不能计算
 * 不参与for in/of  getSysmbols...
Symbol.hasInstance
 * 
 */
// Symbol

所有可悲迭代的对象 原型有Symbol.iterator 才能使用for of

应用vuex Redux

内置的sysbol值
