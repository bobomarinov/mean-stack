var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var studentsRouter = require('./routes/students');

var app = express();

// Connect to MongoDB with user and password
databaseurl_docker = process.env.DATABASE_URL ;
databaseurl_kubernetes = process.env.DATABASE_SERVICE_HOST ;
mongoose.connect('mongodb://'+databaseurl_kubernetes+':27017/admin', {
  user: 'root',
  pass: 'example',
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));
mongoose.set('bufferCommands', false);

// if connection with the database is successful check if students collection exists
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + 'mongodb://mongodb:27017/admin');
  // check if students collection exists
  mongoose.connection.db.listCollections({name: 'students'})
  .next(function(err, collinfo) {
    if (collinfo) {
      // The collection exists
      console.log('Collection students exists');
    }
    else {
      // The collection does not exist
      console.log('Collection students does not exist');
      // create students collection
      mongoose.connection.db.createCollection('students', function(err, res) {
        if (err) throw err;
        console.log('Collection students created');
      });
    }
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/students', studentsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
