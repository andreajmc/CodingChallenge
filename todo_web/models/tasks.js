const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  todo: {
    type: String, // task is a string
    unique: true, 
    required: true
  },
  finished: {
    type: Boolean, // stae of the task which is a boolean
    default: false
  },
});

const taskModel = mongoose.model("Tasks", taskSchema);
module.exports = taskModel;
