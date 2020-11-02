const http = require('http');
const fs = require('fs');
const path = require('path')
const url = require('url');

const app = http.createServer(function(request, response) {
  // fs.readFile(path.resolve(__dirname, './views/index.html'), function(err, data) {
  //   response.writeHead(200, {'Content-Type': 'text/html'});
  //   response.end(data)
  // })
  let { pathname, query } = url.parse(request.url, true);
  // console.log(request.headers)

  let arr = []
  request.on('data', function(chunk) {
    arr.push(chunk)
  })
  request.on('end', function() {
    console.log(Buffer.concat(arr).toString(), '000000000')
  })
  response.end('123')
})

app.listen(3000)