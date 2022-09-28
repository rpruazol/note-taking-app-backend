'use strict'

const data = require('./data.json');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const pg = require('pg');
const app = express();

const PORT = process.env.PORT || 3002;
const client = new pg.Client(process.env.POSTGRES);


client.connect(() => {
  console.log('connected to db!')
})

app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
  const SQL = `select * from notes;`
  client.query(SQL)
    .then(response => {
      res.send(response.rows);
    })
})

app.delete('/note', (req, res) => {
  const SQL = 'DELETE FROM notes WHERE id=$1';
  const params = [req.body.id]

  client.query(SQL, params, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log(res.rows[0]);
    }
  })
  res.send(req.body);
})

app.post('/board', (req, res) => {
  console.log(req.body)
  const SQL = 'INSERT INTO boards (name, created_at) VALUES ($1, NOW()) RETURNING *'
  const values = [req.body.title]
  client.query(SQL, values, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log(res.rows[0]);
    }
  })
  res.send(req.body);
})

app.post('/note', (req, res) => {
  console.log(req.body)
  const SQL = 'INSERT INTO notes (title, description, created_at) VALUES ($1, $2, NOW()) RETURNING *'
  const values = [req.body.title, req.body.description];
  client.query(SQL, values, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log(res.rows[0]);
    }
  })
  res.send(req.body);

})

app.listen(PORT, () => {
  console.log('now listening on port ', PORT)
})