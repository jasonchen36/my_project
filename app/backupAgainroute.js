// app/routes.js
module.exports = function(app, passport,l_data,interl_data,qubl_data,User,Query) {

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


app.all('/public/*', isLoggedIn,function(req, res, next) {
		
  next();
})
app.use('/public',isLoggedIn,express.static(cd+'/public'));


	app.get('/BOterminal', isLoggedIn, function(req, res,next) {
		

        console.log(req.user.local.email+" logged in from "+ String(req.connection.remoteAddress))

		//res.sendFile('/Users/jackzhang/Documents/d3stuff/Glightwb 2100 total secure/public'),
		res.sendFile(cd+'/public/amark.html'
		

			//{

		//	user : req.user // get the user out of session and pass to template
		//}
		);
	});


	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.post('/logout', function(req, res) {

		req.logout();
		res.redirect('/');
	});

////app.js



var bodyParser = require('body-parser');



function isBigEnough(value) {
        return function(element, index, array) {
          return (element >= value);
            }
              }

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}
  

app.use(bodyParser());

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
    res.render('welcome.ejs');
  });




app.post('/lgd', isLoggedIn,function(req, res,done) {


	//console.log(req.user.local.email)
	User.findOne({'local.email':req.user.local.email},function (err, user) {
  if (err) return handleError(err);
  

if(user.local.current_usage>=user.local.usage_limit){

	res.json({ ld: {x:"expired"} })
   console.log(user.local.email +" expired")

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






	//var filters;
	var Worker = require('webworker-threads').Worker;






////post request and response
app.post('/filters', isLoggedIn,function(req, res) {
User.findOne({'local.email':req.user.local.email},function (err, user) {
  if (err) return handleError(err);
  

if(user.local.current_usage>user.local.usage_limit){

	
   console.log(user.local.email +" expired no data sent")

}

//  var current_usr=usrs[req.connection.remoteAddress];
//  if(usr_current_tries[current_usr]>usr_total_tries[current_usr]){
    

//  }
  else{

                                            
                                            
                                          filters=req.body;




                                        filters['keywords']=filters.keywords.split(',')
                                        filters['actors']=filters.actors.split(',')
                                        filters['techrole']=filters.techrole.split(',')



                                         var fquery=[{}]
  var dquery=[{}]

  if(filters.keywords!=''){
  for (i in filters.keywords){
    fquery.push({"keywords":filters.keywords[i]})
  }}

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







var mongo = require('mongodb'),  
  Server = mongo.Server,
  Db = mongo.Db;
var server = new Server('localhost', 27017, {  
  auto_reconnect: true
});
var db = new Db('mongoo', server);  
var onErr = function(err, callback) {  
  db.close();
  callback(err);
};


getdata1 = function(fquery, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('dmovies', function(err, collection) {
        if (!err) {
          collection.aggregate([{$match:{$and:fquery}}
                                    ,{$unwind:"$keywords"}
                                    ,{$group:{_id:"$keywords"
                                              ,number:{$sum:1}
                                              ,apsum:{$sum:'$ap'}}}
                                    ,{$sort:{number:-1}}
                                    ]
                                    ,function(err, docs) {
            if (!err) {
              db.close();
              console.log('got data')
              //console.log(docs)
              callback(docs);
            } else {
              onErr(err, callback);
            }
          }); //end collection.mapreduce 
        } else {
          onErr(err, callback);
        }
      }); //end db.collection
    } else {
      onErr(err, callback);
    }
  }); // end db.open
};


getdata = function(dquery, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('dmovies', function(err, collection) {
        if (!err) {
          collection.aggregate([{$match:{$and:dquery}}
                                    ,{$unwind:"$keywords"}
                                    ,{$group:{_id:"$keywords"
                                              ,number:{$sum:1}
                                              }}
                                    ,{$sort:{number:-1}}
                                    ,{$limit:1000}]
                                    ,function(err, docs) {
            if (!err) {
              db.close();
           //   console.log('got data')
              //console.log(docs)
              callback(docs);
            } else {
              onErr(err, callback);
            }
          }); //end collection.mapreduce 
        } else {
          onErr(err, callback);
        }
      }); //end db.collection
    } else {
      onErr(err, callback);
    }
  }); // end db.open
};


getadata1 = function(fquery, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('dmovies', function(err, collection) {
        if (!err) {
          collection.aggregate([{$match:{$and:fquery}}
                                    ,{$unwind:"$actors"}
                                    ,{$group:{_id:"$actors"
                                              ,number:{$sum:1}
                                              ,apsum:{$sum:'$ap'}}}
                                    ,{$sort:{number:-1}}
                                    ]
                                    ,function(err, docs) {
            if (!err) {
              db.close();
            //  console.log('got data')
              //console.log(docs)
              callback(docs);
            } else {
              onErr(err, callback);
            }
          }); //end collection.mapreduce 
        } else {
          onErr(err, callback);
        }
      }); //end db.collection
    } else {
      onErr(err, callback);
    }
  }); // end db.open
};


getadata = function(dquery, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('dmovies', function(err, collection) {
        if (!err) {
          collection.aggregate([{$match:{$and:dquery}}
                                    ,{$unwind:"$actors"}
                                    ,{$group:{_id:"$actors"
                                              ,number:{$sum:1}
                                              }}
                                    ,{$sort:{number:-1}}
                                    ,{$limit:1000}]
                                    ,function(err, docs) {
            if (!err) {
              db.close();
            //  console.log('got data')
              //console.log(docs)
              callback(docs);
            } else {
              onErr(err, callback);
            }
          }); //end collection.mapreduce 
        } else {
          onErr(err, callback);
        }
      }); //end db.collection
    } else {
      onErr(err, callback);
    }
  }); // end db.open
};



finddata = function(dquery, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('dmovies', function(err, collection) {
        if (!err) {
          collection.find({$and:
            dquery
            },{'_id':0,'__v':0}).toArray(function(err, docs) {
            if (!err) {
              db.close();
             // console.log('got data')
              callback(docs);
            } else {
              onErr(err, callback);
            }
          }); //end collection.find 
        } else {
          onErr(err, callback);
        }
      }); //end db.collection
    } else {
      onErr(err, callback);
    }
  }); // end db.open
};

                                        ////filter data and data1

                                        ///save filters to query

                                        ///var newQuery            = new Query();

                                                        // set the user's local credentials
                                        ///                newQuery.email    = email;
                                         ///               newQuery.save(function(err) {
                                          ///                  if (err)
                                          ///                      throw err;
                                           ///                 return done(null, newQuery);
                                           ///             });


