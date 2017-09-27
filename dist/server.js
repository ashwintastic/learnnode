'use strict';

require('babel-polyfill');

var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var app = express();
var port = 8000;
var routes = require('./api/routes/route');
routes(app);
app.listen(port, function () {
  console.log("we are live on port number", port);
});