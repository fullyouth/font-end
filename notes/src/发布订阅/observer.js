// 观察者模式
// 两个类：主体类 和 观察者 ，两者直接相关联 一个触发另一个

// 主题
class Subject{
  constructor(name, val) {
    this.name = name
    this.state = val
    this.observers = new Set()
  }
  attach(ob) {
    this.observers.add(ob)
  }
  setState(val) {
    if (val !== this.state) {
      this.state = val
      this.observers.forEach(item => item.update(this))
    }
  }
}

// 观察者
class Observer{
  constructor(name) {
    this.name = name
  }
  update(sub) {
    console.log(`我是${this.name},我听到了${sub.name}说的:${sub.state}`)
  }
}
const ob1 = new Observer('小明')
const ob2 = new Observer('小红')
const sub = new Subject('老师')
sub.attach(ob1)
sub.attach(ob2)

sub.setState('上课啦！')