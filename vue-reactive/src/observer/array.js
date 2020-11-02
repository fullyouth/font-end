let oldArrayProtoMethods = Array.prototype;
export const arrayMethods = Object.create(Array.prototype)

const methods = [ // concat slice ... 都不能改变原数组
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'reverse',
  'sort'
];

methods.forEach(method => {
  arrayMethods[method] = function(...args) {
    let result = oldArrayProtoMethods[method].call(this, ...args)
    let inserted;
    let ob = this.__ob__
    switch (method) {
      case 'push':
      case 'unshift':
          inserted = args;
          break;
      case 'splice': // splice(0,1,xxxx)
          inserted = args.slice(2);
      default:
          break;
    }
    if(inserted)  ob.observeArray(inserted);
    ob.dep.notify();
    return result
  }
})