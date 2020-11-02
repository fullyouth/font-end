const fs = require("fs");
const path = require('path')
const ReadStream = require('./readStream')
let data = [];

// 创建可读流
// const readerStream = fs.createReadStream(path.resolve(__dirname, 'test.txt'), {
//   highWaterMark: 1
// });
const readerStream = new ReadStream(path.resolve(__dirname, 'test.txt'), {
  flags: 'r', // 创建可读流的标识是r  读取文件
  encoding: null, // 编码默认null buffer
  autoClose: false, //  读取完毕后自动关闭
  start: 0, // 包前又包后 字节数
  end: 11,
  // 2 4 
  highWaterMark: 2 // 12 34 5  如果不写默认是64*1024
})

// 处理流事件 --> data, end, and error
readerStream.on('data', function (chunk) {
  console.log('data', chunk)
  data.push(chunk);
});

readerStream.on('end', function () {
  console.log('end', Buffer.concat([...data]).toString());
});

readerStream.on('error', function (err) {
  console.log(err.stack);
});

console.log("程序执行完毕");