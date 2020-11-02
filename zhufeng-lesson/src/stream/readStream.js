const fs = require('fs')
const path = require('path')
const eventEmitter = require('events')

class ReadStream extends eventEmitter {
  constructor(path, options = {}) {
    super()
    this.path = path;
    this.flags = options.flags || 'r';
    this.encoding = options.encoding || null;
    if (typeof options.autoClose == "undefined") {
      this.autoClose = true
    } else {
      this.autoClose = options.autoClose
    }
    this.start = options.start || 0;
    this.end = options.end || undefined;
    this.highWaterMark = options.highWaterMark || 64 * 1024;
    this.open()
    this.offset = this.start

    this.on('newListener', (type) => {
      if (type == 'data') { // 说明用户监听了data事件
          this.flowing = true;
          this.read(); // 读取吧
      }
  });
  }
  pause() {
    this.flowing = false;
  }
  resume() {
    if (!this.flowing) {
      this.flowing = true;
      this.read(); // 继续读取
    }
  }
  open() {
    fs.open(this.path, 'r', (err, fd) => {
      if (err) return this.emit('error', err)
      this.fd = fd
      this.emit('open', fd)
    })
  }
  read() {
    if (typeof this.fd != 'number') {
      return this.once('open', () => this.read())
    }

    let buf = Buffer.alloc(this.highWaterMark);
    let howMuchToRead = Math.min((this.end - this.offset + 1), this.highWaterMark); // 真正要读取的个数
    fs.read(this.fd, buf, 0, howMuchToRead, this.offset, (err, bytesRead) => {
      if (err) return
      if (bytesRead) {
        this.offset += bytesRead;
        this.emit('data', buf.slice(0, bytesRead))
        if (this.flowing) {
          this.read();
        }
      } else {
        this.emit('end');
        if (this.autoClose) {
          fs.close(this.fd, () => {
            this.emit('close');
          })
        }
      }
    })
  }
}
module.exports = ReadStream;
