var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const authService = require('./src/service/authService')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var invitationAPIRouter = require("./routes/invitations");
const config = require('./src/configuration/config');

var app = express();
config.databaseInit();
// view engine setup
var cors = require('cors')
app.use(cors({origin: '*'}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "OPTIONS, GET, POST, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

app.use((req, res, next) => {

  if (req.path == '/login' || req.path.includes('invitations/token') || req.path.includes('invitations/register')) {
    next();
  } else {
    const isAuthorized = authService.authorizeRequest(req);
    if (isAuthorized) {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/invitations", invitationAPIRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
