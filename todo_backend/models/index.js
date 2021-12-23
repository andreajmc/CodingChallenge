const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/todolist", {
  // connecting to the mongodb database name: "todolist" locally
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
console.log("Connected to Database sucessfully.")
mongoose.set("debug", true) 
mongoose.Promise = Promise // setting mongoose's Promise to use Node's Promise

module.exports.Item = require("./item") 