finddata(dquery,function(data){
          finddata(fquery,function(data1){
                      getdata(dquery,function(odata){
                              getdata1(fquery,function(data1kw){

                                 // console.log(data[0])
                                        ///
                                        //webworker
                                        var fibo = new Worker(function(){
                                          function fibo (f_data){


                                        filters=f_data.filters
                                        data=f_data.data
                                        data1=f_data.data1
                                        data1kw=f_data.data1kw
                                        odata=f_data.odata


                                        ////////////********************
                                        data1kw.forEach(function(d){d.percentage=Math.round((d.apsum/51)*100/d.number)})

                                      //  console.log('kword done1')

                                        var fi=data1kw.filter(function (d){
                                                                                  ///insert filters adjustment here
                                        return d.percentage >= Number(filters.kfr_min)&& d.percentage<=Number(filters.kfr_max)})


                                       // console.log(fi[0])

                                      // sort_fi=fi.sort(function(a,b){return parseFloat(b.number)-parseFloat(a.number)})
                                        fi_dict={}
                                        for (i in fi){
                                          fi_dict[fi[i]._id]=fi[i].percentage

                                        }

                                      //  console.log('kword done2')

                                        datakw=[]

                                        for (i in odata){
                                          if((odata[i]._id!='')&&(typeof fi_dict[odata[i]._id]!='undefined')){
                                          var tpl={}
                                          tpl.keyword=odata[i]._id
                                          tpl.percent=fi_dict[odata[i]._id]
                                          tpl.number=odata[i].number
                                          datakw.push(tpl)}

                                          else{}

                                        }

                                    //  console.log('kword done21')
                                        sort_datakw=datakw.sort(function(a,b){return parseFloat(b.number)-parseFloat(a.number)})
                                        
                                        fnum=[]
                                    //  console.log('kword done22')


                                     /* if(typeof sort_datakw[0]=='undefined'){


                                      }*/


                                      var ind_fnum=28

                                      for (i=0;i<28;i++){



                                        if(
                                      typeof sort_datakw[i]=='undefined')
                                          {ind_fnum=i
                                          break;}
                                        }

                                        for (i=0;i<ind_fnum;i++){
                                          fnum.push(sort_datakw[i])
                                        
                                        }

                                     //   console.log('kword done23')

                                     //   console.log(fnum)

                                        if(typeof fnum[0]=='undefined'){
                                          

                                          summary=[{'text':'No Common Attributes',
                                                      'size':1
                                                }]
                                        }


                                        else{

                                         var summary=[];
                                                //summary[1]={'text':5},summary[2]='o'
                                                //var ite='';
                                                for (i in fnum){
                                                summary[i]={'text':fnum[i].keyword,
                                                      'size':fnum[i].number
                                                }
                                                
                                                };
                                              }


                                         //     console.log('kword done3')

                                        //console.log(final_datakw)


                                                                                  var fnumd = [];
                                                                                       for (var i in data){
                                                                                          fnumd.push(data[i].keywords)

                                                                                       }
                                                                                        var temp_fnumd;
                                                                                        
                                                                                        for(i=0;i<data.length;i++){
                                                                                          temp_fnumd=data[i].keywords;
                                                                                          
                                                                                          fnumd[i]="";
                                                                                          for(ai=0;ai<fnum.length;ai++){
                                                                                            if(temp_fnumd.indexOf(fnum[ai].keyword)>-1){
                                                                                            
                                                                                            fnumd[i]=fnumd[i]+fnum[ai].keyword+',';
                                                                                            
                                                                                            }
                                                                                          }
                                                                                          
                                                                                        } 

                                                                                        


                                                                                        var ddd=[];
                                                                                        for (var i in data){
                                                                                          ddd.push({})

                                                                                        }
                                                                                        for (var i in ddd){
                                                                                          ddd[i].x=data[i].x,
                                                                                          ddd[i].y=data[i].y,
                                                                                          ddd[i].title=data[i].title,
                                                                                          ddd[i].op=data[i].op
                                                                                          ddd[i].ap=data[i].ap
                                                                                         //,ddd[i].actors=data[i].actors

                                                                                        }



                                                                                         var ddd1=ddd;
                                                                                        
                                                                            // console.log('step3-kword count finish')
                                                                              ///////
                                                                              ///////
                                                                              ///////keyword elimination

                                                                             if(typeof fnum[0]=='undefined'){
                                                                              fnum=[{'keyword':'No Common Attributes','percent':0,'number':0}]
                                                                              ktpercentage=[{'keyword':"No Common Attributes",'percent':NaN}]
                                                                             }

                                                                                          else{
                                                                                        var ktpercentage=[]
                                                                                        for(i in fnum){

                                                                                          ktpercentage.push({'keyword':fnum[i].keyword,'percent':fnum[i].percent})

                                                                                        }}
                                                                                       // console.log('kword done')

                                                                                       // console.log(ktpercentage)

                                        //////////////////****************


                                        //end of filter data and data1
                                        /////////////////start of manipulation of data and data1
                                        ////////////
                                        ////////////
                                        ////////////



                                        ///////////
                                        ///////////
                                        ///////////actor manipulation



                                        var akword;
                                            data.forEach(function(d){
                                              akword=akword+','+d.actors;
                                            });

                                            function isBigEnough(value) {
                                                 return function(element, index, array) {
                                                    return (element > value);
                                                      }
                                                        }
                                                                                      //console.log(akword)
                                            function isBlank(str) {
                                          return (!str || /^\s*$/.test(str));
                                      }
                                            //console.log(typeof kword)
                                            if (isBlank(akword)){akword="Invalid Selection"}
                                              
                                              akword.replace(",,",",")
                                               
                                              var akwarray = akword.split(",");
                                               

                                             //  console.log('akarray got it')
                                               //console.log(akwarray);
                                               
                                               var acounts = {};
                                            akwarray.forEach(function(row) {
                                            acounts[row] = acounts.hasOwnProperty(row) ? acounts[row] + 1 : 1;
                                            });
                                               
                                              var adict=acounts;

                                              var aitems = Object.keys(adict).map(function(key) {
                                              return [key, adict[key]];
                                              });

                                              // Sort the array based on the second element
                                              aitems.sort(function(first, second) {
                                                return second[1] - first[1];
                                                });
                                                
                                                //console.log(aitems)
                                              
                                              var anewcount=aitems.slice(0, 28);
                                              
                                                for (i in anewcount){
                                                if(anewcount[i][0].indexOf('undefined')>-1){
                                                anewcount.splice(i,1);
                                                }
                                                }
                                              
                                              //console.log(anewcount)
                                          // Create a new array with only the first 5 items
                                            //console.log(anewcount);
                                            
                                                var asummary=[];
                                                //summary[1]={'text':5},summary[2]='o'
                                                //var ite='';
                                                for (i in anewcount){
                                                asummary[i]={'text':anewcount[i][0],
                                                      'size':anewcount[i][1]
                                                }
                                                
                                                };
                                                
                                                

                                              var sdactors= [];
                                              for (var i in data1){
                                                sdactors.push(data1.actors)

                                              }
                                                var temp_act;
                                                
                                                for(i=0;i<data1.length;i++){
                                                  temp_act=String(data1[i].actors).split(',');
                                                  sdactors[i]="";
                                                  for(ai=0;ai<asummary.length;ai++){
                                                    if(temp_act.indexOf(asummary[ai].text)>-1){
                                                    
                                                    sdactors[i]=sdactors[i]+asummary[ai].text+',';
                                                    
                                                    }
                                                  }
                                                  
                                                }
                                                
                                                
                                                
                                                
                                              var dsdactors= [];
                                              for (var i in data){
                                                dsdactors.push(data.actors)

                                              }
                                                var dtemp_act;
                                                
                                                for(i=0;i<data.length;i++){
                                                  dtemp_act=String(data[i].actors).split(',');
                                                  dsdactors[i]="";
                                                  for(ai=0;ai<asummary.length;ai++){
                                                    if(dtemp_act.indexOf(asummary[ai].text)>-1){
                                                    
                                                    dsdactors[i]=dsdactors[i]+asummary[ai].text+',';
                                                    
                                                    }
                                                  }
                                                  
                                                }
                                                

                                                var tcn=[];
                                                var tpercentage=[];
                                                var tpn;
                                              for(i=0;i<asummary.length;i++){
                                                var tcgdata=data1.filter(function (d){
                                              return String(d.actors).match(asummary[i].text)})
                                                
                                                tcgdata.forEach(function(d){
                                               tcn.push(d.ap)
                                              }
                                              )
                                              
                                         
                                              
                                              tpn=tcn.filter(isBigEnough(0))
                                              tpercentage[i]={'actor':asummary[i].text,'percent':Math.round(tpn.length*100/tcn.length)}
                                              
                                              tcn=[];
                                              
                                              }
                                            //  console.log('actor done')
                                        //////////////////////////director manip
                                        var dplist=[''];
                                              data.forEach(function(d){
                                                dplist=dplist+','+d.techrole;
                                              });
                                              
                                              
                                            function isBlank(str) {
                                            return (!str || /^\s*$/.test(str));
                                        }
                                              //console.log(typeof dplist)
                                              if (isBlank(dplist)){dplist="No Similar Attributes"}
                                            
                                                 dplist.replace(",,",",")
                                                var dparray = dplist.split(",");
                                                 
                                                // console.log(dparray);
                                                 
                                                 var dpcounts = {};
                                              dparray.forEach(function(row) {
                                              dpcounts[row] = dpcounts.hasOwnProperty(row) ? dpcounts[row] + 1 : 1;
                                              });
                                                 
                                                var dpict=dpcounts;

                                                var dpitems = Object.keys(dpict).map(function(key) {
                                                return [key, dpict[key]];
                                                });

                                                // Sort the array based on the second element
                                                dpitems.sort(function(first, second) {
                                                  return second[1] - first[1];
                                                  });
                                          
                                          
                                          
                                          
                                          
                                                var dpnewcount=dpitems.slice(0, 28);
                                            // Create a new array with only the first 5 dpitems
                                            //  console.log(dpnewcount);
                                              
                                                  var dpsummary=[];
                                                  //dpsummary[1]={'text':5},dpsummary[2]='o'
                                                  //var ite='';
                                                  for (i in dpnewcount){
                                                  dpsummary[i]={'text':dpnewcount[i][0],
                                                        'size':dpnewcount[i][1]
                                                  }
                                                  
                                                  };
                                                
                                                
                                               // console.log('director done half')
                                                var sddp= [];
                                                for (var i in data1){
                                                  sddp.push(data1.techrole)

                                                }


                                                var temp_dp;
                                                  
                                                  for(i=0;i<data1.length;i++){
                                                    temp_dp=data1[i].techrole;
                                                    sddp[i]="";
                                                    for(ai=0;ai<dpsummary.length;ai++){
                                                      if(temp_dp.indexOf(dpsummary[ai].text)>-1){
                                                      
                                                      sddp[i]=sddp[i]+dpsummary[ai].text+',';
                                                      
                                                      }
                                                    }
                                                    
                                                  }

                                                 // console.log('director done half2')
                                                  
                                                   var dsddp= [];
                                                for (var i in data){
                                                  dsddp.push(data.techrole)

                                                }
                                                  var dtemp_dp;
                                                  
                                                  for(i=0;i<data.length;i++){
                                                    dtemp_dp=String(data[i].techrole);
                                                    dsddp[i]="";
                                                    for(ai=0;ai<dpsummary.length;ai++){
                                                      if(dtemp_dp.indexOf(dpsummary[ai].text)>-1){
                                                      
                                                      dsddp[i]=dsddp[i]+dpsummary[ai].text+',';
                                                      
                                                      }
                                                    }
                                                    
                                                  }

                                                  //console.log('director done half3')

                                                  var dptcn=[];
                                                  var dptpercentage=[];
                                                  var dptpn;
                                                for(i=0;i<dpsummary.length;i++){
                                                  var dpcgdata=data1.filter(function (d){
                                                return String(d.techrole).match(dpsummary[i].text)})
                                                  
                                                  dpcgdata.forEach(function(d){
                                                 dptcn.push(d.op)
                                                }
                                                )
                                                
                                                
                                                
                                                dptpn=dptcn.filter(isBigEnough(50))
                                                dptpercentage[i]={'techrole':dpsummary[i].text,'percent':Math.round(dptpn.length*100/dptcn.length)}
                                                
                                                dptcn=[];
                                                
                                                } 

                                               // console.log('director done')

                                                for(var i in summary){
                                                    if(summary[i].text==""){summary.splice(i,1)}

                                                }

                                                for(var i in asummary){
                                                    if(asummary[i].text==""){asummary.splice(i,1)}

                                                }

                                                for(var i in dpsummary){
                                                    if(dpsummary[i].text==""){dpsummary.splice(i,1)}

                                                }


                                              return {ddd:ddd,ddd1:ddd,dsdkw:fnumd,sdkw:fnumd,ktpercentage:fnum,
                                                      sum:summary,dsdactors:dsdactors,sdactors:sdactors,tpercentage:tpercentage,
                                                      asummary:asummary,dsddp:dsddp,sddp:sddp,dptpercentage:dptpercentage,
                                                      dpsummary:dpsummary} 
                                              }
                                                this.onmessage=function (event){
                                                  postMessage(fibo(event.data));
                                                }})


                                        console.log(filters)
                                        console.log("sent")
                                        console.log(" from IP address:"+req.connection.remoteAddress+" requested above")



                                        ////end of manipulation

                                        fibo.onmessage=function(event){


                                          wd=event.data


                                          res.json({ success: wd.ddd, data1: wd.ddd1,
                                                      kword:wd.dsdkw,kword1:wd.sdkw,ktpercentage:wd.ktpercentage,summ:wd.sum,
                                                      actord:wd.dsdactors,actord1:wd.sdactors,tpercentage:wd.tpercentage,asum:wd.asummary,
                                                      dpdata:wd.dsddp,dpdata1:wd.sddp,dpt:wd.dptpercentage,dsum:wd.dpsummary});
                                          console.log(fquery)

                                           data=null
                                           data1=null
                                           odata=null
                                           data1kw=null
                                           fquery=null
                                           dquery=null
                                           filters=null

                                           console.log(fquery)

                                           
                                          fibo.terminate()
                                        };

                                        var f_d={filters:filters,data:data,data1:data1,odata:odata,data1kw:data1kw};

                                        fibo.postMessage(f_d)


                            })})})})



}

})

});


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

