'use strict';

const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const Month = require('./node_modules/node-cal/lib/month');
const bodyParser = require('body-parser');
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'tmp/uploads');
  },
  filename: function (req, file, cb) {
    console.log('FILE\n', file);
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });


// SETUP MIDDLEWARE
// app.set makes available to every engine
app.set('view engine', 'jade');

// create static route to serve 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// app.locals exposes to all rendering engines
app.locals.title = 'THE Super Cool App';

//app.use(bodyParser.urlencoded({ extended: false }));



// ROUTES
// ROUTE: root
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Super Cool App',
    date: new Date()
  });
});


// ROUTE: contact
app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/contact', (req, res) => {
  debugger;
  const name = req.body.name;
  res.send(`<h1>Thanks for contacting us #{name}<h1>`);
});



// ROUTE sendPhoto
app.get('/sendphoto', (req,res) => {
  res.render('sendphoto');
});

app.post('/sendphoto', upload.single('image'), (req,res) => {
  res.send('<h1>Thanks for sending us your photo</h1>');
  const oldPath = `tmp/uploads/${req.file.originalname}`;
  const newPath = `tmp/uploads/${req.body.filename}${req.body.extension}`;

  // rename image if user has entered values, else store as originalfilename
  //
  if (req.body.filename && req.body.extension) {
    fs.rename(oldPath, newPath, (err) => {
      if (err) throw err;
    });
  }
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

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
const getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};






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
