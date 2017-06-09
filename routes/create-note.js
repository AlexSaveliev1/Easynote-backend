const express = require('express');
  router = express.Router(),
  noteModel = require('../models/note');

  router.post('/', function(req, res, next) {
    const { title, description } = req.body,
      newNote = new noteModel();
      console.log('title:', title, 'description:', description)
      newNote.title = title;
      newNote.description = description;
      newNote.save().then((err, note) => console.log(note))
  });

  module.exports = router;
