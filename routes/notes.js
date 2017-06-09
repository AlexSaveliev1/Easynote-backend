const express = require('express');
  router = express.Router(),
  noteModel = require('../models/note');

  router.get('/', function(req, res, next) {
    noteModel.find((err, notes) => {
      const serializedNotes = notes.map(note => {
        return {
          attributes: {
            title: note.title,
            description: note.description
          },
          "_id": note.id,
          type: 'note'
        }
      });
      console.log(serializedNotes);
      res.send({
        data: serializedNotes
      })
    })
  });

  module.exports = router;
