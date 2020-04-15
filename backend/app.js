var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Todo = require('./models/todo')

var users = require('./routes/users');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = process.env.PORT || 3000

mongoose
  .connect('mongodb+srv://newuser:9o1Xbk5SqL8P6lWa@database-ayo9w.mongodb.net/todo?retryWrites=true&w=majority',
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false },
  )
  .then(() => {
    console.log('Successful connect');
    app.listen(port, () => console.log(`listening on port ${port}...`))
  })
  .catch(err => console.log(err));

app.use('/api/v1', users);

// const newTodo = new Todo({
//   id: 1,
//   title: "First one",
//   completed: false,
//   editing: false,
// })

// newTodo.save(error => {
//   if (error) {
//     console.log(error)
//   } else {
//     console.log('Data is saved')
//   }
// })

module.exports = app;
