import 'babel-polyfill'
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const port = 8000;
const  routes = require('./api/routes/route');
routes(app);
app.listen(port, function(){
  console.log("we are live on port number", port)
});
