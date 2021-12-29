const mongoose = require("mongoose")
require('dotenv').config();

mongoose.connect("mongodb+srv://admin:admin@cluster0.sxncp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(db => console.log("BD Connected"))
.catch(error => console.log("Could not connect to DB:", error))

mongoose.set("debug", true) 
mongoose.Promise = Promise // setting mongoose's Promise to use Node's Promise

module.exports.Tasks = require("./tasks")