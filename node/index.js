const http = require('http')

http.createServer(function (request, response) {
  response.write(200);
  response.end("jqb")
}).listen(3000)