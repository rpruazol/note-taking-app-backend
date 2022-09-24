'use strict'

const data = require('./data.json');
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3002

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  console.log(data);
  res.send(data);
})

app.listen(PORT,() => {
  console.log('now listening on port ', PORT) 
})