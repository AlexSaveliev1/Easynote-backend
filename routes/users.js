const express = require('express');
  router = express.Router(),
  userModel = require('../models/user');

router.get('/', function(req, res, next) {
  const user = req.headers.authorization.split(' ')[1];

  userModel.findOne({_id: user}, (err, user) => {
    res.status(200);
    res.json({
      data: {
        type: 'user',
        id: user._id,

        attributes: {
          'first-name': user.firstName,
          'last-name': user.lastName
        }
      }
    });
  });
});

module.exports = router;
