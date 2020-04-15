var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')
const Todo = require("../models/todo");

router.use(bodyParser.json())

/* GET users listing. */
router.get('/', function(req, res) {
  Todo.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err)
    })
});

router.post('/', function(req, res) {
  const todo = new Todo({
    id: req.body.id,
    title: req.body.title,
    completed: req.body.completed,
    editing: req.body.editing
  });

  todo
    .save()
    .catch(err => {
      console.log(err);
    });
});

router.delete('/:id', function(req, res) {
  Todo.findOneAndRemove({'id': req.params.id})
    .catch(err => console.log(err))
})

router.post('/update', function(req, res) {
  const todo = new Todo({
    id: req.body.id,
    title: req.body.title,
    completed: req.body.completed,
    editing: req.body.editing
  });
  console.log(todo);
  Todo.findOneAndUpdate({id: todo.id}, {completed: todo.completed, title: todo.title})
    .catch(err => console.log(err))
});

router.post('/checkall', function(req, res) {
  const complete = req.body.completed
  Todo.updateMany({}, {completed: complete})
    .catch(err => console.log(err))
});

module.exports = router;