//  var current_usr=usrs[req.connection.remoteAddress];
//  if(usr_current_tries[current_usr]>usr_total_tries[current_usr]){
    

//  }
 else{

                                            
                                            
                                          filters=req.body;




                                        filters['keywords']=filters.keywords.split(',')
                                        filters['actors']=filters.actors.split(',')
                                        filters['techrole']=filters.techrole.split(',')



                                         var fquery=[{}]
  var dquery=[{}]

  if(filters.keywords!=''){
  for (i in filters.keywords){
    fquery.push({"keywords":filters.keywords[i]})
  }}

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







var mongo = require('mongodb'),  
  Server = mongo.Server,
  Db = mongo.Db;
var server = new Server('localhost', 27017, {  
  auto_reconnect: true
});
var db = new Db('mongoo', server);  
var onErr = function(err, callback) {  
  db.close();
  callback(err);
};


getdata1 = function(fquery, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('imovies', function(err, collection) {
        if (!err) {
          collection.aggregate([{$match:{$and:fquery}}
                                    ,{$unwind:"$keywords"}
                                    ,{$group:{_id:"$keywords"
                                              ,number:{$sum:1}
                                              ,apsum:{$sum:'$ap'}}}
                                    ,{$sort:{number:-1}}
                                    ]
                                    ,function(err, docs) {
            if (!err) {
              db.close();
             // console.log('got data')
              //console.log(docs)
              callback(docs);
            } else {
              onErr(err, callback);
            }
          }); //end collection.mapreduce 
        } else {
          onErr(err, callback);
        }
      }); //end db.collection
    } else {
      onErr(err, callback);
    }
  }); // end db.open
};


