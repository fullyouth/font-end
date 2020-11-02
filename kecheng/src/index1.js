// 手写async await
function API(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}

function asyncFunc (generator) {
  let iterabel = generator()

  const next = data => {
    let { value, done } = iterabel.next(data)
    if(done) return value
    value.then(data => {
      next(data)
    })
  }
  next()
}

asyncFunc(function* (){
  let data = yield API(10)
  data = yield API(data + 10)
  console.log(data)
})

// redux -saga dva nmi