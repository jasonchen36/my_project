// app/routes.js
module.exports = function(app, passport,l_data,interl_data,qubl_data,User,Query,chl_data,Proj,saved_filters) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});

	app.get('/defaultsite', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/welcome', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/login', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)

	var express  = require('express');
	
	
  pathstr=__dirname.length-3

    cd=__dirname.substr(0,pathstr)


app.use('/everyone',express.static(cd+'/everyone'));

app.all('/public/*', isLoggedIn,function(req, res, next) {
		
  next();
})



app.use('/public',isLoggedIn,express.static(cd+'/public'));


app.use('/public_shared',express.static(cd+'/public_shared'));



	app.get('/BOterminal', isLoggedIn, function(req, res,next) {
    
		

        console.log(req.user.local.email+" logged in from "+ String(req.connection.remoteAddress))
  

		//res.sendFile('/Users/jackzhang/Documents/d3stuff/Glightwb 2100 total secure/public'),
		res.sendFile(cd+'/public/amark.html'
		

			//{

		//	user : req.user // get the user out of session and pass to template
		//}
		);
	});


  app.get('/newui', isLoggedIn, function(req, res,next) {

    User.findOne({'local.email':req.user.local.email},function (err, user) {
  if (err) return handleError(err);


  if (user.local.basic=="yes"){
    

        console.log(req.user.local.email+" logged in from "+ String(req.connection.remoteAddress))

    //res.sendFile('/Users/jackzhang/Documents/d3stuff/Glightwb 2100 total secure/public'),
    res.sendFile(cd+'/public/admin_2/index.html'
    

      //{

    //  user : req.user // get the user out of session and pass to template
    //}
    );
  }
  else {
    res.sendFile(cd+'/public/noaccess.html')
  }})
  });



  app.get('/newuiplus', isLoggedIn, function(req, res,next) {

    User.findOne({'local.email':req.user.local.email},function (err, user) {
  if (err) return handleError(err);


  if (user.local.basicplus=="yes"){
    

        console.log(req.user.local.email+" logged in from "+ String(req.connection.remoteAddress))

    //res.sendFile('/Users/jackzhang/Documents/d3stuff/Glightwb 2100 total secure/public'),
    res.sendFile(cd+'/public/newui+.html'
    

      //{

    //  user : req.user // get the user out of session and pass to template
    //}
    );
  }
  else {
    res.sendFile(cd+'/public/noaccess.html')
  }})
  });


    app.get('/geoui', isLoggedIn, function(req, res,next) {
      User.findOne({'local.email':req.user.local.email},function (err, user) {
  if (err) return handleError(err);


  if (user.local.pro=="yes"){
    

        console.log(req.user.local.email+" logged in from "+ String(req.connection.remoteAddress))

    //res.sendFile('/Users/jackzhang/Documents/d3stuff/Glightwb 2100 total secure/public'),
    res.sendFile(cd+'/public/geoUI.html'
    

      //{

    //  user : req.user // get the user out of session and pass to template
    //}
    );

  }

  else {
    res.sendFile(cd+'/public/noaccess.html')
  }})

  });


 app.get('/geoui_popup', isLoggedIn, function(req, res,next) {
      User.findOne({'local.email':req.user.local.email},function (err, user) {
  if (err) return handleError(err);


  if (user.local.pro=="yes"){
    

        console.log(req.user.local.email+" logged in from "+ String(req.connection.remoteAddress))

    //res.sendFile('/Users/jackzhang/Documents/d3stuff/Glightwb 2100 total secure/public'),
    res.sendFile(cd+'/public/geoUI_popup.html'
    

      //{

    //  user : req.user // get the user out of session and pass to template
    //}
    );

  }

  else {
    res.sendFile(cd+'/public/noaccess.html')
  }})

  });


    app.get('/fb', isLoggedIn, function(req, res,next) {

      User.findOne({'local.email':req.user.local.email},function (err, user) {
  if (err) return handleError(err);


  if (user.local.fb=="yes"){


    

        console.log(req.user.local.email+" logged in from "+ String(req.connection.remoteAddress))

    //res.sendFile('/Users/jackzhang/Documents/d3stuff/Glightwb 2100 total secure/public'),
    res.sendFile(cd+'/public/fb.html'
    

      //{

    //  user : req.user // get the user out of session and pass to template
    //}
    );
  }
  else {
    res.sendFile(cd+'/public/noaccess.html')
  }})


  });




//advanced BO

  app.get('/adv_bo', isLoggedIn, function(req, res,next) {
    

        console.log(req.user.local.email+" logged in from "+ String(req.connection.remoteAddress))

    //res.sendFile('/Users/jackzhang/Documents/d3stuff/Glightwb 2100 total secure/public'),
    res.sendFile(cd+'/public/adv_amark.html'
    

      //{

    //  user : req.user // get the user out of session and pass to template
    //}
    );
  });


//advanced BO





  app.get('/geo_d', isLoggedIn, function(req, res) {
    

        console.log(req.user.local.email+" logged in from "+ String(req.connection.remoteAddress))

    //res.sendFile('/Users/jackzhang/Documents/d3stuff/Glightwb 2100 total secure/public'),
    res.sendFile(cd+'/public/geo_d.html'
    

      //{

    //  user : req.user // get the user out of session and pass to template
    //}
    );
  });



  app.get('/ch_actor', isLoggedIn, function(req, res) {
    

        console.log(req.user.local.email+" logged in from "+ String(req.connection.remoteAddress))

    //res.sendFile('/Users/jackzhang/Documents/d3stuff/Glightwb 2100 total secure/public'),
    res.sendFile(cd+'/public/ch_actor.html'
    

      //{

    //  user : req.user // get the user out of session and pass to template
    //}
    );
  });


	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.post('/logout', function(req, res) {

     User.findOne({"local.email":req.user.local.email},function(err,user){
              user.local.notfinish=false
                                          user.save()})
		req.logout();
		res.redirect('/');
	});

////app.js



//var bodyParser = require('body-parser');
//app.use(bodyParser.json({limit: "500mb"}));
//app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));



function isBigEnough(value) {
        return function(element, index, array) {
          return (element >= value);
            }
              }

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}
  

//app.use(bodyParser());

app.get('/changepw',isLoggedIn,function(req,res){


  res.render('changepw.ejs',{ message: req.flash('changepwMessage') })

})

app.post('/changepassword',isLoggedIn,function(req,res){

  User.findOne({"local.email":req.user.local.email},function(err,user){



   // console.log(user.local.password)
    if(!user.validPassword(req.body.oldpassword)){

      req.flash('changepwMessage', 'Wrong Password')
               return res.redirect('/changepw');

    }

    if(req.body.newpassword!=req.body.rnewpassword){
      req.flash('changepwMessage', 'New passwords don\'t match')
               return res.redirect('/changepw');
    }

    if(req.body.newpassword==""){
      req.flash('changepwMessage', 'New passwords can\'t be empty')
               return res.redirect('/changepw');
    }


    else{//console.log(user.generateHash(req.body.newpassword))
    user.local.password = user.generateHash(req.body.newpassword)
    user.save()


    res.render("changed.ejs")
  }


  })



})
  app.get('/welcome', isLoggedIn,function(req, res) {

    // render the page and pass in any flash data if it exists
    res.sendFile(cd+'/public/welcome.html');
  });


  app.get('/myprojs', isLoggedIn,function(req, res) {

    // render the page and pass in any flash data if it exists
    res.sendFile(cd+'/public/myprojs.html');
  });


/////////////////////
////////////save_data
/////////////////////
app.post('/save_data',isLoggedIn,function(req,res){

  User.findOne({"local.email":req.user.local.email},function(err,user){

    save_data=req.body

    save_data['user']=user.local.email


            var childjs=child.fork(__dirname+'/save_data.js');
            childjs.send(save_data);
            childjs.on('message',function(wd){


              
                          res.json({ success: wd.res_data});
                                     
                                       childjs.kill();
            })
  })
})

/////////////////
/////manage_data
////////////////
app.post('/manage_data',isLoggedIn,function(req,res){

  User.findOne({"local.email":req.user.local.email},function(err,user){
            var childjs=child.fork(__dirname+'/manage_data.js');

            req_data=req.body



            console.log(req_data)
            send_info=[user.local.email,req_data]
            childjs.send(send_info);
            childjs.on('message',function(wd){


              
                          res.json({ success: wd.res_data});
                                     
                                       childjs.kill();
            })
  })
})

//////////////////
/////read_data
//////////////////
app.post('/header_data',isLoggedIn,function(req,res){

  User.findOne({"local.email":req.user.local.email},function(err,user){
            var childjs=child.fork(__dirname+'/header_data.js');
            childjs.send(user.local.email);
            childjs.on('message',function(wd){


              
                          res.json({ success: wd.res_data});
                                     
                                       childjs.kill();
            })
  })
})

//////////////
////view_reports
/////////////
app.get('/view/:tagId', isLoggedIn,function(req, res) {
    res.sendFile(cd+'/public/view_fb.html');
});


app.get('/view_shared/:tagId',function(req, res) {
    res.sendFile(cd+'/public/view_fb_shared.html');
});




app.post('/view_data', function(req, res) {
   // res.sendFile(cd+'/public/view_fb.html');

   url=req.body

   console.log(url)

    var childjs=child.fork(__dirname+'/view_data_child.js');
            childjs.send({url:url});
            childjs.on('message',function(wd){


              
                          res.json({ success: wd.res_data});
                                     
                                       childjs.kill();
            })


});



//////////////
////edit_reports
/////////////
app.get('/edit/:tagId',isLoggedIn, function(req, res) {
    res.sendFile(cd+'/public/edit_fb.html');
});



/////////////
////benchmark
///////////

