let express = require('express'),
  router = express.Router(),
  noteModel = require('../models/note');

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
         'recently-deleted': note.recentlyDeleted
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
         'recently-deleted': note.recentlyDeleted
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
          'recently-deleted': note.recentlyDeleted
        }
      }
    });
  });
});

router.patch('/:id', function(req, res, next) {
console.log(req.body.data.attributes)
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
           'recently-deleted': updatedNote.recentlyDeleted
         }
       }


      res.status(200);
      res.json({data: serialized})
  });
});

router.post('/', (req, res, next) => {
  const user = req.headers.authorization.split(' ')[1],
    newNote = new noteModel();


  newNote.title = req.body.data.attributes.title;
  newNote.description=req.body.data.attributes.description;
  newNote.user=user;
  newNote.recentlyDeleted=false;

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
            'recently-deleted': savedNote.recentlyDeleted
          }
        }
      });
    }
  });


});

module.exports = router;
