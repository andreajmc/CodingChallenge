const mongoose = require("mongoose") 
const itemSchema = new mongoose.Schema({
  task: {
    type: String, // task is a string
    unique: true, 
    required: true, 
  },
  state: {
    type: Boolean, // it is a boolean
    default: false,
  },
})

const itemModel = mongoose.model("Todo", itemSchema) 
module.exports = itemModel 