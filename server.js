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

app.post('/newnote', (req, res) => {
  console.log(req.body)
  res.send(req.body);
})

app.listen(PORT,() => {
  console.log('now listening on port ', PORT) 
})