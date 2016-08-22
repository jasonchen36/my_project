process.on('message',function(gdata){


String.prototype.replaceAll = function(search, replacement) {
                var target = this;
                return target.replace(new RegExp(search, 'g'), replacement);
            };


	var fquery=[]


  titles=gdata.titles.replaceAll("xXandXx","&").split("|||")

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


getdata = function(dquery, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('foreign_breakdown', function(err, collection) {
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




getdata(fquery,function(data){

 // console.log(data)
  //process.send({})


   res_data={}

   total_ratio={}
   total_ratio_counter={}
   total_abs={}
   total_abs_counter={}


   function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

   for (i in data){
    title=data[i]
    //console.log(title)
    for (j in title){
      region=title[j]

      if(j != "foreign_total" && j !="title"){
        if (j in total_ratio){
          if ('ratio' in region && isNumeric(region['ratio']) ){
          total_ratio[j]+=region['ratio']
          total_ratio_counter[j]+=1
          total_abs[j]+=region['total']
          total_abs_counter[j]+=1
        }
        }
        else {
          if ('ratio' in region && isNumeric(region['ratio'])) {
          total_ratio[j]=region['ratio']
          total_ratio_counter[j]=1
          total_abs[j]=region['total']
          total_abs_counter[j]=1
        }
        }


      }
    }
   }

   //console.log(total_ratio)

   average_ratio={}
   for (i in total_ratio){
    if(total_ratio_counter[i]>3){
    average_ratio[i]=total_ratio[i]/total_ratio_counter[i]}
   }

   average_total_ratio={}
   for (i in total_abs){
    if(total_abs_counter[i]>3){
    average_total_ratio[i]=total_abs[i]/total_abs_counter[i]}
   }




   var sortable = [];
for (var vehicle in average_ratio)
      sortable.push([vehicle, average_ratio[vehicle]])
sortable.sort(function(a, b) {return b[1] - a[1]})


var sortable_abs = [];
for (var vehicle in average_total_ratio)
      sortable_abs.push([vehicle, average_total_ratio[vehicle]])
sortable_abs.sort(function(a, b) {return b[1] - a[1]})

  // console.log(average_ratio)

//res_data["pur_data"]=pur_send_list


//console.log(sortable_abs)

res_data['avg_ratio']=sortable

res_data['avg_total']=average_total_ratio



process.send({
  //location_data
  res_data:res_data
  //demo_data
      })







})

})