abstract class Person {
  constructor() {
  }
  
}

class Student extends Person {
  private name: string
  constructor(name: string) {
    super()
    this.name = name
  }
}

let zhq: Student
zhq = new Student('zhq')
console.log(Student, zhq)