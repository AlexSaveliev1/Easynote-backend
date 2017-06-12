const express = require('express');
  router = express.Router(),
  userModel = require('../models/user');

/* GET home page. */
router.post('/', function(req, res, next) {
  const email = req.body.username,
    password = req.body.password;

  userModel.findOne({email}, (err, user) => {
    if (err|| !user || user.password !== password) {
      res.setHeader('Content-Type', 'application/json');
      res.status(500)
      return res.json({message: 'Email or password is invalid'});
    }

    res.status(200).send(`{"access_token": "${user._id}"}`);
  });
});

module.exports = router;