app.post('/lgd', isLoggedIn,function(req, res,done) {


	//console.log(req.user.local.email)
	User.findOne({'local.email':req.user.local.email},function (err, user) {
  if (err) return handleError(err);
  

if(user.local.current_usage>=user.local.usage_limit){

	res.json({ ld: {x:"expired"} })
   console.log(user.local.email +" expired")

}

if(user.local.notfinish==true){

  res.json({ ld: {x:"notfinish"} })
   console.log(user.local.email +" not finished and is probably hacking")

}
 // var current_usr=usrs[req.connection.remoteAddress];
 // if((usr_total_tries[current_usr]-usr_current_tries[current_usr])<=0){
     
 //   res.json({ ld: {x:"expired"} })
 //   console.log(current_usr +" expired")

//  }
 // else{

  else{  
    console.log(user.local.email+" tries left: "+
      String(user.local.usage_limit-user.local.current_usage))
  console.log("requested data2(fy)")


  user.local.current_usage=user.local.current_usage+1
  user.save(function (err) {
   if (err) return handleError(err);
    return done(null, user);
  });
 // usr_current_tries[current_usr]++
  res.json({ ld: l_data });}
//}
})
})



/////////
///shared_bencmark
///
app.post('/lgd_shared',function(req, res,done) {
  res.json({ ld: l_data });})
//}




app.post('/chlgd', isLoggedIn,function(req, res,done) {


  //console.log(req.user.local.email)
  User.findOne({'local.email':req.user.local.email},function (err, user) {
  if (err) return handleError(err);
  

if(user.local.current_usage>=user.local.usage_limit){

  res.json({ ld: {x:"expired"} })
   console.log(user.local.email +" expired")

}

if(user.local.notfinish==true){

  res.json({ ld: {x:"notfinish"} })
   console.log(user.local.email +" not finished and is probably hacking")

}
 // var current_usr=usrs[req.connection.remoteAddress];
 // if((usr_total_tries[current_usr]-usr_current_tries[current_usr])<=0){
     
 //   res.json({ ld: {x:"expired"} })
 //   console.log(current_usr +" expired")

//  }
 // else{

  else{  
    console.log(user.local.email+" tries left: "+
      String(user.local.usage_limit-user.local.current_usage))
  console.log("requested data2(fy)")


  user.local.current_usage=user.local.current_usage+1
  user.save(function (err) {
   if (err) return handleError(err);
    return done(null, user);
  });
 // usr_current_tries[current_usr]++
  res.json({ ld: chl_data });}
//}
})
})






app.post('/location', 
  isLoggedIn
  ,function(req, res) {

    User.findOne({'local.email':req.user.local.email},function (err, user) {
  if (err) return handleError(err);
  

if(user.local.basicplus=="no"){ res.json({ ld: {x:"Not subscribed"} })   }

if(user.local.pro=="no"){  res.json({ ld: {x:"Not subscribed"} }) }

if (user.local.pro=="yes" || user.local.basicplus=="yes"){  
//  titles=req.body
 // console.log(req.body['titles'])
  titles=req.body['titles']


              var childjs=child.fork(__dirname+'/location.js');
            childjs.send({titles:titles});
            childjs.on('message',function(wd){


              
                          res.json({ success: wd.res_data});
                                     
                                       childjs.kill();
            })

            }
else {
  res.json({ ld: {x:"Not subscribed"} })
}

          })
})



app.post('/location_UI', 
  isLoggedIn
  ,function(req, res) {

     User.findOne({'local.email':req.user.local.email},function (err, user) {
  if (err) return handleError(err);
//  titles=req.body
 // console.log(req.body['titles'])

 if (user.local.pro=="yes" || user.local.basicplus=="yes"){  
  titles=req.body['titles']

              var childjs=child.fork(__dirname+'/location_UI.js');
            childjs.send({titles:titles});
            childjs.on('message',function(wd){


              
                          res.json({ success: wd.res_data});
                                     
                                       childjs.kill();
            })

          }
      else {
  res.json({ ld: {x:"Not subscribed"} })
}

          })



})

app.post('/pred', 
  isLoggedIn
  ,function(req, res) {
    User.findOne({'local.email':req.user.local.email},function (err, user) {
  if (err) return handleError(err);
//  titles=req.body
 // console.log(req.body['titles'])

 if (user.local.pro=="yes" || user.local.basicplus=="yes" || user.local.basic=="yes" ){  
//  titles=req.body
 // console.log(req.body['titles'])
  titles=req.body['titles']


              var childjs=child.fork(__dirname+'/pred_child.js');
            childjs.send({titles:titles});
            childjs.on('message',function(wd){


              
                          res.json({ success: wd.res_data});
                                     
                                       childjs.kill();
            })
            }
      else {
  res.json({ ld: {x:"Not subscribed"} })
}

          })


})




app.post('/foreign_breakdown', 
  isLoggedIn
  ,function(req, res) {
    User.findOne({'local.email':req.user.local.email},function (err, user) {
  if (err) return handleError(err);
//  titles=req.body
 // console.log(req.body['titles'])

 if (user.local.fb=="yes" ){  
//  titles=req.body
 // console.log(req.body['titles'])
  titles=req.body['titles']


              var childjs=child.fork(__dirname+'/fb_child.js');
            childjs.send({titles:titles});
            childjs.on('message',function(wd){


              
                          res.json({ success: wd.res_data});
                                     
                                       childjs.kill();
            })
            }
      else {
  res.json({ ld: {x:"Not subscribed"} })
}

          })


})



	//var filters;

///////////////////location UI route starts







//////////////////////location UI route ends

var child = require('child_process');


