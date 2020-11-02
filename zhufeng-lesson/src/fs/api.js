const fs = require('fs')
const path = require('path')
const ReadStream = require('./ReadStream')

/**
 * fs 的类 fs.Dir fs.Dirent fs.FSWatcher   fs.StatWatcher  fs.ReadStream  fs.Stats  fs.WriteStream 
 * 
 */

//1. fd 文件描述符   在 POSIX 系统上，对于每个进程，内核都维护着一张当前打开着的文件和资源的表格
// fs.open(path.resolve(__dirname, './test.txt'), 'r', (err, fd) => {
//   if (err) throw err;
//   fs.fstat(fd, (err, stat) => {
//     if (err) throw err;
//     // 使用文件属性。
//     console.log(stat)
//     // 始终关闭文件描述符！
//     fs.close(fd, (err) => {
//       if (err) throw err;
//     });
//   });
// });

// 2. fs.ReadStream 继承自stream.Readable
// console.log(fs.ReadStream)
debugger
let rs = fs.createReadStream(path.resolve(__dirname, './test.txt'), {
  flags: 'r',
  // encoding: 'utf8',
  start: 1, // 读取文件的开始位置索引
  end: 4,   // 读取文件的结束位置索引
  highWaterMark: 2 // 流的水位线
})
// let re = new ReadStream(path.resolve(__dirname, './test.txt'), {
//   flags: 'r',
//   // encoding: 'utf8',
//   start: 1, // 读取文件的开始位置索引
//   end: 4,   // 读取文件的结束位置索引
//   highWaterMark: 2 // 流的水位线
// })
rs.on('error', function(err) {
  console.log(err)
})
rs.on('open', function(fd) { // rs.emit('open')
    console.log(fd);
});
let arr = []
rs.on('data', function(chunk) { // UTF8  ASCII  49 -> 9
//  console.log('data', chunk)
  arr.push(chunk)
 console.log('data', chunk.toString())
});
rs.on('end', function() { // 文件的开始到结束都读取完毕了
  console.log(Buffer.concat(arr).toString())
})
rs.on('close', function() {
  console.log('close')
})