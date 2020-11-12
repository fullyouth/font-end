// 基础类型

// 1.数字
let num1: number = 1
// 2.字符串
let str1: string = 'zhq'
// 3.布尔
let isDone: boolean = true
// 4.数组
let arr1: number[] = [1]
// 5.元组
let tuple: [number, string] = [1, '2']
// 6.枚举
enum enum1 {
  red = 3,
  green,
  blue
}
// 7.any
let noSure: any = 4
// 8.void
let unusable2: void = undefined
// unusable2 = null
// 9.undefined
let u: undefined = undefined
// 10.null
let n: null = null
// 11.object
let o1: object = {}
let o2: object | null = null
// 12.Never
function error(message: string): never {
  throw new Error(message);
}
error('1')

console.log(num1,str1,isDone,arr1,tuple,enum1,noSure,unusable2,u,n,o1,o2)
export {}