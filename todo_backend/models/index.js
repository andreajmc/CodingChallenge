const mongoose = require("mongoose")
require('dotenv').config();

console.log("url:",process.env.DB_URL)

mongoose.connect(process.env.DB_URL, {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.set("debug", true) 
mongoose.Promise = Promise // setting mongoose's Promise to use Node's Promise

module.exports.Tasks = require("./tasks")