////post request and response
app.post('/filters', isLoggedIn,function(req, res) {

 // console.log(req["user"])
User.findOne({'local.email':req.user.local.email},function (err, user) {
  if (err) return handleError(err);
  

if(user.local.current_usage>user.local.usage_limit){

	
   console.log(user.local.email +" expired no data sent")

}

//  var current_usr=usrs[req.connection.remoteAddress];
//  if(usr_current_tries[current_usr]>usr_total_tries[current_usr]){
    

//  }
if(user.local.notfinish==true){

  
   console.log(user.local.email +" is hacking and no data sent")

}


  if(user.local.pro=="yes" || user.local.basicplus=="yes" || user.local.basic=="yes" || user.local.fb=="yes"|| user.local.china=="yes"){
          user.local.notfinish=true
    user.save()

                                            
                                            
                                          filters=req.body;

//console.log(filters)


                                        filters['keywords']=filters.keywords.split(',')
                                        filters['actors']=filters.actors.split(',')
                                        filters['techrole']=filters.techrole.split(',')



                                         var fquery=[{}]
  var dquery=[{}]

  if(filters.keywords!=''){
  for (i in filters.keywords){
    fquery.push({"keywords":filters.keywords[i]})
  }}



//fquery push here demographics filter


 //fquery.push({"keywords":{$ne:"sequel"}})
 //fquery.push({"keywords":{$ne:"prequel"}})




// fquery.push({$or:{"title":"The Help"}})
//  fquery.push({"title":{$ne:"The Lord of the Rings: The Fellowship of the Ring"}})
 //  fquery.push({"title":{$ne:"Harry Potter and the Sorcerer's Stone"}})
//  fquery.push({$and:[{$or:[
   // {Action:true},{Adventure:true},
//    {Fantasy:true},{SciFi:true}]}]})

  var kwor1=[]
  var kwor2=[]
  var kwor3=[]
//console.log(filters)

  filters['keywordsor1']=filters.keywordsor1.split(',')
  filters['keywordsor2']=filters.keywordsor2.split(',')  
  filters['keywordsor3']=filters.keywordsor3.split(',') 

  if(typeof filters.keywordsor1!="undefined"){

    for (i in filters.keywordsor1){
    kwor1.push({"keywords":filters.keywordsor1[i]})
  }


  }

    if(typeof filters.keywordsor2!="undefined"){

    for (i in filters.keywordsor2){
    kwor2.push({"keywords":filters.keywordsor2[i]})
  }


  }

   if(typeof filters.keywordsor3!="undefined"){

    for (i in filters.keywordsor3){
    kwor3.push({"keywords":filters.keywordsor3[i]})
  }


  }

  var andor=[{}]

  if((typeof filters.keywordsor1!="undefined")){
    andor.push({$or:kwor1})

  }

    if((typeof filters.keywordsor2!="undefined")){
    andor.push({$or:kwor2})

  }

      if((typeof filters.keywordsor3!="undefined")){
    andor.push({$or:kwor3})

  }



  fquery.push({$and:andor})



  if(filters.actors!=''){
  for (i in filters.actors){
    fquery.push({"actors":filters.actors[i]})
  }}

  if(filters.techrole!=''){
  for (i in filters.techrole){
    fquery.push({"techrole":filters.techrole[i]})
  }}





                                        if(filters.Comedy=="yes"){
                                        fquery.push({"Comedy":true})}
                                        if(filters.Comedy=="no"){
                                          fquery.push({"Comedy":false})}
                                        if(filters.Comedy=="bs"){fquery.push({"Comedy":'bs'})}


                                       if(filters.Family=="yes"){
                                        fquery.push({"Family":true})}
                                        if(filters.Family=="no"){
                                          fquery.push({"Family":false})}
                                        if(filters.Family=="bs"){fquery.push({"Family":'bs'})}
                                        
                                        if(filters.Action=="yes"){
                                        fquery.push({"Action":true})}
                                        if(filters.Action=="no"){
                                          fquery.push({"Action":false})}
                                        if(filters.Action=="bs"){fquery.push({"Action":'bs'})}

                                        
                                        if(filters.Adventure=="yes"){
                                        fquery.push({"Adventure":true})}
                                        if(filters.Adventure=="no"){
                                          fquery.push({"Adventure":false})}
                                        if(filters.Adventure=="bs"){fquery.push({"Adventure":'bs'})}

                                        
                                        if(filters.Drama=="yes"){
                                        fquery.push({"Drama":true})}
                                        if(filters.Drama=="no"){
                                          fquery.push({"Drama":false})}
                                        if(filters.Drama=="bs"){fquery.push({"Drama":'bs'})}

                                        
                                        if(filters.Historical=="yes"){
                                        fquery.push({"Historical":true})}
                                        if(filters.Historical=="no"){
                                          fquery.push({"Historical":false})}
                                        if(filters.Historical=="bs"){fquery.push({"Historical":'bs'})}
                                        

                                        if(filters.Fantasy=="yes"){
                                        fquery.push({"Fantasy":true})}
                                        if(filters.Fantasy=="no"){
                                          fquery.push({"Fantasy":false})}
                                        if(filters.Fantasy=="bs"){fquery.push({"Fantasy":'bs'})}
                                        

                                        if(filters.Crime=="yes"){
                                        fquery.push({"Crime":true})}
                                        if(filters.Crime=="no"){
                                          fquery.push({"Crime":false})}
                                        if(filters.Crime=="bs"){fquery.push({"Crime":'bs'})}
                                        

                                        if(filters.Horror=="yes"){
                                        fquery.push({"Horror":true})}
                                        if(filters.Horror=="no"){
                                          fquery.push({"Horror":false})}
                                        if(filters.Horror=="bs"){fquery.push({"Horror":'bs'})}
                                        

                                        if(filters.Romance=="yes"){
                                        fquery.push({"Romance":true})}
                                        if(filters.Romance=="no"){
                                          fquery.push({"Romance":false})}
                                        if(filters.Romance=="bs"){fquery.push({"Romance":'bs'})}
                                        

                                        if(filters.Thriller=="yes"){
                                        fquery.push({"Thriller":true})}
                                        if(filters.Thriller=="no"){
                                          fquery.push({"Thriller":false})}
                                        if(filters.Thriller=="bs"){fquery.push({"Thriller":'bs'})}
                                        

                                        if(filters.SciFi=="yes"){
                                        fquery.push({"SciFi":true})}
                                        if(filters.SciFi=="no"){
                                          fquery.push({"SciFi":false})}
                                        if(filters.SciFi=="bs"){fquery.push({"SciFi":'bs'})}
                                        

                                        if(filters.Mystery=="yes"){
                                        fquery.push({"Mystery":true})}
                                        if(filters.Mystery=="no"){
                                          fquery.push({"Mystery":false})}
                                        if(filters.Mystery=="bs"){fquery.push({"Mystery":'bs'})}
                                        

                                        if(filters.War=="yes"){
                                        fquery.push({"War":true})}
                                        if(filters.War=="no"){
                                          fquery.push({"War":false})}
                                        if(filters.War=="bs"){fquery.push({"War":'bs'})}
                                        

                                        if(filters.Biography=="yes"){
                                        fquery.push({"Biography":true})}
                                        if(filters.Biography=="no"){
                                          fquery.push({"Biography":false})}
                                        if(filters.Biography=="bs"){fquery.push({"Biography":'bs'})}
                                        

                                        if(filters.Documentary=="yes"){
                                        fquery.push({"Documentary":true})}
                                        if(filters.Documentary=="no"){
                                          fquery.push({"Documentary":false})}
                                        if(filters.Documentary=="bs"){fquery.push({"Documentary":'bs'})}
                                        

                                        if(filters.Music=="yes"){
                                        fquery.push({"Music":true})}
                                        if(filters.Music=="no"){
                                          fquery.push({"Music":false})}
                                        if(filters.Music=="bs"){fquery.push({"Music":'bs'})}
                                        

                                        if(filters.Musical=="yes"){
                                        fquery.push({"Musical":true})}
                                        if(filters.Musical=="no"){
                                          fquery.push({"Musical":false})}
                                        if(filters.Musical=="bs"){fquery.push({"Musical":'bs'})}

                                          if(filters.Animation=="yes"){
                                        fquery.push({"Animation":true})}
                                        if(filters.Animation=="no"){
                                          fquery.push({"Animation":false})}
                                        if(filters.Animation=="bs"){fquery.push({"Animation":'bs'})}


                                          if(filters.Western=="yes"){
                                        fquery.push({"Western":true})}
                                        if(filters.Western=="no"){
                                          fquery.push({"Western":false})}
                                        if(filters.Western=="bs"){fquery.push({"Western":'bs'})}


                                          if(filters.Sport=="yes"){
                                        fquery.push({"Sport":true})}
                                        if(filters.Sport=="no"){
                                          fquery.push({"Sport":false})}
                                        if(filters.Sport=="bs"){fquery.push({"Sport":'bs'})}

fquery.push({x:{$gte:Number(filters.lx),$lte:Number(filters.lxu)}})
fquery.push({year:{$gte:Number(filters.ly),$lte:Number(filters.lyu)}})








//fquery={$or:[{"title":"The Help"},fquery]}




for (i in fquery){
          dquery.push(fquery[i])
        }

        dquery.push({op:{$gte:Number(filters.op),$lte:Number(filters.opu)}})



            var childjs=child.fork(__dirname+'/dmoviechild.js');
            childjs.send({fquery:fquery,dquery:dquery,filters:filters});
            childjs.on('message',function(wd){


              
                          res.json({ success: wd.ddd, data1: wd.ddd1,
                                                      kword:wd.dsdkw,kword1:wd.sdkw,ktpercentage:wd.ktpercentage,summ:wd.sum,
                                                      actord:wd.dsdactors,actord1:wd.sdactors,tpercentage:wd.tpercentage,asum:wd.asummary,
                                                      dpdata:wd.dsddp,dpdata1:wd.sddp,dpt:wd.dptpercentage,dsum:wd.dpsummary});
                                       user.local.notfinish=false
                                        user.save()
                                       childjs.kill();
            })


                         



}

else{

  
   //console.log(user.local.email +" is hacking and no data sent")

}


})

});



