const http = require('http');

const server = http.createServer((request, response) => {
  response.end('Response');
})

server.listen(process.env.PORT || 3000);
