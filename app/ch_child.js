process.on('message',function(gdata){

//console.log(gdata)
	var fquery=[]

  titles=gdata.fquery.actors.split(",")
  for (i in titles){
    fquery.push({"name":titles[i]})
  }

//console.log(fquery)



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


getdata1 = function(dquery, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('non_chinese_actor_bo', function(err, collection) {
        if (!err) {
          collection.find({$or:
            dquery
            }).toArray(function(err, docs) {
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



getbr = function(dquery, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('non_chinese_actor_bobr', function(err, collection) {
        if (!err) {
          collection.find({$or:
            dquery
            }).toArray(function(err, docs) {
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

getms = function(dquery, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('n_ch_ms', function(err, collection) {
        if (!err) {
          collection.find({$or:
            dquery
            }).toArray(function(err, docs) {
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


getmsbr = function(dquery, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('n_ch_ms_br', function(err, collection) {
        if (!err) {
          collection.find({$or:
            dquery
            }).toArray(function(err, docs) {
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

/*
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




       




process.send({ddd:ddd,ddd1:ddd,dsdkw:fnumd,sdkw:fnumd,ktpercentage:fnum,
                                                      sum:summary,dsdactors:dsdactors,sdactors:sdactors,tpercentage:tpercentage,
                                                      asummary:asummary,dsddp:dsddp,sddp:sddp,dptpercentage:dptpercentage,
                                                      dpsummary:dpsummary})

	 })})})})

*/

getdata1(fquery,function(data_bo){
  getbr(fquery,function(data_br){ 
    getms(fquery,function(data_ms){ 
      getmsbr(fquery,function(data_ms_br) {
  //process.send({})

//console.log(data_bo)

//console.log(data_br)

data_bbo={}
for (i in data_bo){
  if(data_bo[i]['name'] in data_bbo){

  }
    else{
  data_bbo[data_bo[i]['name']]=data_bo[i]['bo']}
}


bo_d=[]
for (i in data_bbo){

  bo_d.push([i,data_bbo[i]])
}





res_data={}

res_data["data_bo"]=bo_d





d_br={}

for (i in data_br){
  if (data_br[i]['name'] in d_br){}

  else{
  films=[]
  for (j in data_br[i]['film']){
    films.push([data_br[i]['film'][j]['title'],data_br[i]['film'][j]['bo']])
  }
  d_br[data_br[i]['name']]=films
}
}

//console.log(d_br)

res_data["d_br"]=d_br

//console.log(res_data)

d_ums={}
for (i in data_ms){
 // console.log(i)
  if (data_ms[i]['name'] in d_ums){ }
  else{
  d_ums[data_ms[i]['name']]=data_ms[i]['bos']}
}

d_ms=[]
for (i in d_ums){
  d_ms.push([i,d_ums[i]])
}

//console.log(d_ms)


res_data['d_ms']=d_ms




///////////////avg


data_bbo_avg={}
for (i in data_bo){
  if (data_bo[i]['name'] in data_bbo_avg){}

  else{
  data_bbo_avg[data_bo[i]['name']]=data_bo[i]['bo_n']}
}

d_bo_avg=[]
for (i in data_bbo){

  d_bo_avg.push([i,data_bbo[i]/data_bbo_avg[i]])
}

res_data['d_bo_avg']=d_bo_avg




d_ms_avg=[]
for (i in data_ms){
  d_ms_avg.push([data_ms[i]['name'],data_ms[i]['bos']/data_ms[i]['bos_n']])
}

//console.log(d_ms_avg)

res_data['d_ms_avg']=d_ms_avg




/////ms_br

d_ms_br={}

for (i in data_ms_br){
  if (data_ms_br[i]['name'] in d_ms_br){}

  else{
  films=[]
  for (j in data_ms_br[i]['film']){
    films.push([data_ms_br[i]['film'][j]['title'],data_ms_br[i]['film'][j]['bo']])
  }
  d_ms_br[data_ms_br[i]['name']]=films
}
}

//console.log(d_br)

res_data["d_ms_br"]=d_ms_br




process.send({
  //location_data
  res_data:res_data
  //demo_data
      })


})

})

})

})






})