getdata = function(dquery, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('imovies', function(err, collection) {
        if (!err) {
          collection.aggregate([{$match:{$and:dquery}}
                                    ,{$unwind:"$keywords"}
                                    ,{$group:{_id:"$keywords"
                                              ,number:{$sum:1}
                                              }}
                                    ,{$sort:{number:-1}}
                                    ,{$limit:1000}]
                                    ,function(err, docs) {
            if (!err) {
              db.close();
           //   console.log('got data')
              //console.log(docs)
              callback(docs);
            } else {
              onErr(err, callback);
            }
          }); //end collection.mapreduce 
        } else {
          onErr(err, callback);
        }
      }); //end db.collection
    } else {
      onErr(err, callback);
    }
  }); // end db.open
};


getadata1 = function(fquery, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('imovies', function(err, collection) {
        if (!err) {
          collection.aggregate([{$match:{$and:fquery}}
                                    ,{$unwind:"$actors"}
                                    ,{$group:{_id:"$actors"
                                              ,number:{$sum:1}
                                              ,apsum:{$sum:'$ap'}}}
                                    ,{$sort:{number:-1}}
                                    ]
                                    ,function(err, docs) {
            if (!err) {
              db.close();
            //  console.log('got data')
              //console.log(docs)
              callback(docs);
            } else {
              onErr(err, callback);
            }
          }); //end collection.mapreduce 
        } else {
          onErr(err, callback);
        }
      }); //end db.collection
    } else {
      onErr(err, callback);
    }
  }); // end db.open
};


getadata = function(dquery, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('imovies', function(err, collection) {
        if (!err) {
          collection.aggregate([{$match:{$and:dquery}}
                                    ,{$unwind:"$actors"}
                                    ,{$group:{_id:"$actors"
                                              ,number:{$sum:1}
                                              }}
                                    ,{$sort:{number:-1}}
                                    ,{$limit:1000}]
                                    ,function(err, docs) {
            if (!err) {
              db.close();
             // console.log('got data')
              //console.log(docs)
              callback(docs);
            } else {
              onErr(err, callback);
            }
          }); //end collection.mapreduce 
        } else {
          onErr(err, callback);
        }
      }); //end db.collection
    } else {
      onErr(err, callback);
    }
  }); // end db.open
};



finddata = function(dquery, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('imovies', function(err, collection) {
        if (!err) {
          collection.find({$and:
            dquery
            },{'_id':0,'__v':0}).toArray(function(err, docs) {
            if (!err) {
              db.close();
            //  console.log('got data')
              callback(docs);
            } else {
              onErr(err, callback);
            }
          }); //end collection.find 
        } else {
          onErr(err, callback);
        }
      }); //end db.collection
    } else {
      onErr(err, callback);
    }
  }); // end db.open
};

                                        ////filter data and data1

                                        ///save filters to query

                                        ///var newQuery            = new Query();

                                                        // set the user's local credentials
                                        ///                newQuery.email    = email;
                                         ///               newQuery.save(function(err) {
                                          ///                  if (err)
                                          ///                      throw err;
                                           ///                 return done(null, newQuery);
                                           ///             });


