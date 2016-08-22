// app/models/proj.js
// load the things we need
var mongoose = require('mongoose');




// define the schema for our user model
var projSchema = mongoose.Schema({

        email        : String,
        title     : String,
        name: String,
        sentence: String,
        paragraph: String,
       // ispublic: String,
        genre: [String],
        actors: [String],
        director: [String],
       // password:String,
        url:String,

        filter_url: [
            String
    ]

    

});



// create the model for users and expose it to our app
module.exports = mongoose.model('Proj', projSchema);
