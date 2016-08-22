// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');

var app      = express();

var port     = process.env.PORT || 3030;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var bodyParser = require('body-parser');
var cookieParser=require("cookie-parser");
var session = require('express-session')
var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database


require('./config/passport')(passport); // pass passport for configuration


//app.use(express.static(__dirname + '/public'));
	// set up our express application
	//app.use(express.logger('dev')); // log every request to the console
	app.use(cookieParser()); // read cookies (needed for auth)
	app.use(bodyParser.urlencoded({
        extended: true,
     parameterLimit: 10000000000,
     limit: 1024 * 1024 * 10 *10
}));
app.use(bodyParser.json({
        extended: true,
     parameterLimit: 10000000000,
     limit: 1024 * 1024 * 10 *10
}));

	app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport
	app.use(session({ secret: 'jackisthebestbestbesty' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session


     /*
     function requireHTTPS(req, res, next) {
         if (!req.secure) {
             //FYI this should work for local development as well
             return res.redirect('https://' + req.get('host') + req.url);
         }
         next();
     }

     app.use(requireHTTPS);
     */


///some app.js
var fs = require('fs')
//var stream = fs.createReadStream(__dirname+"/visual.csv");
var stream2 = fs.createReadStream(__dirname+"/visual2.csv");
var csv = require("fast-csv");


/*
var full_data=[];
csv
 .fromStream(stream, {headers : true})
 .on("data", function(data){
     full_data.push(data);
 })
 .on("end", function(){
     console.log("done loading data1");
 });
*/

var l_data=[];
csv
 .fromStream(stream2, {headers : true})
 .on("data", function(data){
     l_data.push(data);
 })
 .on("end", function(){
     console.log("done loading data2");
 });

var streamch = fs.createReadStream(__dirname+"/chvisual2.csv");


var chl_data=[];
csv
 .fromStream(streamch, {headers : true})
 .on("data", function(data){
     chl_data.push(data);
 })
 .on("end", function(){
     console.log("done loading chdata2");
 });


var User       		= require('./app/models/user');
var Query       		= require('./app/models/query');


////internatioanl
//var interstream = fs.createReadStream(__dirname+"/visualinternational.csv");
var interstream2 = fs.createReadStream(__dirname+"/visual2international.csv");
var csv = require("fast-csv");

/*
var interfull_data=[];
csv
 .fromStream(interstream, {headers : true})
 .on("data", function(data){
     interfull_data.push(data);
 })
 .on("end", function(){
     console.log("done loading inter data1");
 });
*/
var interl_data=[];
csv
 .fromStream(interstream2, {headers : true})
 .on("data", function(data){
     interl_data.push(data);
 })
 .on("end", function(){
     console.log("done loading inter data2");
 });

///////

//////qubec files
//var qubstream = fs.createReadStream(__dirname+"/quebecvisual.csv");
var qubstream2 = fs.createReadStream(__dirname+"/quebecvisual2.csv");

/*
var qubfull_data=[];
csv
 .fromStream(qubstream, {headers : true})
 .on("data", function(data){
     qubfull_data.push(data);
 })
 .on("end", function(){
     console.log("done loading qub data1");
 });
*/

var qubl_data=[];
csv
 .fromStream(qubstream2, {headers : true})
 .on("data", function(data){
     qubl_data.push(data);
 })
 .on("end", function(){
     console.log("done loading qub data2");
 });

var Proj                 = require('./app/models/proj');




// routes ======================================================================
require('./app/routes.js')(app, passport,l_data,interl_data,qubl_data,User,Query,chl_data,Proj); // load our routes and pass in our app and fully configured passport



////app.js end

// launch ======================================================================






  app.listen(port);
     console.log('The magic happens on port ' + port);


