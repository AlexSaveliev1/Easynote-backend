const mongoose = require('mongoose'),
uniqueValidator = require('mongoose-unique-validator');

mongoose.connect('mongodb://localhost/easynote');

let userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique : true
  },
  password: String
});

userSchema.plugin(uniqueValidator);

let userModel = mongoose.model('users', userSchema);

module.exports = userModel;
