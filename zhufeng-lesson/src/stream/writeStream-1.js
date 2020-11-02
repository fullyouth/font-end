const fs = require('fs');
const path = require('path');
const WriteStream = require('./writeStream');
const ws = new WriteStream(path.resolve(__dirname,'test.txt'),{
    flags:'w',
    encoding:'utf8',
    autoClose:true,
    highWaterMark:10
});
ws.on('open',function(fd){
    console.log(fd);
})
debugger
let flag = ws.write('z');
console.log(flag)
flag = ws.write('f');
console.log(flag)

console.log(flag)
ws.on('drain',function () { // 必须达到预期 并且消耗掉
    console.log('干了')
})

setTimeout(() => {
    flag = ws.write('a');
    console.log(flag)
}, 1000);