const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  todo: {
    type: String, // task is a string
    unique: true, 
    required: true
  },
  finished: {
    type: Boolean, // it is a boolean
    default: false
  },
});

const taskModel = mongoose.model("Tasks", taskSchema);
module.exports = taskModel;
