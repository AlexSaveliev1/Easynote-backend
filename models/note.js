const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/easynote');

let noteSchema = mongoose.Schema({
  title: String,
  description: String
});

let noteModel = mongoose.model('notes', noteSchema);

module.exports = noteModel;
