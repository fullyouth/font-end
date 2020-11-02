// function Person() {
//   this.name = { name: 'zhq' }
// }
// Person.prototype.run = function () {
//   console.log('run')
// }



// // 1.构造函数继承
// // function Student() {
// //   Person.call(this)
// // }

// // 2.原型继承
// // Student.prototype = new Person()

// // const a = new Person()
// // 3.原生继承
// // const proto = Object.create(Person.prototype)

// // 4.寄生继承
// // function createAnother(original) {
// //   var clone = Object.create(original)
// //   clone.name = 'qwe'
// // }
// // console.log(proto)

// // 寄生组合继承
// function inhert(sub, sup) {
//   sub.prototype = Object.create(sup.prototype)
//   sub.prototype.constructor = sup
//   sub.__proto__ = sup
//   // return sub
// }
// function Student() {

// }
// inhert(Student, Person)
// const zhang = new Student()
// // console.log(Student.__proto__ == Function.prototype)

// class A {

// }
// class B extends A {

// }

// console.log(B.__proto__)


const a = new Array()



