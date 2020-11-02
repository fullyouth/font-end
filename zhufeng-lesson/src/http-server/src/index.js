const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs').promises;
const { createReadStream, readFileSync } = require('fs');
const { exec } = require('child_process'); // TODO
const mime = require('mime');
const ejs = require('ejs');

const sign = require('./sign');
const { logger } = require('../utils')

class staticServer {
  constructor(options) {
    this.port = options.port;
    this.root = options.root;
    this.expires = options.expires || 0; // 强制缓存过期时间 默认10s
    this.template = readFileSync(path.resolve(__dirname, 'render.html'), 'utf8')
  }
  async handleRequest(req, res) {
    const { pathname } = url.parse(req.url, true);
    let filePath = path.join(this.root, pathname);
    logger.blue('请求url：' + req.url)
    logger.blue('资源路径：' + filePath)
    try {
      // 文件
      let statObj = await fs.stat(filePath);
      let isFile = statObj.isFile();
      if (isFile) {
        this.sendFile(req, res, statObj, filePath)
      } else {
        // exec(`ls`, async (err, stdout, stderr) => {
        //   if(err) {
        //     console.log(err);
        //     return;
        //   }
        //   let dirs = stdout.split('\n')
        //   dirs = dirs.map(item => ({
        //     name: item,
        //     href: path.join(pathname, item)
        //   }))
        //   console.log(dirs)
        //   let result = await ejs.render(this.template, { dirs }, { async: true });
        //   res.setHeader('Content-Type', 'text/html;charset=utf-8')
        //   res.end(result);
        // })
        let dirs = await fs.readdir(filePath);
        dirs = dirs.map(item => ({
          name: item,
          href: path.join(pathname, item)
        }))
        let result = await ejs.render(this.template, { dirs }, { async: true });
        res.setHeader('Content-Type', 'text/html;charset=utf-8')
        res.end(result);
      }
    } catch (e) {
      this.sendError(e, req, res);
    }
  }

  cache(req, res, statObj, filePath) {
    // 强制缓存
    res.setHeader('Expires', new Date(Date.now() + this.expires * 1000).toGMTString())
    res.setHeader('Cache-Control', `max-age=${this.expires}`)
    // 协商缓存
    let ifModifiedSince = req.headers['if-modified-since']
    let ifNoneMatch = req.headers['if-none-match']
    let mtime = statObj.mtime.toGMTString();
    let etag = sign(`${statObj.mtime}-${statObj.size}`)
    // let etag = md5.update(readFileSync(filePath)).digest('base64'); // 对文件内容签名摘要
    
    res.setHeader('Last-Modified',mtime);
    res.setHeader('ETag',etag);
    
    if (ifModifiedSince !== mtime) {
      return false
    }
    if(ifNoneMatch !== etag){ // 可以用开头 加上总字节大小生产etag
      return false;
    }
    return true
  }

  sendFile(req, res, statObj, filePath) {
    const isCache = this.cache(req, res, statObj, filePath)
    if (isCache) {
      res.statusCode = 304;
      return res.end();
    }
    res.setHeader('Content-Type', mime.getType(filePath) + ';charset=utf-8');
    createReadStream(filePath).pipe(res);
  }

  sendError(e, req, res) {
    res.statusCode = 404;
    logger.red(e)
    res.end('Not Found');
  }

  start(...args) {
    const app = http.createServer(this.handleRequest.bind(this))
    app.listen(...args)
  }
}

module.exports = staticServer