///////////////////////////adv_post route
app.post('/adv_filters', isLoggedIn,function(req, res) {
User.findOne({'local.email':req.user.local.email},function (err, user) {
  if (err) return handleError(err);
  

if(user.local.current_usage>user.local.usage_limit){

  
   console.log(user.local.email +" expired no data sent")

}

//  var current_usr=usrs[req.connection.remoteAddress];
//  if(usr_current_tries[current_usr]>usr_total_tries[current_usr]){
    

//  }
if(user.local.notfinish==true){

  
   console.log(user.local.email +" is hacking and no data sent")

}


  else{
          user.local.notfinish=true
    user.save()

                                            
                                            
                                          filters=req.body;

//console.log(filters)


                                        filters['keywords']=filters.keywords.split(',')
                                        filters['actors']=filters.actors.split(',')
                                        filters['techrole']=filters.techrole.split(',')



                                         var fquery=[{}]
  var dquery=[{}]

  if(filters.keywords!=''){
  for (i in filters.keywords){
    fquery.push({"keywords":filters.keywords[i]})
  }}



////relativity
/*
fquery.push({$or:[{"title":"The Warrior's Way"},
  {"title":"Season of the Witch"},
  {"title":"Limitless"},
  {"title":"Take Me Home Tonight"},
  {"title":"Shark Night 3D"},
  {"title":"Immortals"},
  {"title":"Haywire"},
  {"title":"Act of Valor"},
  {"title":"Mirror Mirror"},
  {"title":"The Raven"},
  {"title":"House at the End of the Street"},
  {"title":"Movie 43"},
  {"title":"Safe Haven"},
  {"title":"21 & Over"},
  {"title":"Paranoia"},
  {"title":"The Family"},
  {"title":"Don Jon"},
  {"title":"Romeo and Juliet"},
  {"title":"Free Birds"},
  {"title":"Out of the Furnace"},
  {"title":"3 Days to Kill"},
  {"title":"Oculus"},
  {"title":"Brick Mansions"},
  {"title":"Earth to Echo"},
  {"title":"The Novemeber Man"},
  {"title":"The Best of Me"},
  {"title":"Beyond the Lights"},
  {"title":"Women in Black 2: Angel of Death"},
  {"title":"Black or White"},
  {"title":"The Lazarus Effect"},]})
*/
////relativity ends

 //fquery.push({"keywords":{$ne:"sequel"}})
 //fquery.push({"keywords":{$ne:"prequel"}})
 //fquery.push({"title":{$ne:"Seventh Son"}})
// fquery.push({"title":{$ne:"John Carter"}})
//  fquery.push({"title":{$ne:"The Lord of the Rings: The Fellowship of the Ring"}})
 //  fquery.push({"title":{$ne:"Harry Potter and the Sorcerer's Stone"}})
//  fquery.push({$and:[{$or:[
   // {Action:true},{Adventure:true},
//    {Fantasy:true},{SciFi:true}]}]})

  var kwor1=[]
  var kwor2=[]
  var kwor3=[]
//console.log(filters)

  filters['keywordsor1']=filters.keywordsor1.split(',')
  filters['keywordsor2']=filters.keywordsor2.split(',')  
  filters['keywordsor3']=filters.keywordsor3.split(',') 

  if(typeof filters.keywordsor1!="undefined"){

    for (i in filters.keywordsor1){
    kwor1.push({"keywords":filters.keywordsor1[i]})
  }


  }

    if(typeof filters.keywordsor2!="undefined"){

    for (i in filters.keywordsor2){
    kwor2.push({"keywords":filters.keywordsor2[i]})
  }


  }

   if(typeof filters.keywordsor3!="undefined"){

    for (i in filters.keywordsor3){
    kwor3.push({"keywords":filters.keywordsor3[i]})
  }


  }

  var andor=[{}]

  if((typeof filters.keywordsor1!="undefined")){
    andor.push({$or:kwor1})

  }

    if((typeof filters.keywordsor2!="undefined")){
    andor.push({$or:kwor2})

  }

      if((typeof filters.keywordsor3!="undefined")){
    andor.push({$or:kwor3})

  }



  fquery.push({$and:andor})



  if(filters.actors!=''){
  for (i in filters.actors){
    fquery.push({"actors":filters.actors[i]})
  }}

  if(filters.techrole!=''){
  for (i in filters.techrole){
    fquery.push({"techrole":filters.techrole[i]})
  }}





                                        if(filters.Comedy=="yes"){
                                        fquery.push({"Comedy":true})}
                                        if(filters.Comedy=="no"){
                                          fquery.push({"Comedy":false})}
                                        if(filters.Comedy=="bs"){fquery.push({"Comedy":'bs'})}


                                       if(filters.Family=="yes"){
                                        fquery.push({"Family":true})}
                                        if(filters.Family=="no"){
                                          fquery.push({"Family":false})}
                                        if(filters.Family=="bs"){fquery.push({"Family":'bs'})}
                                        
                                        if(filters.Action=="yes"){
                                        fquery.push({"Action":true})}
                                        if(filters.Action=="no"){
                                          fquery.push({"Action":false})}
                                        if(filters.Action=="bs"){fquery.push({"Action":'bs'})}

                                        
                                        if(filters.Adventure=="yes"){
                                        fquery.push({"Adventure":true})}
                                        if(filters.Adventure=="no"){
                                          fquery.push({"Adventure":false})}
                                        if(filters.Adventure=="bs"){fquery.push({"Adventure":'bs'})}

                                        
                                        if(filters.Drama=="yes"){
                                        fquery.push({"Drama":true})}
                                        if(filters.Drama=="no"){
                                          fquery.push({"Drama":false})}
                                        if(filters.Drama=="bs"){fquery.push({"Drama":'bs'})}

                                        
                                        if(filters.Historical=="yes"){
                                        fquery.push({"Historical":true})}
                                        if(filters.Historical=="no"){
                                          fquery.push({"Historical":false})}
                                        if(filters.Historical=="bs"){fquery.push({"Historical":'bs'})}
                                        

                                        if(filters.Fantasy=="yes"){
                                        fquery.push({"Fantasy":true})}
                                        if(filters.Fantasy=="no"){
                                          fquery.push({"Fantasy":false})}
                                        if(filters.Fantasy=="bs"){fquery.push({"Fantasy":'bs'})}
                                        

                                        if(filters.Crime=="yes"){
                                        fquery.push({"Crime":true})}
                                        if(filters.Crime=="no"){
                                          fquery.push({"Crime":false})}
                                        if(filters.Crime=="bs"){fquery.push({"Crime":'bs'})}
                                        

                                        if(filters.Horror=="yes"){
                                        fquery.push({"Horror":true})}
                                        if(filters.Horror=="no"){
                                          fquery.push({"Horror":false})}
                                        if(filters.Horror=="bs"){fquery.push({"Horror":'bs'})}
                                        

                                        if(filters.Romance=="yes"){
                                        fquery.push({"Romance":true})}
                                        if(filters.Romance=="no"){
                                          fquery.push({"Romance":false})}
                                        if(filters.Romance=="bs"){fquery.push({"Romance":'bs'})}
                                        

                                        if(filters.Thriller=="yes"){
                                        fquery.push({"Thriller":true})}
                                        if(filters.Thriller=="no"){
                                          fquery.push({"Thriller":false})}
                                        if(filters.Thriller=="bs"){fquery.push({"Thriller":'bs'})}
                                        

                                        if(filters.SciFi=="yes"){
                                        fquery.push({"SciFi":true})}
                                        if(filters.SciFi=="no"){
                                          fquery.push({"SciFi":false})}
                                        if(filters.SciFi=="bs"){fquery.push({"SciFi":'bs'})}
                                        

                                        if(filters.Mystery=="yes"){
                                        fquery.push({"Mystery":true})}
                                        if(filters.Mystery=="no"){
                                          fquery.push({"Mystery":false})}
                                        if(filters.Mystery=="bs"){fquery.push({"Mystery":'bs'})}
                                        

                                        if(filters.War=="yes"){
                                        fquery.push({"War":true})}
                                        if(filters.War=="no"){
                                          fquery.push({"War":false})}
                                        if(filters.War=="bs"){fquery.push({"War":'bs'})}
                                        

                                        if(filters.Biography=="yes"){
                                        fquery.push({"Biography":true})}
                                        if(filters.Biography=="no"){
                                          fquery.push({"Biography":false})}
                                        if(filters.Biography=="bs"){fquery.push({"Biography":'bs'})}
                                        

                                        if(filters.Documentary=="yes"){
                                        fquery.push({"Documentary":true})}
                                        if(filters.Documentary=="no"){
                                          fquery.push({"Documentary":false})}
                                        if(filters.Documentary=="bs"){fquery.push({"Documentary":'bs'})}
                                        

                                        if(filters.Music=="yes"){
                                        fquery.push({"Music":true})}
                                        if(filters.Music=="no"){
                                          fquery.push({"Music":false})}
                                        if(filters.Music=="bs"){fquery.push({"Music":'bs'})}
                                        

                                        if(filters.Musical=="yes"){
                                        fquery.push({"Musical":true})}
                                        if(filters.Musical=="no"){
                                          fquery.push({"Musical":false})}
                                        if(filters.Musical=="bs"){fquery.push({"Musical":'bs'})}

                                          if(filters.Animation=="yes"){
                                        fquery.push({"Animation":true})}
                                        if(filters.Animation=="no"){
                                          fquery.push({"Animation":false})}
                                        if(filters.Animation=="bs"){fquery.push({"Animation":'bs'})}


                                          if(filters.Western=="yes"){
                                        fquery.push({"Western":true})}
                                        if(filters.Western=="no"){
                                          fquery.push({"Western":false})}
                                        if(filters.Western=="bs"){fquery.push({"Western":'bs'})}


                                          if(filters.Sport=="yes"){
                                        fquery.push({"Sport":true})}
                                        if(filters.Sport=="no"){
                                          fquery.push({"Sport":false})}
                                        if(filters.Sport=="bs"){fquery.push({"Sport":'bs'})}

fquery.push({x:{$gte:Number(filters.lx),$lte:Number(filters.lxu)}})
fquery.push({year:{$gte:Number(filters.ly),$lte:Number(filters.lyu)}})

console.log("filters here !!!!!!!!!!!!!")
console.log(filters)


  if (filters.women_ratio_h==100 &
         filters.women_ratio_l==0 &
         filters.men_ratio_h==100 &
         filters.men_ratio_l==0 &
         filters.women_18_24_ratio_h==100 &
         filters.women_18_24_ratio_l==0 &
         filters.women_25_34_ratio_h==100 &
         filters.women_25_34_ratio_l==0 &
         filters.women_34_44_ratio_h==100 &
         filters.women_34_44_ratio_l==0 &
         filters.women_44_54_ratio_h==100 &
         filters.women_44_54_ratio_l==0 &
         filters.women_55_64_ratio_h==100 &
         filters.women_55_64_ratio_l==0 &
         filters.women_65_ratio_h==100 &
         filters.women_65_ratio_l==0 &
         filters.men_18_24_ratio_h==100 &
         filters.men_18_24_ratio_l==0 &
         filters.men_25_34_ratio_h==100 &
         filters.men_25_34_ratio_l==0 &
         filters.men_34_44_ratio_h==100 &
         filters.men_34_44_ratio_l==0 &
         filters.men_44_54_ratio_h==100 &
         filters.men_44_54_ratio_l==0 &
         filters.men_55_64_ratio_h==100 &
         filters.men_55_64_ratio_l==0 &
         filters.men_65_ratio_h==100 &
         filters.men_65_ratio_l==0
         ){
          console.log("")
        }

else {
fquery.push({women_ratio:{$gte:Number(filters.women_ratio_l),$lte:Number(filters.women_ratio_h)}})


fquery.push({men_ratio:{$gte:Number(filters.men_ratio_l),$lte:Number(filters.men_ratio_h)}})


fquery.push({men_18_24_ratio:{$gte:Number(filters.men_18_24_ratio_l),$lte:Number(filters.men_18_24_ratio_h)}})


fquery.push({men_25_34_ratio:{$gte:Number(filters.men_25_34_ratio_l),$lte:Number(filters.men_25_34_ratio_h)}})
fquery.push({men_34_44_ratio:{$gte:Number(filters.men_34_44_ratio_l),$lte:Number(filters.men_34_44_ratio_h)}})
fquery.push({men_44_54_ratio:{$gte:Number(filters.men_44_54_ratio_l),$lte:Number(filters.men_44_54_ratio_h)}})
fquery.push({men_55_64_ratio:{$gte:Number(filters.men_55_64_ratio_l),$lte:Number(filters.men_55_64_ratio_h)}})
fquery.push({men_65_ratio:{$gte:Number(filters.men_65_ratio_l),$lte:Number(filters.men_65_ratio_h)}})



fquery.push({women_18_24_ratio:{$gte:Number(filters.women_18_24_ratio_l),$lte:Number(filters.women_18_24_ratio_h)}})
fquery.push({women_25_34_ratio:{$gte:Number(filters.women_25_34_ratio_l),$lte:Number(filters.women_25_34_ratio_h)}})
fquery.push({women_34_44_ratio:{$gte:Number(filters.women_34_44_ratio_l),$lte:Number(filters.women_34_44_ratio_h)}})
fquery.push({women_44_54_ratio:{$gte:Number(filters.women_44_54_ratio_l),$lte:Number(filters.women_44_54_ratio_h)}})
fquery.push({women_55_64_ratio:{$gte:Number(filters.women_55_64_ratio_l),$lte:Number(filters.women_55_64_ratio_h)}})
fquery.push({women_65_ratio:{$gte:Number(filters.women_65_ratio_l),$lte:Number(filters.women_65_ratio_h)}})


}

//"Cambridge, Ontario, Canada"
lc=filters.location

if (lc != ""){

loc=JSON.parse(lc)

for (i in loc) {
  l_key='location.'+loc[i]

  var nn={}

  nn[l_key]={$gte:Number(filters.loc_num_min),$lte:Number(filters.loc_num_max)}

  //console.log(nn)

fquery.push(nn)

}
}

//console.log(fquery)

/////////location based filtering



/////////


for (i in fquery){
          dquery.push(fquery[i])
        }

        dquery.push({op:{$gte:Number(filters.op),$lte:Number(filters.opu)}})



            var childjs=child.fork(__dirname+'/adv_dmoviechild.js');
            childjs.send({fquery:fquery,dquery:dquery,filters:filters});
            childjs.on('message',function(wd){


              
                          res.json({ success: wd.ddd, data1: wd.ddd1,
                                                      kword:wd.dsdkw,kword1:wd.sdkw,ktpercentage:wd.ktpercentage,summ:wd.sum,
                                                      actord:wd.dsdactors,actord1:wd.sdactors,tpercentage:wd.tpercentage,asum:wd.asummary,
                                                      dpdata:wd.dsddp,dpdata1:wd.sddp,dpt:wd.dptpercentage,dsum:wd.dpsummary});
                                       user.local.notfinish=false
                                        user.save()
                                       childjs.kill();
            })


                         



}

})

});


