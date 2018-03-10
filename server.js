const express = require('express');
//var mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3001;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));


/// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
//var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/wakeHomes";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
//mongoose.Promise = Promise;
//mongoose.connect(MONGODB_URI, {
//  useMongoClient: true
//});