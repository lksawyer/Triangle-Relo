const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
console.log("Port is "+PORT);

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Require all models

//db config with password if needed
//mongoose.connect(‘mongodb://trianlgerelo:UNCproject3@ds117719.mlab.com:17719/wakehomes’);

// Set up promises with mongoose
mongoose.Promise = global.Promise;

// If deployed, use the deployed database. Otherwise use the local mongo database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/wakehomes";
mongoose.connect(MONGODB_URI, { useMongoClient: true });

const db = mongoose.connection;


// Show any Mongoose errors
db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Start the API server
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);