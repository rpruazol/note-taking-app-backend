require('dotenv').config();
const pg = require('pg');
const client = new pg.Client(process.env.POSTGRES);

client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected to database!')
  }
})


module.exports = {
  query: (text, params, callback) => {
    return client.query(text, params, callback)
  },
}