'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const write = require('write-file-atomic');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

const jwtSecret = 'yolo';

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/update', (req, res) => {
  if (!req.body.token) {
    res.send('N');
    return;
  }
  jwt.verify(req.body.token, jwtSecret, (err, posts) => {
    if (err) {
      res.send('N');
      return;
    }

    let i = 0;
    let j = 0;
    const n = posts.length;
    const writes = [];

    while (i < n) {
      const chunk = posts.slice(i, i += 30);

      writes.push(writeFile(`./data/${j}.json`, JSON.stringify(chunk)));

      j++;
    }

    Promise.all(writes).then(() => {
      res.send('written');
    }, () => {
      res.send('error');
    });
  });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});




function writeFile(filename, contents) {
  return new Promise((resolve, reject) => {
    write(filename, contents, err => {
      if (err) reject(err);
      resolve(true);
    });
  });
}
