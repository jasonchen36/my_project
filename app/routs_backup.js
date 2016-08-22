// app/routes.js
module.exports = function(app, passport,full_data,l_data,interfull_data,interl_data,qubfull_data,qubl_data,User,Query) {

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

      User.findOne({"local.email":req.user.local.email},function(err,user){

        user.local.notfinish=false
                                          user.save()

    })

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






	var filters;
	var Worker = require('webworker-threads').Worker;






////post request and response
app.post('/filters', isLoggedIn,function(req, res) {
User.findOne({'local.email':req.user.local.email},function (err, user) {
  if (err) return handleError(err);
  

if(user.local.current_usage>user.local.usage_limit){

	
   console.log(user.local.email +" expired no data sent")

}

if(user.local.notfinish==true){

  
   console.log(user.local.email +" is hacking and no data sent")

}

//  var current_usr=usrs[req.connection.remoteAddress];
//  if(usr_current_tries[current_usr]>usr_total_tries[current_usr]){
    

//  }
  else{
    user.local.notfinish=true
    user.save()



                                            
                                            
                                          filters=req.body;
                                          var data=full_data;
                                          var data1=full_data;



                                        filters['keywords']=filters.keywords.split(',')
                                        filters['actors']=filters.actors.split(',')
                                        filters['techrole']=filters.techrole.split(',')
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




                                        ///
                                        //webworker
                                        var fibo = new Worker(function(){
                                          function fibo (f_data){


                                        filters=f_data.filters
                                        data=f_data.data
                                        data1=f_data.data1



                                        if(typeof filters['keywords']!=='undefined'){
                                              data = data.filter(function(row) {
                                              
                                              var boolfilter=true;
                                              for (i=0;i<filters['keywords'].length;i++){
                                                boolfilter=boolfilter && 

                                                


                                                row['keywords'].split(',').indexOf(filters['keywords'][i])>-1

                                                }

                                                
                                                return ['keywords'].reduce(function(pass, column) {
                                                    return pass && (
                                                     
                                                        !filters[column] ||
                                                           
                                                  boolfilter 
                                                        );
                                                }, true);
                                                })
                                                }



                                         if(typeof filters['actors']!=='undefined'){
                                              data = data.filter(function(row) {
                                              
                                              var aboolfilter=true;
                                              for (i=0;i<filters['actors'].length;i++){
                                                aboolfilter=aboolfilter && 
                                                row['actors'].split(',').indexOf(filters['actors'][i]) > -1
                                              
                                              }
                                              
                                              

                                                return ['actors'].reduce(function(pass, column) {
                                                    return pass && (

                                                        !filters[column] ||


                                                  aboolfilter

                                                  
                                                        );
                                                }, true);
                                                })
                                                }


                                          if(typeof filters['techrole']!=='undefined'){
                                              data = data.filter(function(row) {
                                              
                                              var aboolfilter=true;
                                              for (i=0;i<filters['techrole'].length;i++){
                                                aboolfilter=aboolfilter && 
                                                row['techrole'].split(',').indexOf(filters['techrole'][i]) > -1
                                              
                                              }
                                              
                                              

                                                return ['techrole'].reduce(function(pass, column) {
                                                    return pass && (

                                                        !filters[column] ||


                                                  aboolfilter

                                                  
                                                        );
                                                }, true);
                                                })
                                                }


                                        data1 = data.filter(function(row) {
                                                // run through all the filters, returning a boolean
                                                return ['Action','Comedy','Family','Adventure','Drama','Historical',
                                                'Music','Musical','Mystery','Biography','Fantasy','Sport',
                                                'War','Documentary','Western','Animation',
                                                'Crime','Horror','Romance','Thriller','SciFi','x','year']
                                              .reduce(function(pass, column) {
                                                    return pass && (
                                                        // pass if no filter is set
                                                        !filters[column] ||
                                                            // pass if the row's value is equal to the filter
                                                            // (i.e. the filter is set to a string)
                                                            //row['Comedy'] === filters['Comedy'] &&
                                                  //row['Action'] === filters['Action'] &&
                                                  //row['Family'] === filters['Family']
                                                  // else { return row['Comedy'] == filters['Comedy'];} 
                                                  //row["op"] >= filters["op"] &&
                                                  //row["op"] < filters["opu"] 
                                                  filters[column].indexOf(row[column]) >= 0
                                                  &&
                                                 
                                                  row["year"] >= filters["ly"] &&
                                                  row["year"] <= filters["lyu"] 
                                                  &&
                                                  row["x"] > Math.floor(filters["lx"]) &&
                                                  row["x"] < Math.floor(filters["lxu"]) 
                                                            // pass if the row's value is in an array of filter values
                                                  
                                                        );
                                                }, true);
                                                })
                                              
                                                console.log(data1.length)


                                                    data = data1.filter(function(row) {
                                                return ['op'].reduce(function(pass, column) {
                                                    return pass && (
                                                        !filters[column] ||

                                                

                                                  parseFloat(row['op']) >= parseFloat(filters['op']) &&
                                                  parseFloat(row['op']) < parseFloat(filters['opu']) 

                                                        );
                                                }, true);
                                                })


                                        //end of filter data and data1
                                        /////////////////start of manipulation of data and data1
                                        ////////////
                                        ////////////
                                        ////////////



                                                var kword=[''];
                                              data.forEach(function(d){
                                                kword=kword+d.keywords;
                                              });
                                              
                                              
                                            function isBlank(str) {
                                            return (!str || /^\s*$/.test(str));
                                        }
                                              //console.log(typeof kword)
                                              if (isBlank(kword)){kword="No Similar Attributes"}
                                            
                                                 kword.replace(",,",",")
                                                var kwarray = kword.split(",");
                                                 
                                                // console.log(kwarray);
                                                 
                                                 var counts = {};
                                              kwarray.forEach(function(row) {
                                              counts[row] = counts.hasOwnProperty(row) ? counts[row] + 1 : 1;
                                              });
                                                 
                                                var dict=counts;

                                                var items = Object.keys(dict).map(function(key) {
                                                return [key, dict[key]];
                                                });

                                                // Sort the array based on the second element
                                                items.sort(function(first, second) {
                                                  return second[1] - first[1];
                                                  });
                                                
                                                items=items.slice(0, 1000)
                                                      var numcount=[];
                                              
                                                  for (i in items){
                                                  numcount[i]={'text':items[i][0],
                                                        'size':items[i][1]
                                                  }
                                                  
                                                  };
                                                  

                                                  function isBigEnough(value) {
                                                return function(element, index, array) {
                                                  return (element >= value);
                                                    }
                                                      }

                                        function isBlank(str) {
                                            return (!str || /^\s*$/.test(str));
                                        }

                                                 
                                                  //console.log(kwarray)
                                             
                                                  
                                                  var numcn=[];
                                                  var numpercentage=[];
                                                  var numpn;
                                                for(i=0;i<numcount.length;i++){
                                                  var numdata=data1.filter(function (d){
                                                return d.keywords.match(numcount[i].text)})
                                                  
                                                  numdata.forEach(function(d){
                                                  numcn.push(d.ap)
                                                }
                                                )
                                                

                                                
                                                numpn=numcn.filter(isBigEnough(50))
                                                numpercentage[i]={'keyword':numcount[i].text,'percent':Math.round(numpn.length*100/numcn.length)}
                                                
                                                numcn=[];
                                                
                                                }

                                                   
                                              
                                                 

                                                
                                                //for (i=0;i<numpercentage.length;i++){
                                                  
                                                //}
                                              
                                                
                                                var fnum=numpercentage.filter(function (d){
                                                ///insert filters adjustment here
                                                return d.percent >= filters.kfr_min&& d.percent<=filters.kfr_max})



                                                 var fnumd = [];
                                                 for (var i in data){
                                                    fnumd.push(data[i].keywords)

                                                 }
                                                  var temp_fnumd;
                                                  
                                                  for(i=0;i<data.length;i++){
                                                    temp_fnumd=data[i].keywords.split(',');
                                                    
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



                                                   var ddd1=[];
                                                  for (var i in data1){
                                                    ddd1.push({})

                                                  }
                                                  for (var i in ddd1){
                                                    ddd1[i].x=data1[i].x,
                                                    ddd1[i].y=data1[i].y,
                                                    ddd1[i].title=data1[i].title,
                                                    ddd1[i].op=data1[i].op
                                                    ddd1[i].ap=data1[i].ap

                                                   //,ddd1[i].actors=data1[i].actors

                                                  }

                                        ///////
                                        ///////
                                        ///////keyword elimination

                                        var kword=[''];
                                              fnumd.forEach(function(d){
                                                kword=kword+d;
                                              });
                                              
                                              
                                            function isBlank(str) {
                                            return (!str || /^\s*$/.test(str));
                                        }
                                              //console.log(typeof kword)
                                              if (isBlank(kword)){kword="Invalid Selection"}
                                            
                                            kword.replace(",,",",")
                                                 
                                                var kwarray = kword.split(",");
                                                 
                                                // console.log(kwarray);
                                                 
                                                 var counts = {};
                                              kwarray.forEach(function(row) {
                                              counts[row] = counts.hasOwnProperty(row) ? counts[row] + 1 : 1;
                                              });
                                                 
                                                var dict=counts;

                                                var items = Object.keys(dict).map(function(key) {
                                                return [key, dict[key]];
                                                });

                                                // Sort the array based on the second element
                                                items.sort(function(first, second) {
                                                  return second[1] - first[1];
                                                  });
                                          
                                          
                                          
                                          
                                          
                                                var newcount=items.slice(0, 28);
                                            // Create a new array with only the first 5 items
                                            //  console.log(newcount);
                                              
                                                  var summary=[];
                                                  //summary[1]={'text':5},summary[2]='o'
                                                  //var ite='';
                                                  for (i in newcount){
                                                  summary[i]={'text':newcount[i][0],
                                                        'size':newcount[i][1]
                                                  }
                                                  
                                                  };
                                                
                                                
                                                
                                                var sdkw= [];
                                                for (var i in data1){
                                                  sdkw.push(data1.keywords)

                                                }

                                                  var temp_kw;
                                                  
                                                  for(i=0;i<data1.length;i++){
                                                    temp_kw=data1[i].keywords.split(',');
                                                    sdkw[i]="";
                                                    for(ai=0;ai<summary.length;ai++){
                                                      if(temp_kw.indexOf(summary[ai].text)>-1){
                                                      
                                                      sdkw[i]=sdkw[i]+summary[ai].text+',';
                                                      
                                                      }
                                                    }
                                                    
                                                  }
                                                  
                                                  var dsdkw= fnumd;
                                                  var dtemp_kw;
                                                  
                                                  
                                                  for(var i in data){
                                                    dtemp_kw=fnumd[i].split(',');

                                                    dsdkw[i]="";
                                                    for(var ai in summary){
                                                      if(dtemp_kw.indexOf(summary[ai].text)>-1){
                                                      
                                                      dsdkw[i]=dsdkw[i]+summary[ai].text+',';

                                                      
                                                      }
                                                    }
                                                    
                                                  }

                                                    var ktcn=[];
                                                  var ktpercentage=[];
                                                  var ktpn;
                                                for(i=0;i<summary.length;i++){
                                                  var kcgdata=data1.filter(function (d){
                                                return d.keywords.match(summary[i].text)})
                                                  
                                                  kcgdata.forEach(function(d){
                                                 ktcn.push(d.ap)
                                                }
                                                )
                                                
                                                
                                                
                                                ktpn=ktcn.filter(isBigEnough(50))
                                                ktpercentage[i]={'keyword':summary[i].text,'percent':Math.round(ktpn.length*100/ktcn.length)}
                                                
                                                ktcn=[];
                                                
                                                }
                                        ///////////
                                        ///////////
                                        ///////////actor manipulation



                                        var akword;
                                              data.forEach(function(d){
                                                akword=akword+d.actors;
                                              });
                                              
                                              //console.log(akword)
                                              function isBlank(str) {
                                            return (!str || /^\s*$/.test(str));
                                        }
                                              //console.log(typeof kword)
                                              if (isBlank(akword)){akword="Invalid Selection"}
                                                
                                                akword.replace(",,",",")
                                                 
                                                var akwarray = akword.split(",");
                                                 
                                                // console.log(kwarray);
                                                 
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
                                                    temp_act=data1[i].actors.split(',');
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
                                                    dtemp_act=data[i].actors.split(',');
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
                                                return d.actors.match(asummary[i].text)})
                                                  
                                                  tcgdata.forEach(function(d){
                                                 tcn.push(d.ap)
                                                }
                                                )
                                                
                                                
                                                
                                                tpn=tcn.filter(isBigEnough(50))
                                                tpercentage[i]={'actor':asummary[i].text,'percent':Math.round(tpn.length*100/tcn.length)}
                                                
                                                tcn=[];
                                                
                                                }

                                        //////////////////////////director manip
                                        var dplist=[''];
                                              data.forEach(function(d){
                                                dplist=dplist+d.techrole;
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
                                                
                                                
                                                
                                                var sddp= [];
                                                for (var i in data1){
                                                  sddp.push(data1.techrole)

                                                }


                                                var temp_dp;
                                                  
                                                  for(i=0;i<data1.length;i++){
                                                    temp_dp=data1[i].techrole.split(',');
                                                    sddp[i]="";
                                                    for(ai=0;ai<dpsummary.length;ai++){
                                                      if(temp_dp.indexOf(dpsummary[ai].text)>-1){
                                                      
                                                      sddp[i]=sddp[i]+dpsummary[ai].text+',';
                                                      
                                                      }
                                                    }
                                                    
                                                  }
                                                  
                                                   var dsddp= [];
                                                for (var i in data){
                                                  dsddp.push(data.techrole)

                                                }
                                                  var dtemp_dp;
                                                  
                                                  for(i=0;i<data.length;i++){
                                                    dtemp_dp=data[i].techrole.split(',');
                                                    dsddp[i]="";
                                                    for(ai=0;ai<dpsummary.length;ai++){
                                                      if(dtemp_dp.indexOf(dpsummary[ai].text)>-1){
                                                      
                                                      dsddp[i]=dsddp[i]+dpsummary[ai].text+',';
                                                      
                                                      }
                                                    }
                                                    
                                                  }

                                                  var dptcn=[];
                                                  var dptpercentage=[];
                                                  var dptpn;
                                                for(i=0;i<dpsummary.length;i++){
                                                  var dpcgdata=data1.filter(function (d){
                                                return d.techrole.match(dpsummary[i].text)})
                                                  
                                                  dpcgdata.forEach(function(d){
                                                 dptcn.push(d.op)
                                                }
                                                )
                                                
                                                
                                                
                                                dptpn=dptcn.filter(isBigEnough(50))
                                                dptpercentage[i]={'techrole':dpsummary[i].text,'percent':Math.round(dptpn.length*100/dptcn.length)}
                                                
                                                dptcn=[];
                                                
                                                } 

                                                var worked_data={};



                                                worked_data.ddd=ddd


                                                worked_data.ddd1=ddd1
                                                worked_data.dsdkw=dsdkw


                                                worked_data.sdkw=sdkw
                                                worked_data.ktpercentage=ktpercentage
                                                worked_data.sum=summary

                                                worked_data.dsdactors=dsdactors


                                                worked_data.sdactors=sdactors
                                                worked_data.tpercentage=tpercentage
                                                worked_data.asum=asummary
                                                worked_data.dpdata=dsddp
                                                worked_data.sddp=sddp

                                                worked_data.dptpercentage=dptpercentage
                                                worked_data.dpsummary=dpsummary

                                                for(var i in summary){
                                                    if(summary[i].text==""){summary.splice(i,1)}

                                                }

                                                for(var i in asummary){
                                                    if(asummary[i].text==""){asummary.splice(i,1)}

                                                }

                                                for(var i in dpsummary){
                                                    if(dpsummary[i].text==""){dpsummary.splice(i,1)}

                                                }

                                             // console.log(ktpercentage)
                                              //console.log(summary)


                                              return {ddd:ddd,ddd1:ddd1,dsdkw:dsdkw,sdkw:sdkw,ktpercentage:ktpercentage,
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

                                          user.local.notfinish=false
                                          user.save()
                                        };

                                        var f_d={filters:filters,data:data,data1:data1};

                                        fibo.postMessage(f_d)


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

//  var current_usr=usrs[req.connection.remoteAddress];
//  if(usr_current_tries[current_usr]>usr_total_tries[current_usr]){
    

//  }
if(user.local.notfinish==true){

  
   console.log(user.local.email +" is hacking and no data sent")

}

//  var current_usr=usrs[req.connection.remoteAddress];
//  if(usr_current_tries[current_usr]>usr_total_tries[current_usr]){
    

//  }
  else{
    user.local.notfinish=true
    user.save()

    
    
                                    filters=req.body;
                                    var data=interfull_data;
                                    var data1=interfull_data;



                                  filters['keywords']=filters.keywords.split(',')
                                  filters['actors']=filters.actors.split(',')
                                  filters['techrole']=filters.techrole.split(',')
                                  ////filter data and data1
                                  //webworker
                                  var fibo = new Worker(function(){
                                    function fibo (f_data){


                                  filters=f_data.filters
                                  data=f_data.data
                                  data1=f_data.data1

                                  //console.log(data.length)

                                  if(typeof filters['keywords']!=='undefined'){
                                        data = data.filter(function(row) {
                                        
                                        var boolfilter=true;
                                        for (i=0;i<filters['keywords'].length;i++){
                                          boolfilter=boolfilter && 

                                          


                                          row['keywords'].split(',').indexOf(filters['keywords'][i])>-1

                                          }

                                          
                                          return ['keywords'].reduce(function(pass, column) {
                                              return pass && (
                                               
                                                  !filters[column] ||
                                                     
                                            boolfilter 
                                                  );
                                          }, true);
                                          })
                                          }



                                   if(typeof filters['actors']!=='undefined'){
                                        data = data.filter(function(row) {
                                        
                                        var aboolfilter=true;
                                        for (i=0;i<filters['actors'].length;i++){
                                          aboolfilter=aboolfilter && 
                                          row['actors'].split(',').indexOf(filters['actors'][i]) > -1
                                        
                                        }
                                        
                                        

                                          return ['actors'].reduce(function(pass, column) {
                                              return pass && (

                                                  !filters[column] ||


                                            aboolfilter

                                            
                                                  );
                                          }, true);
                                          })
                                          }


                                    if(typeof filters['techrole']!=='undefined'){
                                        data = data.filter(function(row) {
                                        
                                        var aboolfilter=true;
                                        for (i=0;i<filters['techrole'].length;i++){
                                          aboolfilter=aboolfilter && 
                                          row['techrole'].split(',').indexOf(filters['techrole'][i]) > -1
                                        
                                        }
                                        
                                        

                                          return ['techrole'].reduce(function(pass, column) {
                                              return pass && (

                                                  !filters[column] ||


                                            aboolfilter

                                            
                                                  );
                                          }, true);
                                          })
                                          }


                                  data1 = data.filter(function(row) {
                                          // run through all the filters, returning a boolean
                                          return ['Action','Comedy','Family','Adventure','Drama','Historical',
                                          'Music','Musical','Mystery','Biography','Fantasy','Sport',
                                          'War','Documentary','Western','Animation',
                                          'Crime','Horror','Romance','Thriller','SciFi','x','year']
                                        .reduce(function(pass, column) {
                                              return pass && (
                                                  // pass if no filter is set
                                                  !filters[column] ||
                                                      // pass if the row's value is equal to the filter
                                                      // (i.e. the filter is set to a string)
                                                      //row['Comedy'] === filters['Comedy'] &&
                                            //row['Action'] === filters['Action'] &&
                                            //row['Family'] === filters['Family']
                                            // else { return row['Comedy'] == filters['Comedy'];} 
                                            //row["op"] >= filters["op"] &&
                                            //row["op"] < filters["opu"] 
                                            filters[column].indexOf(row[column]) >= 0
                                            
                                            &&
                                            row["x"] > Math.floor(filters["lx"]) &&
                                            row["x"] < Math.floor(filters["lxu"]) 

                                            &&
                                           
                                            row["year"] >= Math.round(filters["ly"]) &&
                                            row["year"] <= Math.round(filters["lyu"]) 
                                                      // pass if the row's value is in an array of filter values
                                            
                                                  );
                                          }, true);
                                          })
                                        
                                          console.log(data1.length)


                                              data = data1.filter(function(row) {
                                          return ['op'].reduce(function(pass, column) {
                                              return pass && (
                                                  !filters[column] ||

                                          

                                            parseFloat(row['op']) >= parseFloat(filters['op']) &&
                                            parseFloat(row['op']) < parseFloat(filters['opu']) 

                                                  );
                                          }, true);
                                          })


                                  //end of filter data and data1
                                  /////////////////start of manipulation of data and data1
                                  ////////////
                                  ////////////
                                  ////////////



                                          var kword=[''];
                                        data.forEach(function(d){
                                          kword=kword+d.keywords;
                                        });
                                        
                                        
                                      function isBlank(str) {
                                      return (!str || /^\s*$/.test(str));
                                  }
                                        //console.log(typeof kword)
                                        if (isBlank(kword)){kword="No Similar Attributes"}
                                      
                                           kword.replace(",,",",")
                                          var kwarray = kword.split(",");
                                           
                                          // console.log(kwarray);
                                           
                                           var counts = {};
                                        kwarray.forEach(function(row) {
                                        counts[row] = counts.hasOwnProperty(row) ? counts[row] + 1 : 1;
                                        });
                                           
                                          var dict=counts;

                                          var items = Object.keys(dict).map(function(key) {
                                          return [key, dict[key]];
                                          });

                                          // Sort the array based on the second element
                                          items.sort(function(first, second) {
                                            return second[1] - first[1];
                                            });
                                          
                                          items=items.slice(0, 1000)
                                                var numcount=[];
                                        
                                            for (i in items){
                                            numcount[i]={'text':items[i][0],
                                                  'size':items[i][1]
                                            }
                                            
                                            };
                                            

                                            function isBigEnough(value) {
                                          return function(element, index, array) {
                                            return (element >= value);
                                              }
                                                }

                                  function isBlank(str) {
                                      return (!str || /^\s*$/.test(str));
                                  }

                                           
                                            //console.log(kwarray)
                                       
                                            
                                            var numcn=[];
                                            var numpercentage=[];
                                            var numpn;
                                          for(i=0;i<numcount.length;i++){
                                            var numdata=data1.filter(function (d){
                                          return d.keywords.match(numcount[i].text)})
                                            
                                            numdata.forEach(function(d){
                                            numcn.push(d.ap)
                                          }
                                          )
                                          

                                          
                                          numpn=numcn.filter(isBigEnough(50))
                                          numpercentage[i]={'keyword':numcount[i].text,'percent':Math.round(numpn.length*100/numcn.length)}
                                          
                                          numcn=[];
                                          
                                          }

                                             
                                        
                                           

                                          
                                          //for (i=0;i<numpercentage.length;i++){
                                            
                                          //}
                                        
                                          
                                          var fnum=numpercentage.filter(function (d){
                                          ///insert filters adjustment here
                                          return d.percent >= filters.kfr_min&& d.percent<=filters.kfr_max})



                                           var fnumd = [];
                                           for (var i in data){
                                              fnumd.push(data[i].keywords)

                                           }
                                            var temp_fnumd;
                                            
                                            for(i=0;i<data.length;i++){
                                              temp_fnumd=data[i].keywords.split(',');
                                              
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



                                             var ddd1=[];
                                            for (var i in data1){
                                              ddd1.push({})

                                            }
                                            for (var i in ddd1){
                                              ddd1[i].x=data1[i].x,
                                              ddd1[i].y=data1[i].y,
                                              ddd1[i].title=data1[i].title,
                                              ddd1[i].op=data1[i].op
                                              ddd1[i].ap=data1[i].ap

                                             //,ddd1[i].actors=data1[i].actors

                                            }

                                  ///////
                                  ///////
                                  ///////keyword elimination

                                  var kword=[''];
                                        fnumd.forEach(function(d){
                                          kword=kword+d;
                                        });
                                        
                                        
                                      function isBlank(str) {
                                      return (!str || /^\s*$/.test(str));
                                  }
                                        //console.log(typeof kword)
                                        if (isBlank(kword)){kword="Invalid Selection"}
                                      
                                      kword.replace(",,",",")
                                           
                                          var kwarray = kword.split(",");
                                           
                                          // console.log(kwarray);
                                           
                                           var counts = {};
                                        kwarray.forEach(function(row) {
                                        counts[row] = counts.hasOwnProperty(row) ? counts[row] + 1 : 1;
                                        });
                                           
                                          var dict=counts;

                                          var items = Object.keys(dict).map(function(key) {
                                          return [key, dict[key]];
                                          });

                                          // Sort the array based on the second element
                                          items.sort(function(first, second) {
                                            return second[1] - first[1];
                                            });
                                    
                                    
                                    
                                    
                                    
                                          var newcount=items.slice(0, 28);
                                      // Create a new array with only the first 5 items
                                      //  console.log(newcount);
                                        
                                            var summary=[];
                                            //summary[1]={'text':5},summary[2]='o'
                                            //var ite='';
                                            for (i in newcount){
                                            summary[i]={'text':newcount[i][0],
                                                  'size':newcount[i][1]
                                            }
                                            
                                            };
                                          
                                          
                                          
                                          var sdkw= [];
                                          for (var i in data1){
                                            sdkw.push(data1.keywords)

                                          }

                                            var temp_kw;
                                            
                                            for(i=0;i<data1.length;i++){
                                              temp_kw=data1[i].keywords.split(',');
                                              sdkw[i]="";
                                              for(ai=0;ai<summary.length;ai++){
                                                if(temp_kw.indexOf(summary[ai].text)>-1){
                                                
                                                sdkw[i]=sdkw[i]+summary[ai].text+',';
                                                
                                                }
                                              }
                                              
                                            }
                                            
                                            var dsdkw= fnumd;
                                            var dtemp_kw;
                                            
                                            
                                            for(var i in data){
                                              dtemp_kw=fnumd[i].split(',');

                                              dsdkw[i]="";
                                              for(var ai in summary){
                                                if(dtemp_kw.indexOf(summary[ai].text)>-1){
                                                
                                                dsdkw[i]=dsdkw[i]+summary[ai].text+',';

                                                
                                                }
                                              }
                                              
                                            }

                                              var ktcn=[];
                                            var ktpercentage=[];
                                            var ktpn;
                                          for(i=0;i<summary.length;i++){
                                            var kcgdata=data1.filter(function (d){
                                          return d.keywords.match(summary[i].text)})
                                            
                                            kcgdata.forEach(function(d){
                                           ktcn.push(d.ap)
                                          }
                                          )
                                          
                                          
                                          
                                          ktpn=ktcn.filter(isBigEnough(50))
                                          ktpercentage[i]={'keyword':summary[i].text,'percent':Math.round(ktpn.length*100/ktcn.length)}
                                          
                                          ktcn=[];
                                          
                                          }
                                  ///////////
                                  ///////////
                                  ///////////actor manipulation



                                  var akword;
                                        data.forEach(function(d){
                                          akword=akword+d.actors;
                                        });
                                        
                                        //console.log(akword)
                                        function isBlank(str) {
                                      return (!str || /^\s*$/.test(str));
                                  }
                                        //console.log(typeof kword)
                                        if (isBlank(akword)){akword="Invalid Selection"}
                                          
                                          akword.replace(",,",",")
                                           
                                          var akwarray = akword.split(",");
                                           
                                          // console.log(kwarray);
                                           
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
                                              temp_act=data1[i].actors.split(',');
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
                                              dtemp_act=data[i].actors.split(',');
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
                                          return d.actors.match(asummary[i].text)})
                                            
                                            tcgdata.forEach(function(d){
                                           tcn.push(d.ap)
                                          }
                                          )
                                          
                                          
                                          
                                          tpn=tcn.filter(isBigEnough(50))
                                          tpercentage[i]={'actor':asummary[i].text,'percent':Math.round(tpn.length*100/tcn.length)}
                                          
                                          tcn=[];
                                          
                                          }

                                  //////////////////////////director manip
                                  var dplist=[''];
                                        data.forEach(function(d){
                                          dplist=dplist+d.techrole;
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
                                          
                                          
                                          
                                          var sddp= [];
                                          for (var i in data1){
                                            sddp.push(data1.techrole)

                                          }


                                          var temp_dp;
                                            
                                            for(i=0;i<data1.length;i++){
                                              temp_dp=data1[i].techrole.split(',');
                                              sddp[i]="";
                                              for(ai=0;ai<dpsummary.length;ai++){
                                                if(temp_dp.indexOf(dpsummary[ai].text)>-1){
                                                
                                                sddp[i]=sddp[i]+dpsummary[ai].text+',';
                                                
                                                }
                                              }
                                              
                                            }
                                            
                                             var dsddp= [];
                                          for (var i in data){
                                            dsddp.push(data.techrole)

                                          }
                                            var dtemp_dp;
                                            
                                            for(i=0;i<data.length;i++){
                                              dtemp_dp=data[i].techrole.split(',');
                                              dsddp[i]="";
                                              for(ai=0;ai<dpsummary.length;ai++){
                                                if(dtemp_dp.indexOf(dpsummary[ai].text)>-1){
                                                
                                                dsddp[i]=dsddp[i]+dpsummary[ai].text+',';
                                                
                                                }
                                              }
                                              
                                            }

                                            var dptcn=[];
                                            var dptpercentage=[];
                                            var dptpn;
                                          for(i=0;i<dpsummary.length;i++){
                                            var dpcgdata=data1.filter(function (d){
                                          return d.techrole.match(dpsummary[i].text)})
                                            
                                            dpcgdata.forEach(function(d){
                                           dptcn.push(d.op)
                                          }
                                          )
                                          
                                          
                                          
                                          dptpn=dptcn.filter(isBigEnough(50))
                                          dptpercentage[i]={'techrole':dpsummary[i].text,'percent':Math.round(dptpn.length*100/dptcn.length)}
                                          
                                          dptcn=[];
                                          
                                          } 

                                          var worked_data={};



                                          worked_data.ddd=ddd


                                          worked_data.ddd1=ddd1
                                          worked_data.dsdkw=dsdkw


                                          worked_data.sdkw=sdkw
                                          worked_data.ktpercentage=ktpercentage
                                          worked_data.sum=summary

                                          worked_data.dsdactors=dsdactors


                                          worked_data.sdactors=sdactors
                                          worked_data.tpercentage=tpercentage
                                          worked_data.asum=asummary
                                          worked_data.dpdata=dsddp
                                          worked_data.sddp=sddp

                                          worked_data.dptpercentage=dptpercentage
                                          worked_data.dpsummary=dpsummary

                                          for(var i in summary){
                                              if(summary[i].text==""){summary.splice(i,1)}

                                          }

                                          for(var i in asummary){
                                              if(asummary[i].text==""){asummary.splice(i,1)}

                                          }

                                          for(var i in dpsummary){
                                              if(dpsummary[i].text==""){dpsummary.splice(i,1)}

                                          }


                                        return {ddd:ddd,ddd1:ddd1,dsdkw:dsdkw,sdkw:sdkw,ktpercentage:ktpercentage,
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
                                  
                                        user.local.notfinish=false
                                          user.save()

                                  };

                                  var f_d={filters:filters,data:data,data1:data1};

                                  fibo.postMessage(f_d)


}})

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

//  var current_usr=usrs[req.connection.remoteAddress];
//  if(usr_current_tries[current_usr]>usr_total_tries[current_usr]){
    

//  }
  else{
    user.local.notfinish=true
    user.save()

    
                                                          
                                                        filters=req.body;
                                                        var data=qubfull_data;
                                                        var data1=qubfull_data;



                                                      filters['keywords']=filters.keywords.split(',')
                                                      filters['actors']=filters.actors.split(',')
                                                      filters['techrole']=filters.techrole.split(',')
                                                      ////filter data and data1

                                                      console.log(filters)
                                                      //webworker
                                                      var fibo = new Worker(function(){
                                                        function fibo (f_data){


                                                      filters=f_data.filters
                                                      data=f_data.data
                                                      data1=f_data.data1

                                                      //console.log(data.length)

                                                      if(typeof filters['keywords']!=='undefined'){
                                                            data = data.filter(function(row) {
                                                            
                                                            var boolfilter=true;
                                                            for (i=0;i<filters['keywords'].length;i++){
                                                              boolfilter=boolfilter && 

                                                              


                                                              row['keywords'].split(',').indexOf(filters['keywords'][i])>-1

                                                              }

                                                              
                                                              return ['keywords'].reduce(function(pass, column) {
                                                                  return pass && (
                                                                   
                                                                      !filters[column] ||
                                                                         
                                                                boolfilter 
                                                                      );
                                                              }, true);
                                                              })
                                                              }



                                                       if(typeof filters['actors']!=='undefined'){
                                                            data = data.filter(function(row) {
                                                            
                                                            var aboolfilter=true;
                                                            for (i=0;i<filters['actors'].length;i++){
                                                              aboolfilter=aboolfilter && 
                                                              row['actors'].split(',').indexOf(filters['actors'][i]) > -1
                                                            
                                                            }
                                                            
                                                            

                                                              return ['actors'].reduce(function(pass, column) {
                                                                  return pass && (

                                                                      !filters[column] ||


                                                                aboolfilter

                                                                
                                                                      );
                                                              }, true);
                                                              })
                                                              }


                                                        if(typeof filters['techrole']!=='undefined'){
                                                            data = data.filter(function(row) {
                                                            
                                                            var aboolfilter=true;
                                                            for (i=0;i<filters['techrole'].length;i++){
                                                              aboolfilter=aboolfilter && 
                                                              row['techrole'].split(',').indexOf(filters['techrole'][i]) > -1
                                                            
                                                            }
                                                            
                                                            

                                                              return ['techrole'].reduce(function(pass, column) {
                                                                  return pass && (

                                                                      !filters[column] ||


                                                                aboolfilter

                                                                
                                                                      );
                                                              }, true);
                                                              })
                                                              }


                                                      data1 = data.filter(function(row) {
                                                              // run through all the filters, returning a boolean
                                                              return ['Action','Comedy','Family','Adventure','Drama','Historical',
                                                              'Music','Musical','Mystery','Biography','Fantasy','Sport',
                                                              'War','Documentary','Western','Animation',
                                                              'Crime','Horror','Romance','Thriller','SciFi','x','year']
                                                            .reduce(function(pass, column) {
                                                                  return pass && (
                                                                      // pass if no filter is set
                                                                      !filters[column] ||
                                                                          // pass if the row's value is equal to the filter
                                                                          // (i.e. the filter is set to a string)
                                                                          //row['Comedy'] === filters['Comedy'] &&
                                                                //row['Action'] === filters['Action'] &&
                                                                //row['Family'] === filters['Family']
                                                                // else { return row['Comedy'] == filters['Comedy'];} 
                                                                //row["op"] >= filters["op"] &&
                                                                //row["op"] < filters["opu"] 
                                                                filters[column].indexOf(row[column]) >= 0
                                                                
                                                                &&
                                                                row["x"] > Math.floor(filters["lx"]) &&
                                                                row["x"] < Math.floor(filters["lxu"]) 

                                                                &&
                                                               
                                                                row["year"] >= Math.round(filters["ly"]) &&
                                                                row["year"] <= Math.round(filters["lyu"]) 
                                                                          // pass if the row's value is in an array of filter values
                                                                
                                                                      );
                                                              }, true);
                                                              })
                                                            
                                                              console.log(data1.length)


                                                                  data = data1.filter(function(row) {
                                                              return ['op'].reduce(function(pass, column) {
                                                                  return pass && (
                                                                      !filters[column] ||

                                                              

                                                                parseFloat(row['op']) >= parseFloat(filters['op']) &&
                                                                parseFloat(row['op']) < parseFloat(filters['opu']) 

                                                                      );
                                                              }, true);
                                                              })


                                                      //end of filter data and data1
                                                      /////////////////start of manipulation of data and data1
                                                      ////////////
                                                      ////////////
                                                      ////////////



                                                              var kword=[''];
                                                            data.forEach(function(d){
                                                              kword=kword+d.keywords;
                                                            });
                                                            
                                                            
                                                          function isBlank(str) {
                                                          return (!str || /^\s*$/.test(str));
                                                      }
                                                            //console.log(typeof kword)
                                                            if (isBlank(kword)){kword="No Similar Attributes"}
                                                          
                                                               kword.replace(",,",",")
                                                              var kwarray = kword.split(",");
                                                               
                                                              // console.log(kwarray);
                                                               
                                                               var counts = {};
                                                            kwarray.forEach(function(row) {
                                                            counts[row] = counts.hasOwnProperty(row) ? counts[row] + 1 : 1;
                                                            });
                                                               
                                                              var dict=counts;

                                                              var items = Object.keys(dict).map(function(key) {
                                                              return [key, dict[key]];
                                                              });

                                                              // Sort the array based on the second element
                                                              items.sort(function(first, second) {
                                                                return second[1] - first[1];
                                                                });
                                                              
                                                              items=items.slice(0, 1000)
                                                                    var numcount=[];
                                                            
                                                                for (i in items){
                                                                numcount[i]={'text':items[i][0],
                                                                      'size':items[i][1]
                                                                }
                                                                
                                                                };
                                                                

                                                                function isBigEnough(value) {
                                                              return function(element, index, array) {
                                                                return (element >= value);
                                                                  }
                                                                    }

                                                      function isBlank(str) {
                                                          return (!str || /^\s*$/.test(str));
                                                      }

                                                               
                                                                //console.log(kwarray)
                                                           
                                                                
                                                                var numcn=[];
                                                                var numpercentage=[];
                                                                var numpn;
                                                              for(i=0;i<numcount.length;i++){
                                                                var numdata=data1.filter(function (d){
                                                              return d.keywords.match(numcount[i].text)})
                                                                
                                                                numdata.forEach(function(d){
                                                                numcn.push(d.ap)
                                                              }
                                                              )
                                                              

                                                              
                                                              numpn=numcn.filter(isBigEnough(50))
                                                              numpercentage[i]={'keyword':numcount[i].text,'percent':Math.round(numpn.length*100/numcn.length)}
                                                              
                                                              numcn=[];
                                                              
                                                              }

                                                                 
                                                            
                                                               

                                                              
                                                              //for (i=0;i<numpercentage.length;i++){
                                                                
                                                              //}
                                                            
                                                              
                                                              var fnum=numpercentage.filter(function (d){
                                                              ///insert filters adjustment here
                                                              return d.percent >= filters.kfr_min&& d.percent<=filters.kfr_max})



                                                               var fnumd = [];
                                                               for (var i in data){
                                                                  fnumd.push(data[i].keywords)

                                                               }
                                                                var temp_fnumd;
                                                                
                                                                for(i=0;i<data.length;i++){
                                                                  temp_fnumd=data[i].keywords.split(',');
                                                                  
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



                                                                 var ddd1=[];
                                                                for (var i in data1){
                                                                  ddd1.push({})

                                                                }
                                                                for (var i in ddd1){
                                                                  ddd1[i].x=data1[i].x,
                                                                  ddd1[i].y=data1[i].y,
                                                                  ddd1[i].title=data1[i].title,
                                                                  ddd1[i].op=data1[i].op
                                                                  ddd1[i].ap=data1[i].ap

                                                                 //,ddd1[i].actors=data1[i].actors

                                                                }

                                                      ///////
                                                      ///////
                                                      ///////keyword elimination

                                                      var kword=[''];
                                                            fnumd.forEach(function(d){
                                                              kword=kword+d;
                                                            });
                                                            
                                                            
                                                          function isBlank(str) {
                                                          return (!str || /^\s*$/.test(str));
                                                      }
                                                            //console.log(typeof kword)
                                                            if (isBlank(kword)){kword="Invalid Selection"}
                                                          
                                                          kword.replace(",,",",")
                                                               
                                                              var kwarray = kword.split(",");
                                                               
                                                              // console.log(kwarray);
                                                               
                                                               var counts = {};
                                                            kwarray.forEach(function(row) {
                                                            counts[row] = counts.hasOwnProperty(row) ? counts[row] + 1 : 1;
                                                            });
                                                               
                                                              var dict=counts;

                                                              var items = Object.keys(dict).map(function(key) {
                                                              return [key, dict[key]];
                                                              });

                                                              // Sort the array based on the second element
                                                              items.sort(function(first, second) {
                                                                return second[1] - first[1];
                                                                });
                                                        
                                                        
                                                        
                                                        
                                                        
                                                              var newcount=items.slice(0, 28);
                                                          // Create a new array with only the first 5 items
                                                          //  console.log(newcount);
                                                            
                                                                var summary=[];
                                                                //summary[1]={'text':5},summary[2]='o'
                                                                //var ite='';
                                                                for (i in newcount){
                                                                summary[i]={'text':newcount[i][0],
                                                                      'size':newcount[i][1]
                                                                }
                                                                
                                                                };
                                                              
                                                              
                                                              
                                                              var sdkw= [];
                                                              for (var i in data1){
                                                                sdkw.push(data1.keywords)

                                                              }

                                                                var temp_kw;
                                                                
                                                                for(i=0;i<data1.length;i++){
                                                                  temp_kw=data1[i].keywords.split(',');
                                                                  sdkw[i]="";
                                                                  for(ai=0;ai<summary.length;ai++){
                                                                    if(temp_kw.indexOf(summary[ai].text)>-1){
                                                                    
                                                                    sdkw[i]=sdkw[i]+summary[ai].text+',';
                                                                    
                                                                    }
                                                                  }
                                                                  
                                                                }
                                                                
                                                                var dsdkw= fnumd;
                                                                var dtemp_kw;
                                                                
                                                                
                                                                for(var i in data){
                                                                  dtemp_kw=fnumd[i].split(',');

                                                                  dsdkw[i]="";
                                                                  for(var ai in summary){
                                                                    if(dtemp_kw.indexOf(summary[ai].text)>-1){
                                                                    
                                                                    dsdkw[i]=dsdkw[i]+summary[ai].text+',';

                                                                    
                                                                    }
                                                                  }
                                                                  
                                                                }

                                                                  var ktcn=[];
                                                                var ktpercentage=[];
                                                                var ktpn;
                                                              for(i=0;i<summary.length;i++){
                                                                var kcgdata=data1.filter(function (d){
                                                              return d.keywords.match(summary[i].text)})
                                                                
                                                                kcgdata.forEach(function(d){
                                                               ktcn.push(d.ap)
                                                              }
                                                              )
                                                              
                                                              
                                                              
                                                              ktpn=ktcn.filter(isBigEnough(50))
                                                              ktpercentage[i]={'keyword':summary[i].text,'percent':Math.round(ktpn.length*100/ktcn.length)}
                                                              
                                                              ktcn=[];
                                                              
                                                              }
                                                      ///////////
                                                      ///////////
                                                      ///////////actor manipulation



                                                      var akword;
                                                            data.forEach(function(d){
                                                              akword=akword+d.actors;
                                                            });
                                                            
                                                            //console.log(akword)
                                                            function isBlank(str) {
                                                          return (!str || /^\s*$/.test(str));
                                                      }
                                                            //console.log(typeof kword)
                                                            if (isBlank(akword)){akword="Invalid Selection"}
                                                              
                                                              akword.replace(",,",",")
                                                               
                                                              var akwarray = akword.split(",");
                                                               
                                                              // console.log(kwarray);
                                                               
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
                                                                  temp_act=data1[i].actors.split(',');
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
                                                                  dtemp_act=data[i].actors.split(',');
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
                                                              return d.actors.match(asummary[i].text)})
                                                                
                                                                tcgdata.forEach(function(d){
                                                               tcn.push(d.ap)
                                                              }
                                                              )
                                                              
                                                              
                                                              
                                                              tpn=tcn.filter(isBigEnough(50))
                                                              tpercentage[i]={'actor':asummary[i].text,'percent':Math.round(tpn.length*100/tcn.length)}
                                                              
                                                              tcn=[];
                                                              
                                                              }

                                                      //////////////////////////director manip
                                                      var dplist=[''];
                                                            data.forEach(function(d){
                                                              dplist=dplist+d.techrole;
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
                                                              
                                                              
                                                              
                                                              var sddp= [];
                                                              for (var i in data1){
                                                                sddp.push(data1.techrole)

                                                              }


                                                              var temp_dp;
                                                                
                                                                for(i=0;i<data1.length;i++){
                                                                  temp_dp=data1[i].techrole.split(',');
                                                                  sddp[i]="";
                                                                  for(ai=0;ai<dpsummary.length;ai++){
                                                                    if(temp_dp.indexOf(dpsummary[ai].text)>-1){
                                                                    
                                                                    sddp[i]=sddp[i]+dpsummary[ai].text+',';
                                                                    
                                                                    }
                                                                  }
                                                                  
                                                                }
                                                                
                                                                 var dsddp= [];
                                                              for (var i in data){
                                                                dsddp.push(data.techrole)

                                                              }
                                                                var dtemp_dp;
                                                                
                                                                for(i=0;i<data.length;i++){
                                                                  dtemp_dp=data[i].techrole.split(',');
                                                                  dsddp[i]="";
                                                                  for(ai=0;ai<dpsummary.length;ai++){
                                                                    if(dtemp_dp.indexOf(dpsummary[ai].text)>-1){
                                                                    
                                                                    dsddp[i]=dsddp[i]+dpsummary[ai].text+',';
                                                                    
                                                                    }
                                                                  }
                                                                  
                                                                }

                                                                var dptcn=[];
                                                                var dptpercentage=[];
                                                                var dptpn;
                                                              for(i=0;i<dpsummary.length;i++){
                                                                var dpcgdata=data1.filter(function (d){
                                                              return d.techrole.match(dpsummary[i].text)})
                                                                
                                                                dpcgdata.forEach(function(d){
                                                               dptcn.push(d.op)
                                                              }
                                                              )
                                                              
                                                              
                                                              
                                                              dptpn=dptcn.filter(isBigEnough(50))
                                                              dptpercentage[i]={'techrole':dpsummary[i].text,'percent':Math.round(dptpn.length*100/dptcn.length)}
                                                              
                                                              dptcn=[];
                                                              
                                                              } 

                                                              var worked_data={};



                                                              worked_data.ddd=ddd


                                                              worked_data.ddd1=ddd1
                                                              worked_data.dsdkw=dsdkw


                                                              worked_data.sdkw=sdkw
                                                              worked_data.ktpercentage=ktpercentage
                                                              worked_data.sum=summary

                                                              worked_data.dsdactors=dsdactors


                                                              worked_data.sdactors=sdactors
                                                              worked_data.tpercentage=tpercentage
                                                              worked_data.asum=asummary
                                                              worked_data.dpdata=dsddp
                                                              worked_data.sddp=sddp

                                                              worked_data.dptpercentage=dptpercentage
                                                              worked_data.dpsummary=dpsummary

                                                              for(var i in summary){
                                                                  if(summary[i].text==""){summary.splice(i,1)}

                                                              }

                                                              for(var i in asummary){
                                                                  if(asummary[i].text==""){asummary.splice(i,1)}

                                                              }

                                                              for(var i in dpsummary){
                                                                  if(dpsummary[i].text==""){dpsummary.splice(i,1)}

                                                              }
                                                            console.log(ktpercentage)

                                                            return {ddd:ddd,ddd1:ddd1,dsdkw:dsdkw,sdkw:sdkw,ktpercentage:ktpercentage,
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
                                                      

                                                            user.local.notfinish=false
                                                            user.save()
                                                      };

                                                      var f_d={filters:filters,data:data,data1:data1};

                                                      fibo.postMessage(f_d)


}})

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
