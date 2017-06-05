const express = require('express');
  router = express.Router(),
  userModel = require('../models/user');

/* GET home page. */
router.post('/', function(req, res, next) {
  const { email, password } = req.body;
  userModel.findOne({email: req.body.email}, (err, user) => {
    if (err|| !user || user.password !== password) {
      res.setHeader('Content-Type', 'application/json');
      res.status(500)
      return res.json({message: 'Email or password is invalid'});
    }

    res.sendStatus(200);
  })
});

module.exports = router;
