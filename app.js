const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(compression());

// Static pages

app.use('/', express.static('public'));

// Port listening

const port = process.env.PORT || 3000;

// DB 

let db = new sqlite3.Database('./grad.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the grad database.');
});

// app.get('/gradovi', (req, res) => {
//   d
// })


app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});