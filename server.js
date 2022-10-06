'use strict'

const express = require('express');
require('dotenv').config();
const cors = require('cors');
// const pg = require('pg');

const boards = require('./routes/boards');
const notes = require('./routes/notes');
const test = require('./routes/test')
const verifyUser = require('./modules/auth.js')

const app = express();

const PORT = process.env.PORT || 3002;

app.use(express.json())
app.use(cors())
app.use(verifyUser)

app.use('/test', test)
app.use('/boards', boards);
app.use('/notes', notes);

app.listen(PORT, () => {
  console.log('now listening on port ', PORT)
})