//////////////////////////adv_post route

/*
app.post('/filters', isLoggedIn,function(req, res) {
User.findOne({'local.email':req.user.local.email},function (err, user) {
  if (err) return handleError(err);
  

if(user.local.current_usage>user.local.usage_limit){

  
   console.log(user.local.email +" expired no data sent")

}

//  var current_usr=usrs[req.connection.remoteAddress];
//  if(usr_current_tries[current_usr]>usr_total_tries[current_usr]){
    

//  }
if(user.local.notfinish==true){

  
   console.log(user.local.email +" is hacking and no data sent")

}


  else{
          user.local.notfinish=true
    user.save()

                                            
                                            
                                          filters=req.body;

//console.log(filters)


                                        filters['keywords']=filters.keywords.split(',')
                                        filters['actors']=filters.actors.split(',')
                                        filters['techrole']=filters.techrole.split(',')



                                         var fquery=[{}]
  var dquery=[{}]

  if(filters.keywords!=''){
  for (i in filters.keywords){
    fquery.push({"keywords":filters.keywords[i]})
  }}



//fquery push here demographics filter


 //fquery.push({"keywords":{$ne:"sequel"}})
 //fquery.push({"keywords":{$ne:"prequel"}})
 //fquery.push({"title":{$ne:"Seventh Son"}})
// fquery.push({"title":{$ne:"John Carter"}})
//  fquery.push({"title":{$ne:"The Lord of the Rings: The Fellowship of the Ring"}})
 //  fquery.push({"title":{$ne:"Harry Potter and the Sorcerer's Stone"}})
//  fquery.push({$and:[{$or:[
   // {Action:true},{Adventure:true},
//    {Fantasy:true},{SciFi:true}]}]})

  var kwor1=[]
  var kwor2=[]
  var kwor3=[]
//console.log(filters)

  filters['keywordsor1']=filters.keywordsor1.split(',')
  filters['keywordsor2']=filters.keywordsor2.split(',')  
  filters['keywordsor3']=filters.keywordsor3.split(',') 

  if(typeof filters.keywordsor1!="undefined"){

    for (i in filters.keywordsor1){
    kwor1.push({"keywords":filters.keywordsor1[i]})
  }


  }

    if(typeof filters.keywordsor2!="undefined"){

    for (i in filters.keywordsor2){
    kwor2.push({"keywords":filters.keywordsor2[i]})
  }


  }

   if(typeof filters.keywordsor3!="undefined"){

    for (i in filters.keywordsor3){
    kwor3.push({"keywords":filters.keywordsor3[i]})
  }


  }

  var andor=[{}]

  if((typeof filters.keywordsor1!="undefined")){
    andor.push({$or:kwor1})

  }

    if((typeof filters.keywordsor2!="undefined")){
    andor.push({$or:kwor2})

  }

      if((typeof filters.keywordsor3!="undefined")){
    andor.push({$or:kwor3})

  }



  fquery.push({$and:andor})



  if(filters.actors!=''){
  for (i in filters.actors){
    fquery.push({"actors":filters.actors[i]})
  }}

  if(filters.techrole!=''){
  for (i in filters.techrole){
    fquery.push({"techrole":filters.techrole[i]})
  }}





                                        if(filters.Comedy=="yes"){
                                        fquery.push({"Comedy":true})}
                                        if(filters.Comedy=="no"){
                                          fquery.push({"Comedy":false})}
                                        if(filters.Comedy=="bs"){fquery.push({"Comedy":'bs'})}


                                       if(filters.Family=="yes"){
                                        fquery.push({"Family":true})}
                                        if(filters.Family=="no"){
                                          fquery.push({"Family":false})}
                                        if(filters.Family=="bs"){fquery.push({"Family":'bs'})}
                                        
                                        if(filters.Action=="yes"){
                                        fquery.push({"Action":true})}
                                        if(filters.Action=="no"){
                                          fquery.push({"Action":false})}
                                        if(filters.Action=="bs"){fquery.push({"Action":'bs'})}

                                        
                                        if(filters.Adventure=="yes"){
                                        fquery.push({"Adventure":true})}
                                        if(filters.Adventure=="no"){
                                          fquery.push({"Adventure":false})}
                                        if(filters.Adventure=="bs"){fquery.push({"Adventure":'bs'})}

                                        
                                        if(filters.Drama=="yes"){
                                        fquery.push({"Drama":true})}
                                        if(filters.Drama=="no"){
                                          fquery.push({"Drama":false})}
                                        if(filters.Drama=="bs"){fquery.push({"Drama":'bs'})}

                                        
                                        if(filters.Historical=="yes"){
                                        fquery.push({"Historical":true})}
                                        if(filters.Historical=="no"){
                                          fquery.push({"Historical":false})}
                                        if(filters.Historical=="bs"){fquery.push({"Historical":'bs'})}
                                        

                                        if(filters.Fantasy=="yes"){
                                        fquery.push({"Fantasy":true})}
                                        if(filters.Fantasy=="no"){
                                          fquery.push({"Fantasy":false})}
                                        if(filters.Fantasy=="bs"){fquery.push({"Fantasy":'bs'})}
                                        

                                        if(filters.Crime=="yes"){
                                        fquery.push({"Crime":true})}
                                        if(filters.Crime=="no"){
                                          fquery.push({"Crime":false})}
                                        if(filters.Crime=="bs"){fquery.push({"Crime":'bs'})}
                                        

                                        if(filters.Horror=="yes"){
                                        fquery.push({"Horror":true})}
                                        if(filters.Horror=="no"){
                                          fquery.push({"Horror":false})}
                                        if(filters.Horror=="bs"){fquery.push({"Horror":'bs'})}
                                        

                                        if(filters.Romance=="yes"){
                                        fquery.push({"Romance":true})}
                                        if(filters.Romance=="no"){
                                          fquery.push({"Romance":false})}
                                        if(filters.Romance=="bs"){fquery.push({"Romance":'bs'})}
                                        

                                        if(filters.Thriller=="yes"){
                                        fquery.push({"Thriller":true})}
                                        if(filters.Thriller=="no"){
                                          fquery.push({"Thriller":false})}
                                        if(filters.Thriller=="bs"){fquery.push({"Thriller":'bs'})}
                                        

                                        if(filters.SciFi=="yes"){
                                        fquery.push({"SciFi":true})}
                                        if(filters.SciFi=="no"){
                                          fquery.push({"SciFi":false})}
                                        if(filters.SciFi=="bs"){fquery.push({"SciFi":'bs'})}
                                        

                                        if(filters.Mystery=="yes"){
                                        fquery.push({"Mystery":true})}
                                        if(filters.Mystery=="no"){
                                          fquery.push({"Mystery":false})}
                                        if(filters.Mystery=="bs"){fquery.push({"Mystery":'bs'})}
                                        

                                        if(filters.War=="yes"){
                                        fquery.push({"War":true})}
                                        if(filters.War=="no"){
                                          fquery.push({"War":false})}
                                        if(filters.War=="bs"){fquery.push({"War":'bs'})}
                                        

                                        if(filters.Biography=="yes"){
                                        fquery.push({"Biography":true})}
                                        if(filters.Biography=="no"){
                                          fquery.push({"Biography":false})}
                                        if(filters.Biography=="bs"){fquery.push({"Biography":'bs'})}
                                        

                                        if(filters.Documentary=="yes"){
                                        fquery.push({"Documentary":true})}
                                        if(filters.Documentary=="no"){
                                          fquery.push({"Documentary":false})}
                                        if(filters.Documentary=="bs"){fquery.push({"Documentary":'bs'})}
                                        

                                        if(filters.Music=="yes"){
                                        fquery.push({"Music":true})}
                                        if(filters.Music=="no"){
                                          fquery.push({"Music":false})}
                                        if(filters.Music=="bs"){fquery.push({"Music":'bs'})}
                                        

                                        if(filters.Musical=="yes"){
                                        fquery.push({"Musical":true})}
                                        if(filters.Musical=="no"){
                                          fquery.push({"Musical":false})}
                                        if(filters.Musical=="bs"){fquery.push({"Musical":'bs'})}

                                          if(filters.Animation=="yes"){
                                        fquery.push({"Animation":true})}
                                        if(filters.Animation=="no"){
                                          fquery.push({"Animation":false})}
                                        if(filters.Animation=="bs"){fquery.push({"Animation":'bs'})}


                                          if(filters.Western=="yes"){
                                        fquery.push({"Western":true})}
                                        if(filters.Western=="no"){
                                          fquery.push({"Western":false})}
                                        if(filters.Western=="bs"){fquery.push({"Western":'bs'})}


                                          if(filters.Sport=="yes"){
                                        fquery.push({"Sport":true})}
                                        if(filters.Sport=="no"){
                                          fquery.push({"Sport":false})}
                                        if(filters.Sport=="bs"){fquery.push({"Sport":'bs'})}

fquery.push({x:{$gte:Number(filters.lx),$lte:Number(filters.lxu)}})
fquery.push({year:{$gte:Number(filters.ly),$lte:Number(filters.lyu)}})













for (i in fquery){
          dquery.push(fquery[i])
        }

        dquery.push({op:{$gte:Number(filters.op),$lte:Number(filters.opu)}})



            var childjs=child.fork(__dirname+'/dmoviechild.js');
            childjs.send({fquery:fquery,dquery:dquery,filters:filters});
            childjs.on('message',function(wd){


              
                          res.json({ success: wd.ddd, data1: wd.ddd1,
                                                      kword:wd.dsdkw,kword1:wd.sdkw,ktpercentage:wd.ktpercentage,summ:wd.sum,
                                                      actord:wd.dsdactors,actord1:wd.sdactors,tpercentage:wd.tpercentage,asum:wd.asummary,
                                                      dpdata:wd.dsddp,dpdata1:wd.sddp,dpt:wd.dptpercentage,dsum:wd.dpsummary});
                                       user.local.notfinish=false
                                        user.save()
                                       childjs.kill();
            })


                         



}

})

});


*/
///////////////////////////adv_post route
app.post('/ch_filters', isLoggedIn,function(req, res) {




fquery=req.body




            var childjs=child.fork(__dirname+'/ch_child.js');
            childjs.send({fquery:fquery});
            childjs.on('message',function(wd){


              
                          res.json({ success: wd.res_data});
     
                                
                                       childjs.kill();
            })


                         



})










