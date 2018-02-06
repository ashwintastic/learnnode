import 'babel-polyfill';
const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const app        = express();
const port       = 8000;
const routes    = require('./api/routes/route');
import GlobalConfig from './api/config';
const VoiceResponse = require('twilio').twiml.VoiceResponse;

mongoose.Promise = global.Promise;
export const db = mongoose.connect(GlobalConfig.mongoDb, {
  useMongoClient: true
  /* other options */
});

var normalizedPath = require("path").join(__dirname, "api/model/");

require("fs").readdirSync(normalizedPath).forEach(function(file) {
    require("./api/model/" + file);
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());




/*app.post('/gather', (request, response) => {
    // Use the Twilio Node.js SDK to build an XML response
    const twiml = new VoiceResponse();
    console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");

    // Use the <Gather> verb to collect user input
    const gather = twiml.gather({numDigits: 1});
    gather.say('For sales, press 1. For support, press 2.');

    // If the user doesn't enter input, loop
    twiml.redirect('/voice');

    // Render the response as XML in reply to the webhook request
    response.type('text/xml');
    response.send(twiml.toString());
});*/

routes(app);

app.listen(port, function(){
  console.log("we are live on port number", port)
});
