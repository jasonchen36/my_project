process.on('message',function(gdata){

	var fquery=gdata.fquery
	var dquery=gdata.dquery
	var filters=gdata.filters
	






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
      db.collection('imovies', function(err, collection) {
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




        var totalnum=data1.length
        var totalap=0
        for(i in data1){
          totalap+=data1[i].ap
        }
        //var total_stat=totalap/totalnum
      //  console.log(filters.keywordsor1)

        //console.log(odata)

      //  console.log(filters.keywordsor1[0]=='')

      //  odata.push({"_id":"asdfa"})
   //         console.log(filters)
/*
      for(i in filters.keywordsor1){
        filters.keywordsor1[i]=escape(String(filters.keywordsor1[i]))
      }
      */

    //  console.log(filters.keywordsor1)

      var or1=filters.keywordsor1.join(' or ')
      var or2=filters.keywordsor2.join(' or ')


        if(filters.keywordsor1[0]!=''){
          odata.push({'_id':or1,'number':totalnum})
        }


        //console.log(odata)

        if(filters.keywordsor1[0]!=''){
          data1kw.push({'_id':or1,'number':totalnum,'apsum':totalap})
        }



        if(filters.keywordsor2[0]!=''){
          odata.push({'_id':or2,'number':totalnum})
        }


        //console.log(odata)

        if(filters.keywordsor2[0]!=''){
          data1kw.push({'_id':or2,'number':totalnum,'apsum':totalap})
        }



                                 // console.log(data[0])
                                        ///
                                        //webworker
                                   



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


                                                                                        if(filters.keywordsor1[0]!=''){
                                                                                                                      for (i in fnumd){
                                                                                                                        fnumd[i]+=or1+","
                                                                                                                      }}



                                                                                                                      if(filters.keywordsor2[0]!=''){
                                                                                                                      for (i in fnumd){
                                                                                                                        fnumd[i]+=or2+","
                                                                                                                      }}

                                                                                        


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


                    //                  console.log(fnum)        
                                              




process.send({ddd:ddd,ddd1:ddd,dsdkw:fnumd,sdkw:fnumd,ktpercentage:fnum,
                                                      sum:summary,dsdactors:dsdactors,sdactors:sdactors,tpercentage:tpercentage,
                                                      asummary:asummary,dsddp:dsddp,sddp:sddp,dptpercentage:dptpercentage,
                                                      dpsummary:dpsummary})

   })})})})







})