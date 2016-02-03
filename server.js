'use strict';

const express = require('express');
const app = express();
const Month = require('./node_modules/node-cal/lib/month');
const PORT = process.env.PORT || 3000;

app.set('view engine', 'jade');

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
const getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


// ROUTE: root
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Super Cool App',
    date: new Date()
  });
});


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




// ROUTE: cal year
//
//
//
//


// ROUTE: cal month
app.get('/cal/:month/:year', (req, res) => {
  const month = +req.params.month;
  const year = +req.params.year;
  let output = Month.generateMonth(month, year);;

  // produce string output for the month
  output.forEach( (line) => {
      res.write(`<pre>${line}</pre>`);
  });
  res.end();
});


// ROUTE: random
app.get('/random', (req, res) => {
  res.status(200).send(Math.random().toString());
});


// ROUTE: random with route params
app.get('/random/:min/:max', (req, res) => {
  const min = req.params.min;
  const max = req.params.max;

  res.status(200).send(getRandomInt( +min, +max ).toString());
});


// ROUTE: catch all
app.all('*', (req, res) => {
  res.status(403).send('Access Denied!');
});


app.listen(PORT,() => {
  console.log('Example app listening on port 3000!');
});
