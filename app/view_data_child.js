process.on('message',function(gdata){

	//console.log(gdata.url.url)


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

  var the_url=gdata.url.url

getdata = function(dquery, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('saved_data', function(err, collection) {
        if (!err) {
          collection.find({file_url:
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

getdata(the_url,function(data){


  //console.log(data)

      process.send({
  //location_data
  res_data:data
  //demo_data
      })
})
  

})