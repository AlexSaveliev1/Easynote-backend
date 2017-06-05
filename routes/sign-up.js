let express = require('express'),
  router = express.Router(),
  userModel = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
});

router.post('/', (req, res, next) => {
  const { firstName, lastName, email, password } = req.body,
    newUser = new userModel();

  newUser.firstName = firstName;
  newUser.lastName = lastName;
  newUser.email = email;
  newUser.password = password;

  newUser.save((err, savedObj) => {
    if (err) {
      res.setHeader('Content-Type', 'application/json');
      res.status(500)
      res.json({email: err.errors.email.value});
    }

    if (savedObj) {
      res.sendStatus(200);
    }
  });


});

module.exports = router;