app.post('/china_filter', isLoggedIn,function(req, res) {
User.findOne({'local.email':req.user.local.email},function (err, user) {
  if (err) return handleError(err);
  

if(user.local.current_usage>user.local.usage_limit){

  
   console.log(user.local.email +" expired no data sent")

}

//  var current_usr=usrs[req.connection.remoteAddress];
//  if(usr_current_tries[current_usr]>usr_total_tries[current_usr]){
    

//  }
if(user.local.notfinish==true){

  
   console.log(user.local.email +" is hacking and no data sent")

}


   if(user.local.china=="yes"){
          user.local.notfinish=true
    user.save()

                                            
                                            
                                          filters=req.body;

//console.log(filters)


                                        filters['keywords']=filters.keywords.split(',')
                                        filters['actors']=filters.actors.split(',')
                                        filters['techrole']=filters.techrole.split(',')



                                         var fquery=[{}]
  var dquery=[{}]

  if(filters.keywords!=''){
  for (i in filters.keywords){
    fquery.push({"keywords":filters.keywords[i]})
  }}



//fquery push here demographics filter


 //fquery.push({"keywords":{$ne:"sequel"}})
 //fquery.push({"keywords":{$ne:"prequel"}})
 //fquery.push({"title":{$ne:"Seventh Son"}})
// fquery.push({"title":{$ne:"John Carter"}})
//  fquery.push({"title":{$ne:"The Lord of the Rings: The Fellowship of the Ring"}})
 //  fquery.push({"title":{$ne:"Harry Potter and the Sorcerer's Stone"}})
//  fquery.push({$and:[{$or:[
   // {Action:true},{Adventure:true},
//    {Fantasy:true},{SciFi:true}]}]})

  var kwor1=[]
  var kwor2=[]
  var kwor3=[]
//console.log(filters)

  filters['keywordsor1']=filters.keywordsor1.split(',')
  filters['keywordsor2']=filters.keywordsor2.split(',')  
  filters['keywordsor3']=filters.keywordsor3.split(',') 

  if(typeof filters.keywordsor1!="undefined"){

    for (i in filters.keywordsor1){
    kwor1.push({"keywords":filters.keywordsor1[i]})
  }


  }

    if(typeof filters.keywordsor2!="undefined"){

    for (i in filters.keywordsor2){
    kwor2.push({"keywords":filters.keywordsor2[i]})
  }


  }

   if(typeof filters.keywordsor3!="undefined"){

    for (i in filters.keywordsor3){
    kwor3.push({"keywords":filters.keywordsor3[i]})
  }


  }

  var andor=[{}]

  if((typeof filters.keywordsor1!="undefined")){
    andor.push({$or:kwor1})

  }

    if((typeof filters.keywordsor2!="undefined")){
    andor.push({$or:kwor2})

  }

      if((typeof filters.keywordsor3!="undefined")){
    andor.push({$or:kwor3})

  }



  fquery.push({$and:andor})



  if(filters.actors!=''){
  for (i in filters.actors){
    fquery.push({"actors":filters.actors[i]})
  }}

  if(filters.techrole!=''){
  for (i in filters.techrole){
    fquery.push({"techrole":filters.techrole[i]})
  }}




//fquery.push({op:{$gte:Number(filters.op),$lte:Number(filters.opu)}})













for (i in fquery){
          dquery.push(fquery[i])
        }

        dquery.push({op:{$gte:Number(filters.op),$lte:Number(filters.opu)}})



            var childjs=child.fork(__dirname+'/china_dmovie_child.js');
            childjs.send({fquery:fquery,dquery:dquery,filters:filters});
            childjs.on('message',function(wd){


              
                          res.json({ success: wd.ddd, data1: wd.ddd1,
                                                      kword:wd.dsdkw,kword1:wd.sdkw,ktpercentage:wd.ktpercentage,summ:wd.sum,
                                                      actord:wd.dsdactors,actord1:wd.sdactors,tpercentage:wd.tpercentage,asum:wd.asummary,
                                                      dpdata:wd.dsddp,dpdata1:wd.sddp,dpt:wd.dptpercentage,dsum:wd.dpsummary});
                                       user.local.notfinish=false
                                        user.save()
                                       childjs.kill();
            })


                         



}

else {}

})

});


app.get('/china_at', isLoggedIn, function(req, res,next) {

  User.findOne({'local.email':req.user.local.email},function (err, user) {
  if (err) return handleError(err);


  if (user.local.china=="yes"){
    

        console.log(req.user.local.email+" logged in from "+ String(req.connection.remoteAddress))

    //res.sendFile('/Users/jackzhang/Documents/d3stuff/international insights/public'),
    res.sendFile(cd+'/public/China.html'
    

      //{

    //  user : req.user // get the user out of session and pass to template
    //}
    );}

    else{
      res.sendFile(cd+"/public/noaccess.html")
    }})
  });


///////////ch_filters
///////////////international addon

app.get('/interterminal', isLoggedIn, function(req, res,next) {
		

        console.log(req.user.local.email+" logged in from "+ String(req.connection.remoteAddress))

		//res.sendFile('/Users/jackzhang/Documents/d3stuff/international insights/public'),
		res.sendFile(cd+'/public/interamark.html'
		

			//{

		//	user : req.user // get the user out of session and pass to template
		//}
		);
	});



app.post('/interlgd',isLoggedIn, function(req, res,done) {


	//console.log(req.user.local.email)
	User.findOne({'local.email':req.user.local.email},function (err, user) {
  if (err) return handleError(err);
  

if(user.local.current_usage>=user.local.usage_limit){

	res.json({ ld: {x:"expired"} })
   console.log(user.local.email +" expired")

}


if(user.local.notfinish==true){

  res.json({ ld: {x:"notfinish"} })
   console.log(user.local.email +" not finished and is probably hacking")

}

 // var current_usr=usrs[req.connection.remoteAddress];
 // if((usr_total_tries[current_usr]-usr_current_tries[current_usr])<=0){
     
 //   res.json({ ld: {x:"expired"} })
 //   console.log(current_usr +" expired")

//  }
 // else{

  else{  
    console.log(user.local.email+" tries left: "+
      String(user.local.usage_limit-user.local.current_usage))
  console.log("requested data2(fy)")


  user.local.current_usage=user.local.current_usage+1
  user.save(function (err) {
   if (err) return handleError(err);
    return done(null, user);
  });
 // usr_current_tries[current_usr]++
  res.json({ ld: interl_data });}
//}
})
})






	var filters;
	var Worker = require('webworker-threads').Worker;






