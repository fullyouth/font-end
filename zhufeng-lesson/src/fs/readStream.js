const idDef = v => v !== undefined
class ReadStream {
  constructor(path, options) {
    this.flags = options.flags || 'r',
    this.encoding
    this.fd = options.fd || null;
    this.mode = options.mode || 0o666;
    this.autoClose = idDef(options.autoClose) ? options.autoClose : true;
    this.emitClose = idDef(options.emitClose) ? options.emitClose : false;
    this.start = options.start || 0,
    this.end = options.end || Infinity;
    this.highWaterMark = options.highWaterMark || 64 * 1024;
  }

  open() {
    
  }
}
module.exports = ReadStream