// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var imovieSchema = mongoose.Schema({

    title:String,
    keywords:[String],
    actors:[String],
    techrole:[String],
    x:Number,
    y:Number,
    ap:Number,
    op:Number,
    year:Number,

    Comedy:Boolean,
    Family: Boolean,
    Action: Boolean,
    Adventure:Boolean,
    Drama:Boolean,
    Historical:Boolean,
    Fantasy:Boolean,
    Crime:Boolean,
    Horror:Boolean,
    Romance:Boolean,
    Thriller:Boolean,
    SciFi:Boolean,
    Mystery:Boolean,
    War:Boolean,
    Biography:Boolean,
    Documentary:Boolean,
    Music:Boolean,
    Musical:Boolean,
    Animation:Boolean,
    Western:Boolean,
    Sport:Boolean


});

// methods ======================
// generating a hash


// create the model for users and expose it to our app
module.exports = mongoose.model('imovie', imovieSchema);
