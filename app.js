const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const { getAll, getGrad, createGrad, updateGrad, deleteGrad } = require('./statements');
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

app.get('/gradovi', (req, res) => {
  try {
    db.all(getAll, [], (err, rows) => {
      if(err) {
        throw err;
      }
      return res.status(200).send(rows);
    })
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(400).send({message: "Error has occured. Plese try again."})
  }
});

app.get('/gradovi/:id', (req, res) => {
  const { id } = req.params;

  try {
    db.all(getGrad(id), [], (err, rows) => {
      if(err) {
        throw err;
      }
      if(rows.length > 0) {
        return res.status(200).send(rows[0]);
      } else {
        return res.status(404).send({message: "There is no city with that ID."})
      }
    })
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(400).send({message: "Error has occured. Plese try again."})
  }
});

app.post('/grad', (req, res) => {
  const { naziv, broj_stanovnika } = req.body;
  if(typeof naziv === 'string' && naziv.trim(" ") !== "" && 
    typeof broj_stanovnika === 'number' && broj_stanovnika > 0
  ) {
    try{
      db.all(createGrad(naziv, broj_stanovnika), [], (err, rows) => {
        if(err) {
          throw err;
        }
        return res.status(200).send({message: "Successfully created city."})
      })
    } catch (error) {
      console.log("ERROR: ", error);
      return res.status(400).send({message: "Error has occured. Plese try again."})
    }
  } else {
    return res.status(400).send({message: "Invalid data."});
  }
});

app.put('/gradovi/:id', (req, res) => {
  const { id } = req.params;
  const { broj_stanovnika } = req.body;
  if(typeof broj_stanovnika === 'number' && broj_stanovnika > 0) {
    try{
      db.all(updateGrad(id, broj_stanovnika), [], (err, rows) => {
        if(err) {
          throw err;
        }
        return res.status(200).send({message: "Successfully updated city."})
      })
    } catch (error) {
      console.log("ERROR: ", error);
      return res.status(400).send({message: "Error has occured. Plese try again."})
    }
  } else {
    return res.status(400).send({message: "Invalid data."});
  }
});

app.delete('/gradovi/:id', (req, res) => {
  const { id } = req.params;
  try{
    db.all(deleteGrad(id), [], (err, rows) => {
      if(err) {
        throw err;
      }
      return res.status(200).send({message: "Successfully deleted city."})
    })
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(400).send({message: "Error has occured. Plese try again."})
  }
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});