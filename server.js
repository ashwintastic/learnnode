import 'babel-polyfill'
const express        = require('express');
const mongoose    = require('mongoose')
const bodyParser     = require('body-parser');
const app            = express();
const port = 8000;
const  routes = require('./api/routes/route');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/myCab', {
  useMongoClient: true
  /* other options */
});

var normalizedPath = require("path").join(__dirname, "api/model/");

require("fs").readdirSync(normalizedPath).forEach(function(file) {
    require("./api/model/" + file);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);
app.listen(port, function(){
  console.log("we are live on port number", port)
});
