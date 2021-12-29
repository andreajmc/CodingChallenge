const mongoose = require("mongoose")
require('dotenv').config({path: 'variables.env'});
mongoose.connect(process.env.DB_URL, {
  // connecting to the mongodb database 
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.set("debug", true) 
mongoose.Promise = Promise // setting mongoose's Promise to use Node's Promise

module.exports.Tasks = require("./tasks")