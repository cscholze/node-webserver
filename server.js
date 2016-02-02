'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


// ROUTE: hello
app.get('/hello', (req, res) => {

  // query param, ie ( /hello?name=<name> )
  const NAME = req.query.name;
  const MSG = `<h1>Hello ${NAME}!</h1>`;

  // response header
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });

  // chunk response by letter
  MSG.split('').forEach( (letter, index) => {
    setTimeout( () => {
      res.write(letter);
    }, 500 * index);
  });

  console.log('QUERY PARAMS >>\n', req.query);

  // wait for all letters have sent
  setTimeout( () => {
    res.end();
  }, MSG.length*500 + 1000 );
});

app.param(['start', 'end'], function (req, res, next, value) {
  console.log('CALLED ONLY ONCE with', value);
  next();
});

// ROUTE: random
app.get('/random/:start/:end', (req, res) => {
  res.status(200).send(Math.random(start, end).toString());
});


// ROUTE: catch all
app.all('*', (req, res) => {
  res.status(403).send('Access Denied!');
});


app.listen(PORT,() => {
  console.log('Example app listening on port 3000!');
});
