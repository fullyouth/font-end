// let bufs = ['zhq',[1,2,3]]
// bufs.forEach(item => {
//   logBuffer(item)
// })

// function logBuffer(params) {
//   let buf = Buffer.from(params);
//   console.log(params, buf)
// }

// buffer => string
let buf = Buffer.from('张浩琦');
console.log('张浩琦', buf.toString('utf8'))
// buffer => json
console.log('json', buf.toJSON())

