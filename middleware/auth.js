const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

function auth(req, res, next) {
  const token = req.header('x-auth-token');

  //Check for token
  if (!token) return res.status(401).json({ msg: ' authorization denied' });

  try {
    // if there is a toekn, verify token
    const decoded = jwt.verify(token, keys.jwtSECRET);

    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
}

module.exports = auth;