finddata(dquery,function(data){
          finddata(fquery,function(data1){
                      getdata(dquery,function(odata){
                              getdata1(fquery,function(data1kw){

                                 // console.log(data[0])
                                        ///
                                        //webworker
                                        var fibo = new Worker(function(){
                                          function fibo (f_data){


                                        filters=f_data.filters
                                        data=f_data.data
                                        data1=f_data.data1
                                        data1kw=f_data.data1kw
                                        odata=f_data.odata


                                        ////////////********************
                                        data1kw.forEach(function(d){d.percentage=Math.round((d.apsum/51)*100/d.number)})

                                       // console.log('kword done1')

                                        var fi=data1kw.filter(function (d){
                                                                                  ///insert filters adjustment here
                                        return d.percentage >= Number(filters.kfr_min)&& d.percentage<=Number(filters.kfr_max)})


                                      //  console.log(fi[0])

                                      // sort_fi=fi.sort(function(a,b){return parseFloat(b.number)-parseFloat(a.number)})
                                        fi_dict={}
                                        for (i in fi){
                                          fi_dict[fi[i]._id]=fi[i].percentage

                                        }

                                       // console.log('kword done2')

                                        datakw=[]

                                        for (i in odata){
                                          if((odata[i]._id!='')&&(typeof fi_dict[odata[i]._id]!='undefined')){
                                          var tpl={}
                                          tpl.keyword=odata[i]._id
                                          tpl.percent=fi_dict[odata[i]._id]
                                          tpl.number=odata[i].number
                                          datakw.push(tpl)}

                                          else{}

                                        }

                                   //   console.log('kword done21')
                                        sort_datakw=datakw.sort(function(a,b){return parseFloat(b.number)-parseFloat(a.number)})
                                        
                                        fnum=[]
                                     // console.log('kword done22')


                                     /* if(typeof sort_datakw[0]=='undefined'){


                                      }*/


                                      var ind_fnum=28

                                      for (i=0;i<28;i++){



                                        if(
                                      typeof sort_datakw[i]=='undefined')
                                          {ind_fnum=i
                                          break;}
                                        }

                                        for (i=0;i<ind_fnum;i++){
                                          fnum.push(sort_datakw[i])
                                        
                                        }

                                       // console.log('kword done23')

                                       // console.log(fnum)

                                        if(typeof fnum[0]=='undefined'){
                                          

                                          summary=[{'text':'No Common Attributes',
                                                      'size':1
                                                }]
                                        }


                                        else{

                                         var summary=[];
                                                //summary[1]={'text':5},summary[2]='o'
                                                //var ite='';
                                                for (i in fnum){
                                                summary[i]={'text':fnum[i].keyword,
                                                      'size':fnum[i].number
                                                }
                                                
                                                };
                                              }


                                            //  console.log('kword done3')

                                        //console.log(final_datakw)


                                                                                  var fnumd = [];
                                                                                       for (var i in data){
                                                                                          fnumd.push(data[i].keywords)

                                                                                       }
                                                                                        var temp_fnumd;
                                                                                        
                                                                                        for(i=0;i<data.length;i++){
                                                                                          temp_fnumd=data[i].keywords;
                                                                                          
                                                                                          fnumd[i]="";
                                                                                          for(ai=0;ai<fnum.length;ai++){
                                                                                            if(temp_fnumd.indexOf(fnum[ai].keyword)>-1){
                                                                                            
                                                                                            fnumd[i]=fnumd[i]+fnum[ai].keyword+',';
                                                                                            
                                                                                            }
                                                                                          }
                                                                                          
                                                                                        } 

                                                                                        


                                                                                        var ddd=[];
                                                                                        for (var i in data){
                                                                                          ddd.push({})

                                                                                        }
                                                                                        for (var i in ddd){
                                                                                          ddd[i].x=data[i].x,
                                                                                          ddd[i].y=data[i].y,
                                                                                          ddd[i].title=data[i].title,
                                                                                          ddd[i].op=data[i].op
                                                                                          ddd[i].ap=data[i].ap
                                                                                         //,ddd[i].actors=data[i].actors

                                                                                        }



                                                                                         var ddd1=ddd;
                                                                                        
                                                                          //   console.log('step3-kword count finish')
                                                                              ///////
                                                                              ///////
                                                                              ///////keyword elimination

                                                                             if(typeof fnum[0]=='undefined'){
                                                                              fnum=[{'keyword':'No Common Attributes','percent':0,'number':0}]
                                                                              ktpercentage=[{'keyword':"No Common Attributes",'percent':NaN}]
                                                                             }

                                                                                          else{
                                                                                        var ktpercentage=[]
                                                                                        for(i in fnum){

                                                                                          ktpercentage.push({'keyword':fnum[i].keyword,'percent':fnum[i].percent})

                                                                                        }}
                                                                                      //  console.log('kword done')

                                                                                      //  console.log(ktpercentage)

                                        //////////////////****************


                                        //end of filter data and data1
                                        /////////////////start of manipulation of data and data1
                                        ////////////
                                        ////////////
                                        ////////////



                                        ///////////
                                        ///////////
                                        ///////////actor manipulation



                                        var akword;
                                            data.forEach(function(d){
                                              akword=akword+','+d.actors;
                                            });

                                            function isBigEnough(value) {
                                                 return function(element, index, array) {
                                                    return (element > value);
                                                      }
                                                        }
                                                                                      //console.log(akword)
                                            function isBlank(str) {
                                          return (!str || /^\s*$/.test(str));
                                      }
                                            //console.log(typeof kword)
                                            if (isBlank(akword)){akword="Invalid Selection"}
                                              
                                              akword.replace(",,",",")
                                               
                                              var akwarray = akword.split(",");
                                               

                                             //  console.log('akarray got it')
                                               //console.log(akwarray);
                                               
                                               var acounts = {};
                                            akwarray.forEach(function(row) {
                                            acounts[row] = acounts.hasOwnProperty(row) ? acounts[row] + 1 : 1;
                                            });
                                               
                                              var adict=acounts;

                                              var aitems = Object.keys(adict).map(function(key) {
                                              return [key, adict[key]];
                                              });

                                              // Sort the array based on the second element
                                              aitems.sort(function(first, second) {
                                                return second[1] - first[1];
                                                });
                                                
                                                //console.log(aitems)
                                              
                                              var anewcount=aitems.slice(0, 28);
                                              
                                                for (i in anewcount){
                                                if(anewcount[i][0].indexOf('undefined')>-1){
                                                anewcount.splice(i,1);
                                                }
                                                }
                                              
                                              //console.log(anewcount)
                                          // Create a new array with only the first 5 items
                                            //console.log(anewcount);
                                            
                                                var asummary=[];
                                                //summary[1]={'text':5},summary[2]='o'
                                                //var ite='';
                                                for (i in anewcount){
                                                asummary[i]={'text':anewcount[i][0],
                                                      'size':anewcount[i][1]
                                                }
                                                
                                                };
                                                
                                                

                                              var sdactors= [];
                                              for (var i in data1){
                                                sdactors.push(data1.actors)

                                              }
                                                var temp_act;
                                                
                                                for(i=0;i<data1.length;i++){
                                                  temp_act=String(data1[i].actors).split(',');
                                                  sdactors[i]="";
                                                  for(ai=0;ai<asummary.length;ai++){
                                                    if(temp_act.indexOf(asummary[ai].text)>-1){
                                                    
                                                    sdactors[i]=sdactors[i]+asummary[ai].text+',';
                                                    
                                                    }
                                                  }
                                                  
                                                }
                                                
                                                
                                                
                                                
                                              var dsdactors= [];
                                              for (var i in data){
                                                dsdactors.push(data.actors)

                                              }
                                                var dtemp_act;
                                                
                                                for(i=0;i<data.length;i++){
                                                  dtemp_act=String(data[i].actors).split(',');
                                                  dsdactors[i]="";
                                                  for(ai=0;ai<asummary.length;ai++){
                                                    if(dtemp_act.indexOf(asummary[ai].text)>-1){
                                                    
                                                    dsdactors[i]=dsdactors[i]+asummary[ai].text+',';
                                                    
                                                    }
                                                  }
                                                  
                                                }
                                                

                                                var tcn=[];
                                                var tpercentage=[];
                                                var tpn;
                                              for(i=0;i<asummary.length;i++){
                                                var tcgdata=data1.filter(function (d){
                                              return String(d.actors).match(asummary[i].text)})
                                                
                                                tcgdata.forEach(function(d){
                                               tcn.push(d.ap)
                                              }
                                              )
                                              
                                         
                                              
                                              tpn=tcn.filter(isBigEnough(0))
                                              tpercentage[i]={'actor':asummary[i].text,'percent':Math.round(tpn.length*100/tcn.length)}
                                              
                                              tcn=[];
                                              
                                              }
                                           //   console.log('actor done')
                                        //////////////////////////director manip
                                        var dplist=[''];
                                              data.forEach(function(d){
                                                dplist=dplist+','+d.techrole;
                                              });
                                              
                                              
                                            function isBlank(str) {
                                            return (!str || /^\s*$/.test(str));
                                        }
                                              //console.log(typeof dplist)
                                              if (isBlank(dplist)){dplist="No Similar Attributes"}
                                            
                                                 dplist.replace(",,",",")
                                                var dparray = dplist.split(",");
                                                 
                                                // console.log(dparray);
                                                 
                                                 var dpcounts = {};
                                              dparray.forEach(function(row) {
                                              dpcounts[row] = dpcounts.hasOwnProperty(row) ? dpcounts[row] + 1 : 1;
                                              });
                                                 
                                                var dpict=dpcounts;

                                                var dpitems = Object.keys(dpict).map(function(key) {
                                                return [key, dpict[key]];
                                                });

                                                // Sort the array based on the second element
                                                dpitems.sort(function(first, second) {
                                                  return second[1] - first[1];
                                                  });
                                          
                                          
                                          
                                          
                                          
                                                var dpnewcount=dpitems.slice(0, 28);
                                            // Create a new array with only the first 5 dpitems
                                            //  console.log(dpnewcount);
                                              
                                                  var dpsummary=[];
                                                  //dpsummary[1]={'text':5},dpsummary[2]='o'
                                                  //var ite='';
                                                  for (i in dpnewcount){
                                                  dpsummary[i]={'text':dpnewcount[i][0],
                                                        'size':dpnewcount[i][1]
                                                  }
                                                  
                                                  };
                                                
                                                
                                               // console.log('director done half')
                                                var sddp= [];
                                                for (var i in data1){
                                                  sddp.push(data1.techrole)

                                                }


                                                var temp_dp;
                                                  
                                                  for(i=0;i<data1.length;i++){
                                                    temp_dp=data1[i].techrole;
                                                    sddp[i]="";
                                                    for(ai=0;ai<dpsummary.length;ai++){
                                                      if(temp_dp.indexOf(dpsummary[ai].text)>-1){
                                                      
                                                      sddp[i]=sddp[i]+dpsummary[ai].text+',';
                                                      
                                                      }
                                                    }
                                                    
                                                  }

                                                 // console.log('director done half2')
                                                  
                                                   var dsddp= [];
                                                for (var i in data){
                                                  dsddp.push(data.techrole)

                                                }
                                                  var dtemp_dp;
                                                  
                                                  for(i=0;i<data.length;i++){
                                                    dtemp_dp=String(data[i].techrole);
                                                    dsddp[i]="";
                                                    for(ai=0;ai<dpsummary.length;ai++){
                                                      if(dtemp_dp.indexOf(dpsummary[ai].text)>-1){
                                                      
                                                      dsddp[i]=dsddp[i]+dpsummary[ai].text+',';
                                                      
                                                      }
                                                    }
                                                    
                                                  }

                                                //  console.log('director done half3')

                                                  var dptcn=[];
                                                  var dptpercentage=[];
                                                  var dptpn;
                                                for(i=0;i<dpsummary.length;i++){
                                                  var dpcgdata=data1.filter(function (d){
                                                return String(d.techrole).match(dpsummary[i].text)})
                                                  
                                                  dpcgdata.forEach(function(d){
                                                 dptcn.push(d.op)
                                                }
                                                )
                                                
                                                
                                                
                                                dptpn=dptcn.filter(isBigEnough(50))
                                                dptpercentage[i]={'techrole':dpsummary[i].text,'percent':Math.round(dptpn.length*100/dptcn.length)}
                                                
                                                dptcn=[];
                                                
                                                } 

                                              //  console.log('director done')

                                                for(var i in summary){
                                                    if(summary[i].text==""){summary.splice(i,1)}

                                                }

                                                for(var i in asummary){
                                                    if(asummary[i].text==""){asummary.splice(i,1)}

                                                }

                                                for(var i in dpsummary){
                                                    if(dpsummary[i].text==""){dpsummary.splice(i,1)}

                                                }


                                              return {ddd:ddd,ddd1:ddd,dsdkw:fnumd,sdkw:fnumd,ktpercentage:fnum,
                                                      sum:summary,dsdactors:dsdactors,sdactors:sdactors,tpercentage:tpercentage,
                                                      asummary:asummary,dsddp:dsddp,sddp:sddp,dptpercentage:dptpercentage,
                                                      dpsummary:dpsummary} 
                                              }
                                                this.onmessage=function (event){
                                                  postMessage(fibo(event.data));
                                                }})


                                        console.log(filters)
                                        console.log("sent")
                                        console.log(" from IP address:"+req.connection.remoteAddress+" requested above")



                                        ////end of manipulation

                                        fibo.onmessage=function(event){


                                          wd=event.data


                                          res.json({ success: wd.ddd, data1: wd.ddd1,
                                                      kword:wd.dsdkw,kword1:wd.sdkw,ktpercentage:wd.ktpercentage,summ:wd.sum,
                                                      actord:wd.dsdactors,actord1:wd.sdactors,tpercentage:wd.tpercentage,asum:wd.asummary,
                                                      dpdata:wd.dsddp,dpdata1:wd.sddp,dpt:wd.dptpercentage,dsum:wd.dpsummary});
                                        };

                                        var f_d={filters:filters,data:data,data1:data1,odata:odata,data1kw:data1kw};

                                        fibo.postMessage(f_d)


                            })})})})



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
 else{

                                            
                                            
                                          filters=req.body;




                                        filters['keywords']=filters.keywords.split(',')
                                        filters['actors']=filters.actors.split(',')
                                        filters['techrole']=filters.techrole.split(',')



                                         var fquery=[{}]
  var dquery=[{}]

  if(filters.keywords!=''){
  for (i in filters.keywords){
    fquery.push({"keywords":filters.keywords[i]})
  }}

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







var mongo = require('mongodb'),  
  Server = mongo.Server,
  Db = mongo.Db;
var server = new Server('localhost', 27017, {  
  auto_reconnect: true
});
var db = new Db('mongoo', server);  
var onErr = function(err, callback) {  
  db.close();
  callback(err);
};


getdata1 = function(fquery, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('qmovies', function(err, collection) {
        if (!err) {
          collection.aggregate([{$match:{$and:fquery}}
                                    ,{$unwind:"$keywords"}
                                    ,{$group:{_id:"$keywords"
                                              ,number:{$sum:1}
                                              ,apsum:{$sum:'$ap'}}}
                                    ,{$sort:{number:-1}}
                                    ]
                                    ,function(err, docs) {
            if (!err) {
              db.close();
             // console.log('got data')
              //console.log(docs)
              callback(docs);
            } else {
              onErr(err, callback);
            }
          }); //end collection.mapreduce 
        } else {
          onErr(err, callback);
        }
      }); //end db.collection
    } else {
      onErr(err, callback);
    }
  }); // end db.open
};


