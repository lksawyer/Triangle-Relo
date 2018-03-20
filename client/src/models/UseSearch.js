var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var SearchSchema = new Schema({
  userID: String,
  SearchArea: Array,
  SearchMarkers:Array
});

// This creates our model from the above schema, using mongoose's model method
var UserSearch = mongoose.model("UserSearch", SearchSchema);

// Export the UserSearch model
module.exports = UserSearch;
