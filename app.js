'use strict';

const fs = require('fs');
const express = require('express');
const compression = require('compression');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();
app.use(compression());
app.use(bodyParser.json());
app.engine('handlebars', hbs({
  defaultLayout: 'main',
  helpers: {
    year: date => date.substring(0, 4),
    date: date => {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const year = date.substring(0, 4);
      let month = date.substring(5, 7);
      month = (month.substring(0, 1) === '0') ? month.substring(1) : month;
      month = months[parseInt(month, 10) - 1];
      let day = date.substring(8, 10);
      day = (day.substring(0, 1) === '0') ? day.substring(1) : day;
      return `${day} ${month} ${year}`;
    },
  },
}));
app.set('view engine', 'handlebars');
app.use(express.static('webroot'));

app.get('/', (req, res) => {
  fs.readFile('./data/all.json', 'utf8', (err, contents) => {
    if (err) {
      res.send('Error.');
      return;
    }
    const movies = JSON.parse(contents).slice(0, 30);
    res.render('index', { movies });
  });
});

app.get('/page/:page', (req, res) => {
  let page = req.params.page;
  if (/^(\-|\+)?([0-9]+|Infinity)$/.test(page)) {
    page = Number(page);
    fs.readFile('./data/all.json', 'utf8', (err, contents) => {
      if (err) {
        res.sendStatus(500);
        return;
      }
      const start = (page - 1) * 30;
      const end = start + 30;
      const movies = JSON.parse(contents).slice(start, end);

      if (req.xhr) {
        res.json(movies);
      } else {
        res.render('index', { movies });
      }
    });
  } else {
    res.sendStatus(404);
  }
});

app.get('/:id', (req, res) => {
  fs.readFile(`./data/movies/${req.params.id}.json`, 'utf8', (err, contents) => {
    if (err) {
      res.send('Error.');
      return;
    }
    const movie = JSON.parse(contents);

    if (req.xhr) {
      res.json(movie);
    } else {
      res.render('single', { movie });
    }
  });
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
