// app/models/query.js
// load the things we need
var mongoose = require('mongoose');


// define the schema for our query
var query = mongoose.Schema({
	email : String,
	op : Number,
	opu: Number,

	Comedy:[String],
	Family: [String],
	Action: [String],
	Adventure:[String],
	Drama:[String],
	Historical:[String],
	Fantasy:[String],
	Crime:[String],
	Horror:[String],
	Romance:[String],
	Thriller:[String],
	SciFi:[String],
	Mystery:[String],
	War:[String],
	Biography:[String],
	Documentary:[String],
	Music:[String],
	Musical:[String],
	Animation:[String],
	Western:[String],
	Sport:[String],
	keywords:[String],
	actors:[String],
	techrole:[String],
	lx:Number,
	lxu:Number,
	ly:Number,
	lyu:Number
});




// create the model for users and expose it to our app
module.exports = mongoose.model('query', query);
