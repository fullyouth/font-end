const fs = require("fs");
const path = require('path');

const HIGHLINE = 2;
let buf = Buffer.alloc(HIGHLINE);
let offset = 0;
let position = 0;
fs.open(path.resolve(__dirname, './test.txt'), 'r', function (err, fd) {
  function next() {
    fs.read(fd, buf, 0, HIGHLINE, position, function (err, bytesRead) {
      if (err) return
      if (bytesRead) {
        offset += bytesRead;
        position += bytesRead;
        console.log(buf.toString());
        next()
      } else {
        fs.close(fd, () => {})
      }
    })
  }
  next()
})