getdata = function(dquery, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('qmovies', function(err, collection) {
        if (!err) {
          collection.aggregate([{$match:{$and:dquery}}
                                    ,{$unwind:"$keywords"}
                                    ,{$group:{_id:"$keywords"
                                              ,number:{$sum:1}
                                              }}
                                    ,{$sort:{number:-1}}
                                    ,{$limit:1000}]
                                    ,function(err, docs) {
            if (!err) {
              db.close();
           //   console.log('got data')
              //console.log(docs)
              callback(docs);
            } else {
              onErr(err, callback);
            }
          }); //end collection.mapreduce 
        } else {
          onErr(err, callback);
        }
      }); //end db.collection
    } else {
      onErr(err, callback);
    }
  }); // end db.open
};


getadata1 = function(fquery, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('qmovies', function(err, collection) {
        if (!err) {
          collection.aggregate([{$match:{$and:fquery}}
                                    ,{$unwind:"$actors"}
                                    ,{$group:{_id:"$actors"
                                              ,number:{$sum:1}
                                              ,apsum:{$sum:'$ap'}}}
                                    ,{$sort:{number:-1}}
                                    ]
                                    ,function(err, docs) {
            if (!err) {
              db.close();
            //  console.log('got data')
              //console.log(docs)
              callback(docs);
            } else {
              onErr(err, callback);
            }
          }); //end collection.mapreduce 
        } else {
          onErr(err, callback);
        }
      }); //end db.collection
    } else {
      onErr(err, callback);
    }
  }); // end db.open
};


getadata = function(dquery, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('qmovies', function(err, collection) {
        if (!err) {
          collection.aggregate([{$match:{$and:dquery}}
                                    ,{$unwind:"$actors"}
                                    ,{$group:{_id:"$actors"
                                              ,number:{$sum:1}
                                              }}
                                    ,{$sort:{number:-1}}
                                    ,{$limit:1000}]
                                    ,function(err, docs) {
            if (!err) {
              db.close();
             // console.log('got data')
              //console.log(docs)
              callback(docs);
            } else {
              onErr(err, callback);
            }
          }); //end collection.mapreduce 
        } else {
          onErr(err, callback);
        }
      }); //end db.collection
    } else {
      onErr(err, callback);
    }
  }); // end db.open
};



finddata = function(dquery, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('qmovies', function(err, collection) {
        if (!err) {
          collection.find({$and:
            dquery
            },{'_id':0,'__v':0}).toArray(function(err, docs) {
            if (!err) {
              db.close();
            //  console.log('got data')
              callback(docs);
            } else {
              onErr(err, callback);
            }
          }); //end collection.find 
        } else {
          onErr(err, callback);
        }
      }); //end db.collection
    } else {
      onErr(err, callback);
    }
  }); // end db.open
};

                                        ////filter data and data1

                                        ///save filters to query

                                        ///var newQuery            = new Query();

                                                        // set the user's local credentials
                                        ///                newQuery.email    = email;
                                         ///               newQuery.save(function(err) {
                                          ///                  if (err)
                                          ///                      throw err;
                                           ///                 return done(null, newQuery);
                                           ///             });


