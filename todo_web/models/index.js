const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/todolist", {
  // connecting to the mongodb database name: "todolist" locally
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.set("debug", true) 
mongoose.Promise = Promise // setting mongoose's Promise to use Node's Promise

module.exports.Tasks = require("./tasks")