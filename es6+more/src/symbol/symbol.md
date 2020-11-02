## 概述
Symbol 新的`基本数据类型`，表示独一无二的值。 

前6中 `undefined null number boolean string object`

对象的属性名可以有2中类型 string symbol

## usage

Symbol函数可接受`字符串`作为参数，表示实例的描述，没有实际用处
```js
const s1 = Symbol('123')
console.log(s1) // Symbol(123)
```

Symbol参数如果是`对象``数组`等实例具有toString属性的，会将其转换为字符串（调用实例方法toString），然后在生成Symbol值
```js
const s2 = Symbol({
  name: 'zhq'
})
console.log(s2) // Symbol([object Object])

// 6种数据类型
Symbol({ name: 'zhq' }) // Symbol([object Object])
Symbol('123')           // Symbol(123)
Symbol(123)             // Symbol(123)
Symbol(false)           // Symbol(false)
Symbol(null)            // Symbol(null)
Symbol(undefined)       // Symbol() 🤨

// 甚至
Symbol([true,'123'])    // Symbol(true,12)
Symbol(Symbol)          // Symbol(function Symbol() { [native code] })
// but 🤨
Symbol(Symbol())        // Cannot convert a Symbol value to a string
```

警告 👉 Symbol函数不能使用new, 报错`Symbol is not a constructor
    at new Symbol`  
```js
var sym = new Symbol(); // Uncaught TypeError: Symbol is not a constructor
```    
会阻止创建一个显式的 Symbol 包装器对象而不是一个 Symbol 值。

警告 👉 围绕原始数据类型创建一个显式包装器对象从 ECMAScript 6 开始不再被支持。 然而，现有的原始包装器对象，如 new Boolean、new String以及new Number，因为遗留原因仍可被创建。

## 类型转换

__类型判断__  
类似于string基本类型  
symbol是基本数据类型(不是引用型)，所以可以直接使用typeof判断
```js
const s1 = Symbol()
console.log(typeof s1) // symbol
```

__类型转换__  
警告 👉 当使用symbol值进行类型转换时需要特别注意  

1. symbol => number  隐式转换❌ 显式转换❌
```js
// 隐式转换
Symbol() + 1 // Uncaught TypeError: Cannot convert a Symbol value to a number

// 显式转换
Number(Symbol()) // Uncaught TypeError: Cannot convert a Symbol value to a number
```

2. symbol => string 隐式转换❌ 显式转换✅
```js
// 隐式转换
Symbol() + 'abc' // Uncaught TypeError: Cannot convert a Symbol value to a string
`${Symbol()}abc` // Uncaught TypeError: Cannot convert a Symbol value to a string

// 显式转换
String(Symbol('aa')) // Symbol(aa)
 ```

3. symbol => boolean 隐式转换✅ 显式转换✅
4. symbol => object  转换✅

## 全局共享的Symbol
`Symbol()`任何时候创建的都是独一无二的值。  
下面两个类方法：  
Symbol创建跨文件，甚至跨域的值  
使用`Symbol.for()` `Symbol.keyFor()`,这个会在全局的symbol注册表中维护
```js
const sforA = Symbol.for('123')
const sforB = Symbol.for('123')
console.log(sforA === sforB) // true
console.log(Symbol.keyFor(sforA)) // '123'
```

## 原型
__属性__
```js
Symbol.prototype.constructor // 但是不可以new
Symbol.prototype.description // 描述符 只读
```

__方法__
```js
Symbol.prototype.toSource() // 不能使用
Symbol.prototype.toString() // 重写Object的toString
Symbol.prototype.valueOf()  // 重写Object的valueOf
Symbol.prototype[@@toPrimitive]
```

## Symbol的迭代
👏👏👏
Symbol在for in中不可枚举  
Object.getOwnPropertyNames() 不会返回 symbol 对象的属性  
能使用 Object.getOwnPropertySymbols() 得到Symbol

## Symbols 与 JSON.stringify()
当使用 JSON.stringify() 时，以 symbol 值作为键的属性会被完全忽略
```js
JSON.stringify({[Symbol("foo")]: "foo"});                 
// '{}'
```
## Symbol的内置属性
共11个内置属性 
但是这些内置对象的作用，仅仅是指向一个方法或属性  
js引擎内部利用了Symbol的单一值的特性，使得这个属性不会被命名冲突  
```js
  const Symbol = {
    hasInstance: Symbol('Symbol.hasInstance'),
    iterator: Symbol('iterator'),
    ...
  }

  Object[Symbol.hasInstance] = function() {}
  // 相当于是静态变量 统一管理  防止魔术字符串的问题出现
```
