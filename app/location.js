process.on('message',function(gdata){

	var fquery=[]


  titles=gdata.titles
  for (i in titles){
    fquery.push({"title":titles[i]})
  }

//console.log(gdata)



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
      db.collection('new_location', function(err, collection) {
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




getdata = function(dquery, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('location', function(err, collection) {
        if (!err) {
          collection.find({$or:
            dquery[0]
            },dquery[1]).toArray(function(err, docs) {
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



getDemoData = function(dquery, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('demo', function(err, collection) {
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


getcpl = function(dquery, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('cpl', function(err, collection) {
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


getjob = function(dquery, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('job', function(err, collection) {
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


getincome = function(dquery, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('hincome', function(err, collection) {
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


getpurchase = function(dquery, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('purchase', function(err, collection) {
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

getdata1(fquery,function(data1kw){
  //process.send({})


    var cutoff=[]
  for (i in data1kw){
    if (data1kw[i]['summary'].length <30){
      cutoff.push([i])
    }
  }

  for (i in cutoff){
    data1kw.splice(cutoff[i],1)
  }
 // console.log(cutoff)
  var data=[]

  for (i in data1kw){
    data.push(data1kw[i]['summary'])
  }



  var merged = [].concat.apply([], data)

//  console.log(merged.length)

function foo(arr) {
    var a = [], b = [], prev;
    
    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }
    
    return [a, b];
}

var result = foo(merged);

//console.log(result)
m=data1kw.length



check=[]
for (i in result[1]){
  if (result[1][i]>=1){
 //   result[0].splice(i,1)

    check.push(result[0][i])

  }
}
a_title=[]
//console.log(m)

//console.log(data1kw[2].title)

for (var i =0; i<m;i++){
  a_title.push(data1kw[i].title)
}

res_data={}
res_loc_data={}
aud_total=0


for (i in check) {
  aud_ratio_total=0
  dif_ratio_total=0
  dif_total=0
  city_name=check[i].replace(".","_")
  city_m=m

  ifcounter=0
  
  for (j in data1kw){
  //  console.log(data1kw[j])
  // console.log(city_name)
  try{
    aud_total+=data1kw[j][city_name]["aud_total"]
    aud_ratio_total+=data1kw[j][city_name]["aud_ratio"]
    dif_ratio_total+=data1kw[j][city_name]["dif_ratio"]
    dif_total+=data1kw[j][city_name]["dif"]
    ifcounter +=1
  }
  catch(err) {
    //city_m=city_m-1


  }
    //console.log(city_name)
    //console.log(aud_ratio_total)
  }
  avg_aud_ratio=Math.round(aud_ratio_total/city_m*1000000)/1000000
  avg_dif_ratio=Math.round(dif_ratio_total/city_m*10000)/10000
  avg_dif=Math.round(dif_total/city_m*10000)/10000
 // console.log(m)
 
 if(ifcounter>3){

  res_loc_data[city_name]={"aud_ratio":avg_aud_ratio,"dif":avg_dif,"dif_ratio":avg_dif_ratio

  }
}


}

//console.log(ifcounter)

avg_aud=Math.round(aud_total*1)/1
res_aud_total=Math.round(aud_total*1)/1


res_data['location_data']=res_loc_data
res_data['avg_data']=avg_aud
res_data['aud_total']=m
res_data['a_title']=a_title

//console.log(res_loc_data)

//console.log(res_data['a_title'])


//demo data starts
getDemoData(fquery,function(demo_data){

  //console.log(demo_data)
  demo_m=demo_data.length

//console.log(demo_m)
  men_18=0
  men_25=0
  men_35=0
  men_45=0
  men_55=0
  men_65=0

  women_18=0
  women_25=0
  women_35=0
  women_45=0
  women_55=0
  women_65=0

  demo_total=0


  men_ratio=0
  women_ratio=0


  d_titles=[]

  for (var i in demo_data){
    men_18+=demo_data[i]["men_18_24_ratio"]
    men_25+=demo_data[i]["men_25_34_ratio"]
    men_35+=demo_data[i]["men_34_44_ratio"]
    men_45+=demo_data[i]["men_44_54_ratio"]
    men_55+=demo_data[i]["men_55_64_ratio"]
    men_65+=demo_data[i]["men_65_ratio"]

    women_18+=demo_data[i]["women_18_24_ratio"]
    women_25+=demo_data[i]["women_25_34_ratio"]
    women_35+=demo_data[i]["women_34_44_ratio"]
    women_45+=demo_data[i]["women_44_54_ratio"]
    women_55+=demo_data[i]["women_55_64_ratio"]
    women_65+=demo_data[i]["women_65_ratio"]


    men_ratio+=demo_data[i]["men_ratio"]



    women_ratio+=demo_data[i]["women_ratio"]

   // console.log(men_ratio)
   // console.log(women_ratio)

    if(demo_data[i]["men_ratio"] ==0 | demo_data[i]["women_ratio"] ==0){
      demo_m=demo_m-1

    }

    demo_total+=demo_data[i]["total"]

    d_titles.push(demo_data[i]['title'])


  }



//console.log(demo_m)
  send_demo_data={
                "total":demo_total,
              
               "women_ratio":women_ratio/demo_m,
               "men_ratio":men_ratio/demo_m,
               
              
             
               "women 18 to 24":women_18/demo_m,
               "women 25 to 34":women_25/demo_m,
               "women 35 to 44":women_35/demo_m,
               "women 45 to 54":women_45/demo_m,
               "women 55 to 64":women_55/demo_m,
               "women 65 and over":women_65/demo_m,
               "men 18 to 24":men_18/demo_m,
               "men 25 to 34":men_25/demo_m,
               "men 35 to 44":men_35/demo_m,
               "men 45 to 54":men_45/demo_m,
               "men 55 to 64":men_55/demo_m,
               "men 65 and over":men_65/demo_m,
               "titles":d_titles





  }



//console.log(send_demo_data)

  res_data['demo_data']=send_demo_data




  getcpl(fquery,function(cpl_data){
    cplm=cpl_data.length

    people="People/Groups"
    tv="TV Channel/Network"
    cb="Brand/Company"
    ce="Culture/Entertainment"
    inter="Interest"
    ot="Others"

  //  console.log(cpl_data)
    people_dict={}
    for (i in cpl_data){
      try{
        people_list=cpl_data[i][people]
      // console.log(people_list)
      // console.log(t)
        if(typeof people_list == "undefined"){}
        else{
        for (j in people_list){
          if(people_list[j]['item_name'] in people_dict){
          // console.log(people_list[j]['aud_ratio'])
            people_dict[people_list[j]['item_name']]=people_dict[people_list[j]['item_name']]+people_list[j]['aud_ratio']
          }

          else{
          //  console.log("only this")
            people_dict[people_list[j]['item_name']]=people_list[j]['aud_ratio']
          }
        }
}
      }
      catch(err){}

    }

 //   console.log(people_dict)

 people_send_list=[]
 for (i in people_dict){
  people_send_list.push([i,people_dict[i]/cplm])
 }








tv_dict={}
    for (i in cpl_data){
      try{
        tv_list=cpl_data[i][tv]
      // console.log(people_list)
      // console.log(t)
        if(typeof tv_list == "undefined"){}
        else{
        for (j in tv_list){
          if(tv_list[j]['item_name'] in tv_dict){
          // console.log(people_list[j]['aud_ratio'])
            tv_dict[tv_list[j]['item_name']]=tv_dict[tv_list[j]['item_name']]+tv_list[j]['aud_ratio']
          }

          else{
          //  console.log("only this")
            tv_dict[tv_list[j]['item_name']]=tv_list[j]['aud_ratio']
          }
        }
}
      }
      catch(err){}

    }

 //   console.log(people_dict)

 tv_send_list=[]
 for (i in tv_dict){
  tv_send_list.push([i,tv_dict[i]/cplm])
 }






cb_dict={}
    for (i in cpl_data){
      try{
        cb_list=cpl_data[i][cb]
     //  console.log(cb_list)
      // console.log(t)
        if(typeof cb_list == "undefined"){}
        else{
        for (j in cb_list){
          if(cb_list[j]['item_name'] in cb_dict){
          // console.log(people_list[j]['aud_ratio'])
            cb_dict[cb_list[j]['item_name']]=cb_dict[cb_list[j]['item_name']]+cb_list[j]['aud_ratio']
          }

          else{
          //  console.log("only this")
            cb_dict[cb_list[j]['item_name']]=cb_list[j]['aud_ratio']
          }
        }
}
      }
      catch(err){}

    }

 //   console.log(people_dict)

 cb_send_list=[]
 for (i in cb_dict){
  cb_send_list.push([i,cb_dict[i]/cplm])
 }



ce_dict={}
    for (i in cpl_data){
      try{
        ce_list=cpl_data[i][ce]
     //  console.log(cb_list)
      // console.log(t)
        if(typeof ce_list == "undefined"){}
        else{
        for (j in ce_list){
          if(ce_list[j]['item_name'] in ce_dict){
          // console.log(people_list[j]['aud_ratio'])
            ce_dict[ce_list[j]['item_name']]=ce_dict[ce_list[j]['item_name']]+ce_list[j]['aud_ratio']
          }

          else{
          //  console.log("only this")
            ce_dict[ce_list[j]['item_name']]=ce_list[j]['aud_ratio']
          }
        }
}
      }
      catch(err){}

    }

 //   console.log(people_dict)

 ce_send_list=[]
 for (i in ce_dict){
  ce_send_list.push([i,ce_dict[i]/cplm])
 }



 inter_dict={}
    for (i in cpl_data){
      try{
        inter_list=cpl_data[i][inter]
     //  console.log(cb_list)
      // console.log(t)
        if(typeof inter_list == "undefined"){}
        else{
        for (j in inter_list){
          if(inter_list[j]['item_name'] in inter_dict){
          // console.log(people_list[j]['aud_ratio'])
            inter_dict[inter_list[j]['item_name']]=inter_dict[inter_list[j]['item_name']]+inter_list[j]['aud_ratio']
          }

          else{
          //  console.log("only this")
            inter_dict[inter_list[j]['item_name']]=inter_list[j]['aud_ratio']
          }
        }
}
      }
      catch(err){}

    }

 //   console.log(people_dict)

 inter_send_list=[]
 for (i in inter_dict){
  inter_send_list.push([i,inter_dict[i]/cplm])
 }





 ot_dict={}
    for (i in cpl_data){
      try{
        ot_list=cpl_data[i][ot]
     //  console.log(cb_list)
      // console.log(t)
        if(typeof ot_list == "undefined"){}
        else{
        for (j in ot_list){
          if(ot_list[j]['item_name'] in ot_dict){
          // console.log(people_list[j]['aud_ratio'])
            ot_dict[ot_list[j]['item_name']]=ot_dict[ot_list[j]['item_name']]+ot_list[j]['aud_ratio']
          }

          else{
          //  console.log("only this")
            ot_dict[ot_list[j]['item_name']]=ot_list[j]['aud_ratio']
          }
        }
}
      }
      catch(err){}

    }

 //   console.log(people_dict)

 ot_send_list=[]
 for (i in ot_dict){
  ot_send_list.push([i,ot_dict[i]/cplm])
 }





res_data['people_list']=people_send_list
res_data['tv_list']=tv_send_list
res_data['cb_list']=cb_send_list

res_data["ce_list"]=ce_send_list
res_data["inter_list"]=inter_send_list
res_data["ot_list"]=ot_send_list

//console.log(cb_dict)
//console.log(tv_send_list)
    //People/Groups Brand/Company Interest  TV Channel/Network  Culture/Entertainment Others
getjob(fquery,function(job_data){ 
  job_m=job_data.length

  job_dict={}

  for(i in job_data){
    for (j in job_data[i]){
        if (j!="title" & j!="summary" &j!="_id"){
          if(j in job_dict){
            job_dict[j]+=job_data[i][j]['aud_ratio']
          }
          else{
            job_dict[j]=job_data[i][j]['aud_ratio']
          }
        }

    }
  }


    jb_total=0

  for (i in job_dict){
    jb_total+=job_dict[i]
  }


  job_send_list=[]
 for (i in job_dict){

  job_send_list.push([i.replace("Sales","Retail/Sales/Marketing").replace("Administrative","Office Job").replace(" and ","/").replace("Production","Factory/Production"),job_dict[i]/jb_total])
 }

res_data["job_data"]=job_send_list


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};



getincome(fquery,function(income_data){ 
  income_m=income_data.length

  income_dict={}

  for(i in income_data){
    for (j in income_data[i]){
        if (j!="title" & j!="summary" &j!="_id"){
          if(j in income_dict){
            income_dict[j.replaceAll("_","$")]+=income_data[i][j]['aud_ratio']
          }
          else{
            income_dict[j.replaceAll("_","$")]=income_data[i][j]['aud_ratio']
          }
        }

    }
  }
 



res_data["income_data"]=income_dict


getpurchase(fquery,function(purchase_data){ 

  pur_m=purchase_data.length

  pur_dict={}

  for(i in purchase_data){
    for (j in purchase_data[i]){
        if (j!="title" & j!="summary" &j!="_id"){
          if(j in pur_dict){
            pur_dict[j.replaceAll("_","$")]+=purchase_data[i][j]['aud_ratio']
          }
          else{
            pur_dict[j.replaceAll("_","$")]=purchase_data[i][j]['aud_ratio']
          }
        }

    }
  }


  pur_total=0

  for (i in pur_dict){
    pur_total+=pur_dict[i]
  }


 pur_send_list=[]
 for (i in pur_dict){
  pur_send_list.push([i.replace(" and ","/").replace("drink","Beverage").replace("purchases","").replace("products",""),pur_dict[i]/pur_total])
 }


res_data["pur_data"]=pur_send_list


//console.log(res_data)




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


})





})