////post request and response
app.post('/interfilters', isLoggedIn,function(req, res) {
User.findOne({'local.email':req.user.local.email},function (err, user) {
  if (err) return handleError(err);
  

if(user.local.current_usage>user.local.usage_limit){

	
   console.log(user.local.email +" expired no data sent")

}

if(user.local.notfinish==true){

  
   console.log(user.local.email +" is hacking and no data sent")

}



else {
      user.local.notfinish=true
    user.save()

                                            
                                            
                                           filters=req.body;

//console.log(filters)


                                        filters['keywords']=filters.keywords.split(',')
                                        filters['actors']=filters.actors.split(',')
                                        filters['techrole']=filters.techrole.split(',')



                                         var fquery=[{}]
  var dquery=[{}]

  if(filters.keywords!=''){
  for (i in filters.keywords){
    fquery.push({"keywords":filters.keywords[i]})
  }}

 //  fquery.push({"keywords":{$ne:"sequel"}})
 //    fquery.push({$and:[{$or:[{Fantasy:true},{SciFi:true}]}]})

  var kwor1=[]
  var kwor2=[]
//console.log(filters)

  filters['keywordsor1']=filters.keywordsor1.split(',')
  filters['keywordsor2']=filters.keywordsor2.split(',')  

//console.log(filters)
  if(typeof filters.keywordsor1!="undefined"){

    for (i in filters.keywordsor1){
    kwor1.push({"keywords":filters.keywordsor1[i]})
  }


  }

    if(typeof filters.keywordsor2!="undefined"){

    for (i in filters.keywordsor2){
    kwor2.push({"keywords":filters.keywordsor2[i]})
  }


  }

  var andor=[{}]

  if((typeof filters.keywordsor1!="undefined")){
    andor.push({$or:kwor1})

  }

    if((typeof filters.keywordsor2!="undefined")){
    andor.push({$or:kwor2})

  }

  fquery.push({$and:andor})



  if(filters.actors!=''){
  for (i in filters.actors){
    fquery.push({"actors":filters.actors[i]})
  }}

  if(filters.techrole!=''){
  for (i in filters.techrole){
    fquery.push({"techrole":filters.techrole[i]})
  }}





                                        if(filters.Comedy=="yes"){
                                        fquery.push({"Comedy":true})}
                                        if(filters.Comedy=="no"){
                                          fquery.push({"Comedy":false})}
                                        if(filters.Comedy=="bs"){fquery.push({"Comedy":'bs'})}


                                       if(filters.Family=="yes"){
                                        fquery.push({"Family":true})}
                                        if(filters.Family=="no"){
                                          fquery.push({"Family":false})}
                                        if(filters.Family=="bs"){fquery.push({"Family":'bs'})}
                                        
                                        if(filters.Action=="yes"){
                                        fquery.push({"Action":true})}
                                        if(filters.Action=="no"){
                                          fquery.push({"Action":false})}
                                        if(filters.Action=="bs"){fquery.push({"Action":'bs'})}

                                        
                                        if(filters.Adventure=="yes"){
                                        fquery.push({"Adventure":true})}
                                        if(filters.Adventure=="no"){
                                          fquery.push({"Adventure":false})}
                                        if(filters.Adventure=="bs"){fquery.push({"Adventure":'bs'})}

                                        
                                        if(filters.Drama=="yes"){
                                        fquery.push({"Drama":true})}
                                        if(filters.Drama=="no"){
                                          fquery.push({"Drama":false})}
                                        if(filters.Drama=="bs"){fquery.push({"Drama":'bs'})}

                                        
                                        if(filters.Historical=="yes"){
                                        fquery.push({"Historical":true})}
                                        if(filters.Historical=="no"){
                                          fquery.push({"Historical":false})}
                                        if(filters.Historical=="bs"){fquery.push({"Historical":'bs'})}
                                        

                                        if(filters.Fantasy=="yes"){
                                        fquery.push({"Fantasy":true})}
                                        if(filters.Fantasy=="no"){
                                          fquery.push({"Fantasy":false})}
                                        if(filters.Fantasy=="bs"){fquery.push({"Fantasy":'bs'})}
                                        

                                        if(filters.Crime=="yes"){
                                        fquery.push({"Crime":true})}
                                        if(filters.Crime=="no"){
                                          fquery.push({"Crime":false})}
                                        if(filters.Crime=="bs"){fquery.push({"Crime":'bs'})}
                                        

                                        if(filters.Horror=="yes"){
                                        fquery.push({"Horror":true})}
                                        if(filters.Horror=="no"){
                                          fquery.push({"Horror":false})}
                                        if(filters.Horror=="bs"){fquery.push({"Horror":'bs'})}
                                        

                                        if(filters.Romance=="yes"){
                                        fquery.push({"Romance":true})}
                                        if(filters.Romance=="no"){
                                          fquery.push({"Romance":false})}
                                        if(filters.Romance=="bs"){fquery.push({"Romance":'bs'})}
                                        

                                        if(filters.Thriller=="yes"){
                                        fquery.push({"Thriller":true})}
                                        if(filters.Thriller=="no"){
                                          fquery.push({"Thriller":false})}
                                        if(filters.Thriller=="bs"){fquery.push({"Thriller":'bs'})}
                                        

                                        if(filters.SciFi=="yes"){
                                        fquery.push({"SciFi":true})}
                                        if(filters.SciFi=="no"){
                                          fquery.push({"SciFi":false})}
                                        if(filters.SciFi=="bs"){fquery.push({"SciFi":'bs'})}
                                        

                                        if(filters.Mystery=="yes"){
                                        fquery.push({"Mystery":true})}
                                        if(filters.Mystery=="no"){
                                          fquery.push({"Mystery":false})}
                                        if(filters.Mystery=="bs"){fquery.push({"Mystery":'bs'})}
                                        

                                        if(filters.War=="yes"){
                                        fquery.push({"War":true})}
                                        if(filters.War=="no"){
                                          fquery.push({"War":false})}
                                        if(filters.War=="bs"){fquery.push({"War":'bs'})}
                                        

                                        if(filters.Biography=="yes"){
                                        fquery.push({"Biography":true})}
                                        if(filters.Biography=="no"){
                                          fquery.push({"Biography":false})}
                                        if(filters.Biography=="bs"){fquery.push({"Biography":'bs'})}
                                        

                                        if(filters.Documentary=="yes"){
                                        fquery.push({"Documentary":true})}
                                        if(filters.Documentary=="no"){
                                          fquery.push({"Documentary":false})}
                                        if(filters.Documentary=="bs"){fquery.push({"Documentary":'bs'})}
                                        

                                        if(filters.Music=="yes"){
                                        fquery.push({"Music":true})}
                                        if(filters.Music=="no"){
                                          fquery.push({"Music":false})}
                                        if(filters.Music=="bs"){fquery.push({"Music":'bs'})}
                                        

                                        if(filters.Musical=="yes"){
                                        fquery.push({"Musical":true})}
                                        if(filters.Musical=="no"){
                                          fquery.push({"Musical":false})}
                                        if(filters.Musical=="bs"){fquery.push({"Musical":'bs'})}

                                          if(filters.Animation=="yes"){
                                        fquery.push({"Animation":true})}
                                        if(filters.Animation=="no"){
                                          fquery.push({"Animation":false})}
                                        if(filters.Animation=="bs"){fquery.push({"Animation":'bs'})}


                                          if(filters.Western=="yes"){
                                        fquery.push({"Western":true})}
                                        if(filters.Western=="no"){
                                          fquery.push({"Western":false})}
                                        if(filters.Western=="bs"){fquery.push({"Western":'bs'})}


                                          if(filters.Sport=="yes"){
                                        fquery.push({"Sport":true})}
                                        if(filters.Sport=="no"){
                                          fquery.push({"Sport":false})}
                                        if(filters.Sport=="bs"){fquery.push({"Sport":'bs'})}

fquery.push({x:{$gte:Number(filters.lx),$lte:Number(filters.lxu)}})
fquery.push({year:{$gte:Number(filters.ly),$lte:Number(filters.lyu)}})

for (i in fquery){
          dquery.push(fquery[i])
        }

        dquery.push({op:{$gte:Number(filters.op),$lte:Number(filters.opu)}})


            var childjs=child.fork(__dirname+'/imoviechild.js');
            childjs.send({fquery:fquery,dquery:dquery,filters:filters});
            childjs.on('message',function(wd){


              
                          res.json({ success: wd.ddd, data1: wd.ddd1,
                                                      kword:wd.dsdkw,kword1:wd.sdkw,ktpercentage:wd.ktpercentage,summ:wd.sum,
                                                      actord:wd.dsdactors,actord1:wd.sdactors,tpercentage:wd.tpercentage,asum:wd.asummary,
                                                      dpdata:wd.dsddp,dpdata1:wd.sddp,dpt:wd.dptpercentage,dsum:wd.dpsummary});
                                       user.local.notfinish=false
                                        user.save()
                                       childjs.kill();
            })




}

})

});
///////////////


//////////////qubec data begins
pathstr=__dirname.length-3

    cd=__dirname.substr(0,pathstr)

app.get('/qubterminal', isLoggedIn, function(req, res,next) {
		

        console.log(req.user.local.email+" logged in from "+ String(req.connection.remoteAddress))

		//res.sendFile('/Users/jackzhang/Documents/d3stuff/qubnational insights/public'),
		res.sendFile(cd+'/public/qubamark.html'
		

			//{

		//	user : req.user // get the user out of session and pass to template
		//}
		);
	});



app.post('/qublgd',isLoggedIn, function(req, res,done) {


	//console.log(req.user.local.email)
	User.findOne({'local.email':req.user.local.email},function (err, user) {
  if (err) return handleError(err);
  

if(user.local.current_usage>=user.local.usage_limit){

	res.json({ ld: {x:"expired"} })
   console.log(user.local.email +" expired")

}

if(user.local.notfinish==true){

  res.json({ ld: {x:"notfinish"} })
   console.log(user.local.email +" not finished and is probably hacking")

}

 // var current_usr=usrs[req.connection.remoteAddress];
 // if((usr_total_tries[current_usr]-usr_current_tries[current_usr])<=0){
     
 //   res.json({ ld: {x:"expired"} })
 //   console.log(current_usr +" expired")

//  }
 // else{

  else{  
    console.log(user.local.email+" tries left: "+
      String(user.local.usage_limit-user.local.current_usage))
  console.log("requested data2(fy)")


  user.local.current_usage=user.local.current_usage+1
  user.save(function (err) {
   if (err) return handleError(err);
    return done(null, user);
  });
 // usr_current_tries[current_usr]++
  res.json({ ld: qubl_data });}
//}
})
})






	var filters;
	var Worker = require('webworker-threads').Worker;






