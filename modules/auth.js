'use strict';

const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
require('dotenv').config();


function verifyUser(req, res, next) {
  const valid = (err, user) => {
    req.user = user;
    next();
  }
  console.log('req: ', req.headers)
  try {
    const token = req.headers.authorization.split(' ')[1];

    console.log('Token: ', token);
    jwt.verify(token, getKey, {}, valid);

  } catch (error) {
    next('Not Authorized');
  }
}

const client = jwksClient({
  jwksUri: process.env.JWKS_URI,
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

module.exports = verifyUser