const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/easynote');

let noteSchema = mongoose.Schema({
  title: String,
  description: String,
  recentlyDeleted: Boolean,
  user: String,
  date: String
});

let noteModel = mongoose.model('notes', noteSchema);

module.exports = noteModel;
