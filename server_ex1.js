'use strict';

const http = require('http');
const PORT = process.env.port || 3000;

http.createServer((req, res) => {
  console.log(req.method, req.url);


  if (req.url === '/hello') {
    const msg = '<h1>Hello World!</h1>';

    res.writeHead(200, {
      'Content-Type': 'text/html'
    });

    msg.split('').forEach( (letter, index) => {
      setTimeout( () => {
        res.write(letter);
        console.log(letter);
      }, 1000 * index);
    });

    setTimeout( () => {
      res.end('<h1>Goodbye World!</h1>');
    }, 20000);
  }
  else if (req.url === '/random') {
    res.end(Math.random().toString());
  }
  else {
    res.writeHead(403);
    res.end('Access Denied!');
  }

}).listen(PORT, () => {
  console.log('Node.js server started. Listening on port ${PORT}');
});
