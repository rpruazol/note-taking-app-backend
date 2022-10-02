'use strict'

const data = require('./data.json');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const pg = require('pg');
const app = express();

const PORT = process.env.PORT || 3002;
const client = new pg.Client(process.env.POSTGRES);

client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected to database!')
  }
})


app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
  const SQL = `select * from boards order by board_order;`
  client.query(SQL)
    .then(response => {
      res.status(200).send(response.rows);
    })
})

app.get('/notes', (req, res) => {
  const SQL = `select * from notes where board_id='${req.query.id}';`
  client.query(SQL)
    .then(response => {
      res.status(200).send(response.rows);
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
  res.status(200).send(req.body);
})

app.post('/board', (req, res) => {
  console.log(req.body)
  const SQL = 'INSERT INTO boards (name, board_order, created_at) VALUES ($1, $2, NOW()) RETURNING *'
  const values = [req.body.title, req.body.board_order]
  client.query(SQL, values, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log(res.rows[0]);
    }
  })
  res.status(200).send(req.body);
})

app.put('/board', (req, res) => {
  const placeholders = req.body.new_order.map((obj, idx) => {
    return [`$${idx + 1}`].join(',')
  }).join(',')
  const values = req.body.new_order.map(obj => {
    return [`(${obj.id}, ${obj.board_order})`].join(',')
  })
  const hardcode = ['(3, 1)','(8, 2)', '(2, 3)', '(1, 4)']
  console.log(placeholders)
  console.log(values)
  const SQL = `
      UPDATE boards AS b set
        board_order = c.board_order
    FROM (values
      $1, $2, $3, $4
    ) as c(id, board_order)
    where c.id = b.id;
    `
    console.log('SQL ', SQL)
  client.query(SQL, hardcode)
    .then(result => {
      console.log(result.rows)
    })
})

app.delete('/board', (req, res) => {
  console.log('delete info: ', req.body.board);
  // delete the board and all the notes associated with it
  const SQL = `DELETE from boards where id=$1;`;
  const values = [req.body.board.id];
  console.log('values: ', values)
  client.query(SQL, values, (err, result) => {
    if (err) {
      console.log(err.stack)
    } else {
      const SQL = `DELETE from notes where board_id=$1`
      const values = [req.body.board.id]
      client.query(SQL, values, (err, result) => {
        if (err) {
          console.log(err.stack)
        } else {
          console.log('deleted board and notes');
          console.log('res.body', res.body);
          res.status(200).send(result.body)
        }
      })
    }
  })
})

app.post('/note', (req, res) => {
  console.log(req.body)
  const SQL = 'INSERT INTO notes (title, description, board, board_id, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING *'
  const values = [req.body.title, req.body.description, req.body.board, req.body.board_id];
  client.query(SQL, values, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log(res.rows[0]);
    }
  })
  res.status(200).send(req.body);

})

app.listen(PORT, () => {
  console.log('now listening on port ', PORT)
})