// isPrototypeOf vs instanceOf
// Object.getPto

// in 能在原型链上访问到就返回true
// hasOwnProperty 是能是实例属性
function hasOwnAndPrototypeProperty(obj, key) {
  return (key in obj)
}
function hasOwnProperty(obj, key) {
  return obj.hasOwnProperty(key)
}
function hasPrototypePrototy(obj, key) {
  return !(obj.hasOwnProperty(key) && (key in obj))
}
function Person() { 

}
Person.prototype.name = 'zhang'
Person.prototype.age = '12'

const zhang = new Person()
zhang.name = '浩琦'
console.log(zhang)
console.log(hasPrototypePrototy(zhang, 'name'))
console.log(hasPrototypePrototy(zhang, 'age'))