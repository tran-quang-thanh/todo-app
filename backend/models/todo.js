const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  id: Number,
  title: String,
  completed: Boolean,
  editing: Boolean
});

module.exports = mongoose.model("todo", todoSchema);