////post request and response
app.post('/qubfilters', isLoggedIn,function(req, res) {
User.findOne({'local.email':req.user.local.email},function (err, user) {
  if (err) return handleError(err);
  

if(user.local.current_usage>user.local.usage_limit){

	
   console.log(user.local.email +" expired no data sent")

}

//  var current_usr=usrs[req.connection.remoteAddress];
//  if(usr_current_tries[current_usr]>usr_total_tries[current_usr]){
    

//  }
if(user.local.notfinish==true){

  
   console.log(user.local.email +" is hacking and no data sent")

}



else {
      user.local.notfinish=true
    user.save()

                                            
                                            
                                                                                   filters=req.body;

//console.log(filters)


                                        filters['keywords']=filters.keywords.split(',')
                                        filters['actors']=filters.actors.split(',')
                                        filters['techrole']=filters.techrole.split(',')



                                         var fquery=[{}]
  var dquery=[{}]

  if(filters.keywords!=''){
  for (i in filters.keywords){
    fquery.push({"keywords":filters.keywords[i]})
  }}

  var kwor1=[]
  var kwor2=[]
//console.log(filters)

  filters['keywordsor1']=filters.keywordsor1.split(',')
  filters['keywordsor2']=filters.keywordsor2.split(',')  

//console.log(filters)
  if(typeof filters.keywordsor1!="undefined"){

    for (i in filters.keywordsor1){
    kwor1.push({"keywords":filters.keywordsor1[i]})
  }


  }

    if(typeof filters.keywordsor2!="undefined"){

    for (i in filters.keywordsor2){
    kwor2.push({"keywords":filters.keywordsor2[i]})
  }


  }

  var andor=[{}]

  if((typeof filters.keywordsor1!="undefined")){
    andor.push({$or:kwor1})

  }

    if((typeof filters.keywordsor2!="undefined")){
    andor.push({$or:kwor2})

  }

  fquery.push({$and:andor})



  if(filters.actors!=''){
  for (i in filters.actors){
    fquery.push({"actors":filters.actors[i]})
  }}

  if(filters.techrole!=''){
  for (i in filters.techrole){
    fquery.push({"techrole":filters.techrole[i]})
  }}





                                        if(filters.Comedy=="yes"){
                                        fquery.push({"Comedy":true})}
                                        if(filters.Comedy=="no"){
                                          fquery.push({"Comedy":false})}
                                        if(filters.Comedy=="bs"){fquery.push({"Comedy":'bs'})}


                                       if(filters.Family=="yes"){
                                        fquery.push({"Family":true})}
                                        if(filters.Family=="no"){
                                          fquery.push({"Family":false})}
                                        if(filters.Family=="bs"){fquery.push({"Family":'bs'})}
                                        
                                        if(filters.Action=="yes"){
                                        fquery.push({"Action":true})}
                                        if(filters.Action=="no"){
                                          fquery.push({"Action":false})}
                                        if(filters.Action=="bs"){fquery.push({"Action":'bs'})}

                                        
                                        if(filters.Adventure=="yes"){
                                        fquery.push({"Adventure":true})}
                                        if(filters.Adventure=="no"){
                                          fquery.push({"Adventure":false})}
                                        if(filters.Adventure=="bs"){fquery.push({"Adventure":'bs'})}

                                        
                                        if(filters.Drama=="yes"){
                                        fquery.push({"Drama":true})}
                                        if(filters.Drama=="no"){
                                          fquery.push({"Drama":false})}
                                        if(filters.Drama=="bs"){fquery.push({"Drama":'bs'})}

                                        
                                        if(filters.Historical=="yes"){
                                        fquery.push({"Historical":true})}
                                        if(filters.Historical=="no"){
                                          fquery.push({"Historical":false})}
                                        if(filters.Historical=="bs"){fquery.push({"Historical":'bs'})}
                                        

                                        if(filters.Fantasy=="yes"){
                                        fquery.push({"Fantasy":true})}
                                        if(filters.Fantasy=="no"){
                                          fquery.push({"Fantasy":false})}
                                        if(filters.Fantasy=="bs"){fquery.push({"Fantasy":'bs'})}
                                        

                                        if(filters.Crime=="yes"){
                                        fquery.push({"Crime":true})}
                                        if(filters.Crime=="no"){
                                          fquery.push({"Crime":false})}
                                        if(filters.Crime=="bs"){fquery.push({"Crime":'bs'})}
                                        

                                        if(filters.Horror=="yes"){
                                        fquery.push({"Horror":true})}
                                        if(filters.Horror=="no"){
                                          fquery.push({"Horror":false})}
                                        if(filters.Horror=="bs"){fquery.push({"Horror":'bs'})}
                                        

                                        if(filters.Romance=="yes"){
                                        fquery.push({"Romance":true})}
                                        if(filters.Romance=="no"){
                                          fquery.push({"Romance":false})}
                                        if(filters.Romance=="bs"){fquery.push({"Romance":'bs'})}
                                        

                                        if(filters.Thriller=="yes"){
                                        fquery.push({"Thriller":true})}
                                        if(filters.Thriller=="no"){
                                          fquery.push({"Thriller":false})}
                                        if(filters.Thriller=="bs"){fquery.push({"Thriller":'bs'})}
                                        

                                        if(filters.SciFi=="yes"){
                                        fquery.push({"SciFi":true})}
                                        if(filters.SciFi=="no"){
                                          fquery.push({"SciFi":false})}
                                        if(filters.SciFi=="bs"){fquery.push({"SciFi":'bs'})}
                                        

                                        if(filters.Mystery=="yes"){
                                        fquery.push({"Mystery":true})}
                                        if(filters.Mystery=="no"){
                                          fquery.push({"Mystery":false})}
                                        if(filters.Mystery=="bs"){fquery.push({"Mystery":'bs'})}
                                        

                                        if(filters.War=="yes"){
                                        fquery.push({"War":true})}
                                        if(filters.War=="no"){
                                          fquery.push({"War":false})}
                                        if(filters.War=="bs"){fquery.push({"War":'bs'})}
                                        

                                        if(filters.Biography=="yes"){
                                        fquery.push({"Biography":true})}
                                        if(filters.Biography=="no"){
                                          fquery.push({"Biography":false})}
                                        if(filters.Biography=="bs"){fquery.push({"Biography":'bs'})}
                                        

                                        if(filters.Documentary=="yes"){
                                        fquery.push({"Documentary":true})}
                                        if(filters.Documentary=="no"){
                                          fquery.push({"Documentary":false})}
                                        if(filters.Documentary=="bs"){fquery.push({"Documentary":'bs'})}
                                        

                                        if(filters.Music=="yes"){
                                        fquery.push({"Music":true})}
                                        if(filters.Music=="no"){
                                          fquery.push({"Music":false})}
                                        if(filters.Music=="bs"){fquery.push({"Music":'bs'})}
                                        

                                        if(filters.Musical=="yes"){
                                        fquery.push({"Musical":true})}
                                        if(filters.Musical=="no"){
                                          fquery.push({"Musical":false})}
                                        if(filters.Musical=="bs"){fquery.push({"Musical":'bs'})}

                                          if(filters.Animation=="yes"){
                                        fquery.push({"Animation":true})}
                                        if(filters.Animation=="no"){
                                          fquery.push({"Animation":false})}
                                        if(filters.Animation=="bs"){fquery.push({"Animation":'bs'})}


                                          if(filters.Western=="yes"){
                                        fquery.push({"Western":true})}
                                        if(filters.Western=="no"){
                                          fquery.push({"Western":false})}
                                        if(filters.Western=="bs"){fquery.push({"Western":'bs'})}


                                          if(filters.Sport=="yes"){
                                        fquery.push({"Sport":true})}
                                        if(filters.Sport=="no"){
                                          fquery.push({"Sport":false})}
                                        if(filters.Sport=="bs"){fquery.push({"Sport":'bs'})}

fquery.push({x:{$gte:Number(filters.lx),$lte:Number(filters.lxu)}})
fquery.push({year:{$gte:Number(filters.ly),$lte:Number(filters.lyu)}})

for (i in fquery){
          dquery.push(fquery[i])
        }

        dquery.push({op:{$gte:Number(filters.op),$lte:Number(filters.opu)}})






                                        ////filter data and data1

                                        ///save filters to query

                                        ///var newQuery            = new Query();

      





            var childjs=child.fork(__dirname+'/qmoviechild.js');
            childjs.send({fquery:fquery,dquery:dquery,filters:filters});
            childjs.on('message',function(wd){


              
                          res.json({ success: wd.ddd, data1: wd.ddd1,
                                                      kword:wd.dsdkw,kword1:wd.sdkw,ktpercentage:wd.ktpercentage,summ:wd.sum,
                                                      actord:wd.dsdactors,actord1:wd.sdactors,tpercentage:wd.tpercentage,asum:wd.asummary,
                                                      dpdata:wd.dsddp,dpdata1:wd.sddp,dpt:wd.dptpercentage,dsum:wd.dpsummary});
                                       user.local.notfinish=false
                                        user.save()
                                       childjs.kill();
            })


}

})

});



/////////////quebec data ends


/////////cloud work


///////////////////
/////////save
///////////////////
app.post('/getsavedwork', isLoggedIn, function(req, res,next) {


User.findOne({"local.email":req.user.local.email},function(err,user){


        Proj.find({"email":user.local.email},function(err,projs){



              res.json({ projs: projs })


          })



  


  });})

/////////////////
////////
/////////////////
app.post('/savework', isLoggedIn, function(req, res,next) {

  filters=req.body['filters']
  info=req.body['info']

User.findOne({"local.email":req.user.local.email},function(err,user){
 // user.local.notfinish=false
                var newfilter            = new saved_filters();



                                        filters['keywords']=filters.keywords.split(',')
                                        filters['actors']=filters.actors.split(',')
                                        filters['techrole']=filters.techrole.split(',')













              

                // set the user's local credentials
                newfilter.email    = user.local.email;
                newfilter.filter = filters
                


    


        // save the user
  //              newfilter.save(function(err) {
  //                  if (err)
  //                      throw err;
  //                  return done(null, newUser);
  //              });
  //          }
  

  });})




};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
