// for in 返回能通过对象访问的可枚举的属性
function Person() {
}
Person.prototype.age = '12'
Person.prototype.name = 'zhq'

const zhq = new Person()
Object.defineProperty(zhq, 'sex', {
  value:'man',
})
zhq[Symbol('symbol')] = '123'
console.log(zhq)
// in 可查找到的所有属性（包括symbol等不可枚举属性）
// 可枚举属性
for(let key in zhq) {
  console.log('for-in', key, zhq[key])
}
// 自身的所有属性（包括symbol等不可枚举属性）
Reflect.ownKeys(zhq).forEach(key => {
  console.log('Reflect.ownKeys', key, zhq[key])
})
// 只能是自身的可枚举属性
Object.keys(zhq).forEach(key => {
  console.log('Object.keys', key, zhq[key])
})
// Object.getOwnPropertyNames 自身属性，无论是否可枚举