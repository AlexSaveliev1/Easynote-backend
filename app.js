let express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser');   bodyParser = require('body-parser'),
  cors = require('cors'),

  index = require('./routes/index'),
  signIn = require('./routes/sign-in'),
  signUp = require('./routes/sign-up'),
  createNote = require('./routes/create-note'),
  note = require('./routes/note'),
  token = require('./routes/token'),

  app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname + '.../public')));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.get('/products', function (req, res, next) {
  console.log(req, 'arrived')
})

app.use('/sign-in', signIn);
app.use('/sign-up', signUp);
app.use('/note', note);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(3000, () => console.log('listening on port: 3000'))

module.exports = app;
