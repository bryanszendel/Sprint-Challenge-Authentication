const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');
const secrets = require('../config/secrets.js');

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 10)
  user.password = hash;

  Users.add(user)
    .then(res => {
      const token = generateToken(user)
      res.status(201).json({res, token})
    })
    .catch(err => {
      res.status(500).json({ message: 'error registering the user' })
    })
});

router.post('/login', (req, res) => {
  // implement login
});

function generateToken(user) {
  const payload = {
    username: user.username
  }
  const options = {
    expiresIn: '1d'
  }
  return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;
