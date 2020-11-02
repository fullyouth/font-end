const p1 = new Promise((resolve, reject) => {
  resolve(1)
})

const p2 = new Promise((resolve, reject) => {
  reject(2)
})

const isThenabel = p => Object.prototype.toString.call(p.then) === '[object Function]'
Promise.allSettled = function(arr = []) {
  let times = 0
  let results = []
  const handler = function(res, status, i, resolve) {
    ++ times;
    results[i] = {status, value: res}
    if (times === arr.length) {
      resolve(results)
    }
  }

  let p = new Promise((resolve, reject) => {
    if (Array.isArray(arr)) {
      arr.forEach((item, i) => {
        if (isThenabel(item)) {
          item.then(
            (res) => handler(res, 'fulfilled', i, resolve), 
            (err) => handler(err, 'rejected', i, resolve)
          )
        } else {
          handler(item, 'fullfilled', i, resolve)
        }
      })
    }
  })
  return p
}

const p = Promise.allSettled([p1, p2])
p.then((res) => {
  console.log(res)
})