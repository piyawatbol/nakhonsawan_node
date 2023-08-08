require("dotenv").config();
require("./config/database").connect();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// path
app.use('/', indexRouter);
app.use('/users', usersRouter);

//login_system
app.use('/login',require("./routes/login/login"));
app.use('/register', require("./routes/login/register"));
app.use('/forget_password',require("./routes/forget_password/forget_password"));
app.use('/check_otp', require("./routes/forget_password/check_otp"));
app.use('/repassword', require("./routes/forget_password/repassword"));

//notify
app.use('/add_notify', require("./routes/notify/add_notify"));

app.use('/history_notify', require("./routes/notify/history_notify"));

//appeal
app.use('/add_appeal', require("./routes/appeal/add_appeal"));
app.use('/comment_appeal', require("./routes/appeal/comment_appeal"));
app.use('/history_appeal', require("./routes/appeal/history_appeal"));
app.use('/reply_comment', require("./routes/appeal/reply_comment"));

//municipal
app.use('/get_municipal', require("./routes/municipal/get_municipal"));
app.use('/add_municipal_form', require("./routes/municipal/add_municipal_form"));
//user
app.use('/get_user',require("./routes/users/get_user"));
app.use('/edit_user',require("./routes/users/edit_user"));

//confiscated
app.use('/confiscated',require("./routes/confiscated/confiscated"));


app.use("/image",express.static(path.join(__dirname,'images')))

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
