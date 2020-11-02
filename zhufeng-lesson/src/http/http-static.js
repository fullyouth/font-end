const http = require('http');
const path = require('path');
const url = require('url')
const fs = require('fs').promises;
const { createReadStream } = require('fs');
const mime = require('mime');

class staticServer {
  async handleRequest(req, res) {
    const { pathname } = url.parse(req.url, true);
    let filePath = path.join(__dirname, pathname);

    try {
      let statObj = await fs.stat(filePath);
      let isFile = statObj.isFile()
      if (isFile) {
        res.setHeader('Content-Type', mime.getType(filePath) + ';charset=utf-8');
        createReadStream(filePath).pipe(res)
      } else {
        filePath = path.join(filePath, 'index.html');
        res.setHeader('Content-Type', mime.getType(filePath) + ';charset=utf-8');
        createReadStream(filePath).pipe(res);
      }
    } catch (e) {
      this.sendError(e, req, res);
    }

    // let data = await fs.readFile(path)
    // res.setHeader('Content-Type',mime.getType(filePath)+';charset=utf-8');
    // res.end(data)
  }

  sendError(e, req, res) {
    res.statusCode = 404;
    console.log(e)
    res.end('Not Found');
  }

  start(...args) {
    const app = http.createServer(this.handleRequest.bind(this))
    app.listen(...args)
  }
}

const port = 3000
new staticServer().start(port, function () {
  console.log(`start on port ${port}`)
})