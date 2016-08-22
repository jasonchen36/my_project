// app/models/proj.js
// load the things we need
var mongoose = require('mongoose');




// define the schema for our user model
var saved_filtersSchema = mongoose.Schema({

        email        : String,
        title     : String,
        name: String,
        type: String,
       // sentence: String,
       // paragraph: String,
       // ispublic: String,
       // genre: [String],
       // actors: [String],
       // director: [String],
       // password:String,
        url: String,

        filter: {  
        percentage:Number,
        op:Number,
        opu:Number,
        kfr_min:Number,
        kfr_max:Number,
        Comedy:mongoose.Schema.Types.Mixed,
        Family: mongoose.Schema.Types.Mixed,
        Action: mongoose.Schema.Types.Mixed,
        Adventure:mongoose.Schema.Types.Mixed,
        Drama:mongoose.Schema.Types.Mixed,
        Historical:mongoose.Schema.Types.Mixed,
        Fantasy:mongoose.Schema.Types.Mixed,
        Crime:mongoose.Schema.Types.Mixed,
        Horror:mongoose.Schema.Types.Mixed,
        Romance:mongoose.Schema.Types.Mixed,
        Thriller:mongoose.Schema.Types.Mixed,
        SciFi:mongoose.Schema.Types.Mixed,
        Mystery:mongoose.Schema.Types.Mixed,
        War:mongoose.Schema.Types.Mixed,
        Biography:mongoose.Schema.Types.Mixed,
        Documentary:mongoose.Schema.Types.Mixed,
        Music:mongoose.Schema.Types.Mixed,
        Musical:mongoose.Schema.Types.Mixed,
        Animation:mongoose.Schema.Types.Mixed,
        Western:mongoose.Schema.Types.Mixed,
        Sport:mongoose.Schema.Types.Mixed,
        keywords:[String],
        actors:[String],
        techrole:[String],
        lx:Number,
        lxu:Number,
        ly:Number,
        lyu:Number
        }

    

});



// create the model for users and expose it to our app
module.exports = mongoose.model('saved_filters', saved_filtersSchema);
