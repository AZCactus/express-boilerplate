var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var routes          = require('./routes');
var passport        = require('passport');
var expressSession  = require('express-session');
var fileSession     = require('session-file-store')(expressSession);
var flash           = require('express-flash');
var authentication  = require('./libs/authentication');
var config          = require('config');

var app = express();

// view engine setup, we're going to use handlebars cause it makes sense
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), {index: 'index.js', redirect: true}));

// Initialize our local authentication scheme
app.use(expressSession({
  saveUninitialized: true,
  resave: false,
  store: new fileSession(config.get('session')),
  secret: 'trunT1E9draT2Bab5'
}));
app.use(flash());
app.use(passport.initialize());
app.use(authentication.middleware);
app.use(passport.session());

// Load all of our controllers
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('components/error', {
      message: err.message,
      error: JSON.stringify(err, null, '\t')
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('components/error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
