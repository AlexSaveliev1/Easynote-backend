const express = require('express');
  router = express.Router(),
  noteModel = require('../models/note'),
  url = require('url');

  router.get('/', function(req, res, next) {
    let url_parts = url.parse(req.url, true),
      query = url_parts.query;

    noteModel.find({
      userId: query.id
    }, (err, notes) => {
      res.send({
        data: notes
      })
    })
  });

  router.post('/', (req, res, next) => {
    const {title, description, userId} = req.body,
      newNote = new noteModel();

    newNote.title = title;
    newNote.description = description;
    newNote.userId = userId;

    newNote.save((err, savedObj) => {
      if (err) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500);
      }

      if (savedObj) {
        res.setHeader('Content-Type', 'application/json');
        res.sendStatus(200)
      }
    });
  })

  module.exports = router;
