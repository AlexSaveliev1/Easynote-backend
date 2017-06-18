let express = require('express'),
  router = express.Router(),
  noteModel = require('../models/note'),
  moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  const user = req.headers.authorization.split(' ')[1];

  noteModel.find({user, recentlyDeleted: req.query.recentlyDeleted}, (err, notes) => {
    let serialized = notes.map(note => {
     return {
       type: 'note',
       id: note._id,

       attributes: {
         title: note.title,
         description: note.description,
         user: note.user,
         'recently-deleted': note.recentlyDeleted,
         date: note.date
       }
     }
   });

    res.status(200);
    res.json({data: serialized})
  });
});

router.get('/:id', function(req, res, next) {
  const user = req.headers.authorization.split(' ')[1];

  noteModel.find({_id: req.params.id}, (err, notes) => {
    let serialized = notes.map(note => {
     return {
       type: 'note',
       id: note._id,

       attributes: {
         title: note.title,
         description: note.description,
         user: note.user,
         'recently-deleted': note.recentlyDeleted,
         date: note.date
       }
     }
   });

    res.status(200);
    res.json({data: serialized[0]})
  });
});

router.delete('/:id', function(req, res, next) {
  noteModel.findByIdAndRemove(req.params.id, (err, note) => {

    res.status(200);
    res.json({
      data: {
        type: 'note',
        id: note._id,

        attributes: {
          title: note.title,
          description: note.description,
          user: note.user,
          'recently-deleted': note.recentlyDeleted,
          date: note.date
        }
      }
    });
  });
});

router.delete('/', function(req, res, next) {
  const idToRemove = req.body['notes[]'];
  noteModel.remove({
    _id: {$in: idToRemove}}, () => {
      res.sendStatus(200);
    });
});

router.patch('/:id', function(req, res, next) {
  noteModel.findOneAndUpdate({ _id: req.params.id }, { $set:
    {
      title: req.body.data.attributes.title,
      description: req.body.data.attributes.description,
      recentlyDeleted: req.body.data.attributes['recently-deleted']
    }}, { new: true }, function(err, updatedNote) {

      let serialized = {
         type: 'note',
         id: updatedNote._id,

         attributes: {
           title: updatedNote.title,
           description: updatedNote.description,
           user: updatedNote.user,
           'recently-deleted': updatedNote.recentlyDeleted,
           date: updatedNote.date
         }
       }

      res.status(200);
      res.json({data: serialized})
  });
});

 router.patch('/', function(req, res, next) {
   const notesIDs = req.body['notes[]'],
     param = req.body['params[recentlyDeleted]'],
     responseNotes = [];

     if (Array.isArray(notesIDs)) {
       notesIDs.forEach(note => {
         noteModel.findOneAndUpdate({ _id: note }, { $set:
           {
             recentlyDeleted: param
           }}, { new: true }, (err, note) => console.log('done'));
       })
     } else {
       noteModel.findOneAndUpdate({ _id: notesIDs }, { $set:
         {
           recentlyDeleted: param
         }}, { new: true }, function(err, updatedNote) {
       }, () => res.sendStatus(200));
     }

     res.sendStatus(200);
});

router.post('/', (req, res, next) => {
  const user = req.headers.authorization.split(' ')[1],
    newNote = new noteModel();

  newNote.title = req.body.data.attributes.title;
  newNote.description=req.body.data.attributes.description;
  newNote.user=user;
  newNote.recentlyDeleted=false;
  newNote.date=moment(new Date()).format('DD/MM/YYYY');
  newNote.save((err, savedNote) => {
    if (err) {
      res.setHeader('Content-Type', 'application/json');
      res.status(500);
    }

    if (savedNote) {
      res.status(200);
      res.json({
        data: {
          type: 'note',
          id: savedNote._id,

          attributes: {
            title: savedNote.title,
            description: savedNote.description,
            user: savedNote.user,
            'recently-deleted': savedNote.recentlyDeleted,
            date: savedNote.date
          }
        }
      });
    }
  });
});

module.exports = router;
