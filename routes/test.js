'use strict';

let express = require('express');
let router = express.Router();
require('dotenv').config();

const pg = require('pg');

router.get('/', (req, res) => {
      res.status(200).send('??');
})


module.exports = router;