finddata(dquery,function(data){
          finddata(fquery,function(data1){
                      getdata(dquery,function(odata){
                              getdata1(fquery,function(data1kw){

                                  console.log(data.length)
                                  console.log(fquery)
                                        ///
                                        //webworker
                                        var fibo = new Worker(function(){
                                          function fibo (f_data){


                                        filters=f_data.filters
                                        data=f_data.data
                                        data1=f_data.data1
                                        data1kw=f_data.data1kw
                                        odata=f_data.odata


                                        ////////////********************
                                        data1kw.forEach(function(d){d.percentage=Math.round((d.apsum/51)*100/d.number)})

                                       // console.log('kword done1')

                                        var fi=data1kw.filter(function (d){
                                                                                  ///insert filters adjustment here
                                        return d.percentage >= Number(filters.kfr_min)&& d.percentage<=Number(filters.kfr_max)})


                                      //  console.log(fi[0])

                                      // sort_fi=fi.sort(function(a,b){return parseFloat(b.number)-parseFloat(a.number)})
                                        fi_dict={}
                                        for (i in fi){
                                          fi_dict[fi[i]._id]=fi[i].percentage

                                        }

                                       // console.log('kword done2')

                                        datakw=[]

                                        for (i in odata){
                                          if((odata[i]._id!='')&&(typeof fi_dict[odata[i]._id]!='undefined')){
                                          var tpl={}
                                          tpl.keyword=odata[i]._id
                                          tpl.percent=fi_dict[odata[i]._id]
                                          tpl.number=odata[i].number
                                          datakw.push(tpl)}

                                          else{}

                                        }

                                   //   console.log('kword done21')
                                        sort_datakw=datakw.sort(function(a,b){return parseFloat(b.number)-parseFloat(a.number)})
                                        
                                        fnum=[]
                                     // console.log('kword done22')


                                     /* if(typeof sort_datakw[0]=='undefined'){


                                      }*/


                                      var ind_fnum=28

                                      for (i=0;i<28;i++){



                                        if(
                                      typeof sort_datakw[i]=='undefined')
                                          {ind_fnum=i
                                          break;}
                                        }

                                        for (i=0;i<ind_fnum;i++){
                                          fnum.push(sort_datakw[i])
                                        
                                        }

                                       // console.log('kword done23')

                                       // console.log(fnum)

                                        if(typeof fnum[0]=='undefined'){
                                          

                                          summary=[{'text':'No Common Attributes',
                                                      'size':1
                                                }]
                                        }


                                        else{

                                         var summary=[];
                                                //summary[1]={'text':5},summary[2]='o'
                                                //var ite='';
                                                for (i in fnum){
                                                summary[i]={'text':fnum[i].keyword,
                                                      'size':fnum[i].number
                                                }
                                                
                                                };
                                              }


                                            //  console.log('kword done3')

                                        //console.log(final_datakw)


                                                                                  var fnumd = [];
                                                                                       for (var i in data){
                                                                                          fnumd.push(data[i].keywords)

                                                                                       }
                                                                                        var temp_fnumd;
                                                                                        
                                                                                        for(i=0;i<data.length;i++){
                                                                                          temp_fnumd=data[i].keywords;
                                                                                          
                                                                                          fnumd[i]="";
                                                                                          for(ai=0;ai<fnum.length;ai++){
                                                                                            if(temp_fnumd.indexOf(fnum[ai].keyword)>-1){
                                                                                            
                                                                                            fnumd[i]=fnumd[i]+fnum[ai].keyword+',';
                                                                                            
                                                                                            }
                                                                                          }
                                                                                          
                                                                                        } 

                                                                                        


                                                                                        var ddd=[];
                                                                                        for (var i in data){
                                                                                          ddd.push({})

                                                                                        }
                                                                                        for (var i in ddd){
                                                                                          ddd[i].x=data[i].x,
                                                                                          ddd[i].y=data[i].y,
                                                                                          ddd[i].title=data[i].title,
                                                                                          ddd[i].op=data[i].op
                                                                                          ddd[i].ap=data[i].ap
                                                                                         //,ddd[i].actors=data[i].actors

                                                                                        }



                                                                                         var ddd1=ddd;
                                                                                        
                                                                          //   console.log('step3-kword count finish')
                                                                              ///////
                                                                              ///////
                                                                              ///////keyword elimination

                                                                             if(typeof fnum[0]=='undefined'){
                                                                              fnum=[{'keyword':'No Common Attributes','percent':0,'number':0}]
                                                                              ktpercentage=[{'keyword':"No Common Attributes",'percent':NaN}]
                                                                             }

                                                                                          else{
                                                                                        var ktpercentage=[]
                                                                                        for(i in fnum){

                                                                                          ktpercentage.push({'keyword':fnum[i].keyword,'percent':fnum[i].percent})

                                                                                        }}
                                                                                      //  console.log('kword done')

                                                                                      //  console.log(ktpercentage)

                                        //////////////////****************


                                        //end of filter data and data1
                                        /////////////////start of manipulation of data and data1
                                        ////////////
                                        ////////////
                                        ////////////



                                        ///////////
                                        ///////////
                                        ///////////actor manipulation



                                        var akword;
                                            data.forEach(function(d){
                                              akword=akword+','+d.actors;
                                            });

                                            function isBigEnough(value) {
                                                 return function(element, index, array) {
                                                    return (element > value);
                                                      }
                                                        }
                                                                                      //console.log(akword)
                                            function isBlank(str) {
                                          return (!str || /^\s*$/.test(str));
                                      }
                                            //console.log(typeof kword)
                                            if (isBlank(akword)){akword="Invalid Selection"}
                                              
                                              akword.replace(",,",",")
                                               
                                              var akwarray = akword.split(",");
                                               

                                             //  console.log('akarray got it')
                                               //console.log(akwarray);
                                               
                                               var acounts = {};
                                            akwarray.forEach(function(row) {
                                            acounts[row] = acounts.hasOwnProperty(row) ? acounts[row] + 1 : 1;
                                            });
                                               
                                              var adict=acounts;

                                              var aitems = Object.keys(adict).map(function(key) {
                                              return [key, adict[key]];
                                              });

                                              // Sort the array based on the second element
                                              aitems.sort(function(first, second) {
                                                return second[1] - first[1];
                                                });
                                                
                                                //console.log(aitems)
                                              
                                              var anewcount=aitems.slice(0, 28);
                                              
                                                for (i in anewcount){
                                                if(anewcount[i][0].indexOf('undefined')>-1){
                                                anewcount.splice(i,1);
                                                }
                                                }
                                              
                                              //console.log(anewcount)
                                          // Create a new array with only the first 5 items
                                            //console.log(anewcount);
                                            
                                                var asummary=[];
                                                //summary[1]={'text':5},summary[2]='o'
                                                //var ite='';
                                                for (i in anewcount){
                                                asummary[i]={'text':anewcount[i][0],
                                                      'size':anewcount[i][1]
                                                }
                                                
                                                };
                                                
                                                

                                              var sdactors= [];
                                              for (var i in data1){
                                                sdactors.push(data1.actors)

                                              }
                                                var temp_act;
                                                
                                                for(i=0;i<data1.length;i++){
                                                  temp_act=String(data1[i].actors).split(',');
                                                  sdactors[i]="";
                                                  for(ai=0;ai<asummary.length;ai++){
                                                    if(temp_act.indexOf(asummary[ai].text)>-1){
                                                    
                                                    sdactors[i]=sdactors[i]+asummary[ai].text+',';
                                                    
                                                    }
                                                  }
                                                  
                                                }
                                                
                                                
                                                
                                                
                                              var dsdactors= [];
                                              for (var i in data){
                                                dsdactors.push(data.actors)

                                              }
                                                var dtemp_act;
                                                
                                                for(i=0;i<data.length;i++){
                                                  dtemp_act=String(data[i].actors).split(',');
                                                  dsdactors[i]="";
                                                  for(ai=0;ai<asummary.length;ai++){
                                                    if(dtemp_act.indexOf(asummary[ai].text)>-1){
                                                    
                                                    dsdactors[i]=dsdactors[i]+asummary[ai].text+',';
                                                    
                                                    }
                                                  }
                                                  
                                                }
                                                

                                                var tcn=[];
                                                var tpercentage=[];
                                                var tpn;
                                              for(i=0;i<asummary.length;i++){
                                                var tcgdata=data1.filter(function (d){
                                              return String(d.actors).match(asummary[i].text)})
                                                
                                                tcgdata.forEach(function(d){
                                               tcn.push(d.ap)
                                              }
                                              )
                                              
                                         
                                              
                                              tpn=tcn.filter(isBigEnough(0))
                                              tpercentage[i]={'actor':asummary[i].text,'percent':Math.round(tpn.length*100/tcn.length)}
                                              
                                              tcn=[];
                                              
                                              }
                                           //   console.log('actor done')
                                        //////////////////////////director manip
                                        var dplist=[''];
                                              data.forEach(function(d){
                                                dplist=dplist+','+d.techrole;
                                              });
                                              
                                              
                                            function isBlank(str) {
                                            return (!str || /^\s*$/.test(str));
                                        }
                                              //console.log(typeof dplist)
                                              if (isBlank(dplist)){dplist="No Similar Attributes"}
                                            
                                                 dplist.replace(",,",",")
                                                var dparray = dplist.split(",");
                                                 
                                                // console.log(dparray);
                                                 
                                                 var dpcounts = {};
                                              dparray.forEach(function(row) {
                                              dpcounts[row] = dpcounts.hasOwnProperty(row) ? dpcounts[row] + 1 : 1;
                                              });
                                                 
                                                var dpict=dpcounts;

                                                var dpitems = Object.keys(dpict).map(function(key) {
                                                return [key, dpict[key]];
                                                });

                                                // Sort the array based on the second element
                                                dpitems.sort(function(first, second) {
                                                  return second[1] - first[1];
                                                  });
                                          
                                          
                                          
                                          
                                          
                                                var dpnewcount=dpitems.slice(0, 28);
                                            // Create a new array with only the first 5 dpitems
                                            //  console.log(dpnewcount);
                                              
                                                  var dpsummary=[];
                                                  //dpsummary[1]={'text':5},dpsummary[2]='o'
                                                  //var ite='';
                                                  for (i in dpnewcount){
                                                  dpsummary[i]={'text':dpnewcount[i][0],
                                                        'size':dpnewcount[i][1]
                                                  }
                                                  
                                                  };
                                                
                                                
                                               // console.log('director done half')
                                                var sddp= [];
                                                for (var i in data1){
                                                  sddp.push(data1.techrole)

                                                }


                                                var temp_dp;
                                                  
                                                  for(i=0;i<data1.length;i++){
                                                    temp_dp=data1[i].techrole;
                                                    sddp[i]="";
                                                    for(ai=0;ai<dpsummary.length;ai++){
                                                      if(temp_dp.indexOf(dpsummary[ai].text)>-1){
                                                      
                                                      sddp[i]=sddp[i]+dpsummary[ai].text+',';
                                                      
                                                      }
                                                    }
                                                    
                                                  }

                                                 // console.log('director done half2')
                                                  
                                                   var dsddp= [];
                                                for (var i in data){
                                                  dsddp.push(data.techrole)

                                                }
                                                  var dtemp_dp;
                                                  
                                                  for(i=0;i<data.length;i++){
                                                    dtemp_dp=String(data[i].techrole);
                                                    dsddp[i]="";
                                                    for(ai=0;ai<dpsummary.length;ai++){
                                                      if(dtemp_dp.indexOf(dpsummary[ai].text)>-1){
                                                      
                                                      dsddp[i]=dsddp[i]+dpsummary[ai].text+',';
                                                      
                                                      }
                                                    }
                                                    
                                                  }

                                                //  console.log('director done half3')

                                                  var dptcn=[];
                                                  var dptpercentage=[];
                                                  var dptpn;
                                                for(i=0;i<dpsummary.length;i++){
                                                  var dpcgdata=data1.filter(function (d){
                                                return String(d.techrole).match(dpsummary[i].text)})
                                                  
                                                  dpcgdata.forEach(function(d){
                                                 dptcn.push(d.op)
                                                }
                                                )
                                                
                                                
                                                
                                                dptpn=dptcn.filter(isBigEnough(50))
                                                dptpercentage[i]={'techrole':dpsummary[i].text,'percent':Math.round(dptpn.length*100/dptcn.length)}
                                                
                                                dptcn=[];
                                                
                                                } 

                                              //  console.log('director done')

                                                for(var i in summary){
                                                    if(summary[i].text==""){summary.splice(i,1)}

                                                }

                                                for(var i in asummary){
                                                    if(asummary[i].text==""){asummary.splice(i,1)}

                                                }

                                                for(var i in dpsummary){
                                                    if(dpsummary[i].text==""){dpsummary.splice(i,1)}

                                                }


                                              return {ddd:ddd,ddd1:ddd,dsdkw:fnumd,sdkw:fnumd,ktpercentage:fnum,
                                                      sum:summary,dsdactors:dsdactors,sdactors:sdactors,tpercentage:tpercentage,
                                                      asummary:asummary,dsddp:dsddp,sddp:sddp,dptpercentage:dptpercentage,
                                                      dpsummary:dpsummary} 
                                              }
                                                this.onmessage=function (event){
                                                  postMessage(fibo(event.data));
                                                }})


                                        console.log(filters)
                                        console.log("sent")
                                        console.log(" from IP address:"+req.connection.remoteAddress+" requested above")



                                        ////end of manipulation

                                        fibo.onmessage=function(event){


                                          wd=event.data


                                          res.json({ success: wd.ddd, data1: wd.ddd1,
                                                      kword:wd.dsdkw,kword1:wd.sdkw,ktpercentage:wd.ktpercentage,summ:wd.sum,
                                                      actord:wd.dsdactors,actord1:wd.sdactors,tpercentage:wd.tpercentage,asum:wd.asummary,
                                                      dpdata:wd.dsddp,dpdata1:wd.sddp,dpt:wd.dptpercentage,dsum:wd.dpsummary});
                                        };

                                        var f_d={filters:filters,data:data,data1:data1,odata:odata,data1kw:data1kw};

                                        fibo.postMessage(f_d)


                            })})})})



}

})

});



/////////////quebec data ends

};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
