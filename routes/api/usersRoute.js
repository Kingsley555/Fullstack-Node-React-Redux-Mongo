const express = require('express');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');

const router = express.Router();

//@route POST api/users
//@desc Register new user
//@access Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  //Validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check if there is existing user
  User.findOne({ email: email }).then(user => {
    if (user) return res.status(400).json({ msg: 'User already exist' });
    const newUser = new User({
      name,
      email,
      password
    });

    //Create salt and hasp password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          // assign a token to a user
          jwt.sign(
            {
              id: user.id
            },
            keys.jwtSECRET,
            { expiresIn: 360000 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
