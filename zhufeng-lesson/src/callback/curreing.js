// 判断类型
// 1.typeof 2.construtor 3.instanceof 4.Object.prototype.toString.call

function sum (a, b, c, d){
  return a + b + c + d 
}

// 柯里化函数
const curring = (fn ,arr = []) => {
  let len = fn.length
  return function(...args) {
    let newArgs = [...arr, ...args]
    if (newArgs.length === len) {
      console.log(newArgs)
      return fn(...newArgs)
    } else {
      return curring(fn, newArgs)
    }
  }
}

let add = curring(sum)
add(1)(2)(3)(4)
