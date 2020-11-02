import Dep from './dep'
import { arrayMethods } from './array'
class Observer {
  constructor(value) {
    this.dep = new Dep()
    Object.defineProperty(value, '__ob__', {
      value: this,
      enumerable: false, // 不能被枚举表示 不能被循环
      configurable: false,
    })
    if (Array.isArray(value)) {
      Object.setPrototypeOf(value, arrayMethods)
    } else {
      this.walk(value)
    }
  }

  walk(data) {
    Object.keys(data).forEach((key) => {
      defineReactive(data, key, data[key]);
    })
  }
}
function dependArray(value) { // 就是让里层数组收集外层数组的依赖，这样修改里层数组也可以更新视图 
  for (let i = 0; i < value.length; i++) {
    let current = value[i];
    current.__ob__ && current.__ob__.dep.depend(); // 让里层的和外层收集的都是同一个watcher
    if (Array.isArray(current)) {
      dependArray(current);
    }
  }
}
export function defineReactive(data, key, value) { // vue2中数据嵌套不要过深 过深浪费性能
  // value 可能也是一个对象
  let childOb = observe(value); // 对结果递归拦截
  let dep = new Dep(); // 每次都会给属性创建一个dep  
  Object.defineProperty(data, key, { // 需要给每个属性都增加一个dep
    get() {
      if (Dep.target) {
        dep.depend(); // 让这个属性自己的dep记住这个watcher，也要让watcher记住这个dep
        // childOb 可能是对象 也可能是数组  
        if (childOb) { // 如果对数组取值 会将当前的watcher和数组进行关联
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value;
    },
    set(newValue) {
      if (newValue === value) return;
      observe(newValue); // 如果用户设置的是一个对象 ， 就继续将用户设置的对象变成响应式的
      value = newValue;

      dep.notify();// 通知dep中记录的watcher让它去执行
    }
  })
}
export function observe(data) {
  // 只对对象类型进行观测 非对象类型无法观测
  if (typeof data !== 'object' || data == null) {
    return;
  }
  if (data.__ob__) { // 放置循环引用了
    return;
  }
  // 通过类来对实现对数据的观测 类可以方便扩展，会产生实例
  return new Observer(data);
}