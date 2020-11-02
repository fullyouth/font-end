const fs = require('fs')
const path = require('path')
const { EventEmitter } = require('events')
const eventObj = {
  arr: [],
  on: function(fn) {
    this.arr.push(fn)
  },
  emit: function(res) {
    this.arr.forEach(item => {
      item(res)
    })
  }
}

eventObj.on((res) => {
  console.log(res)
})
eventObj.on((res) => {
  console.log(res)
})
fs.readFile(path.resolve(__dirname, './name.txt'), 'utf8', function(err, data) { 
  if(err) return console.log(err)
  eventObj.emit(data); // 触发
})
