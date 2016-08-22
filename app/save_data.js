process.on('message',function(gdata){

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





findurl = function(dquery, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('saved_data', function(err, collection) {
        if (!err) {
          collection.find({
            
            },{'file_url':1}).toArray(function(err, docs) {
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

findurl({},function(data1kw){

  console.log(data1kw)

              user=gdata.user

all_url=[]
for (i in data1kw){
  all_url.push(data1kw[i]['file_url'])
}
var file_url=""

require('crypto').randomBytes(48, function(err, buffer) {
  file_url = buffer.toString('hex');

      while (all_url.indexOf(file_url) <-1){
        file_url = buffer.toString('hex');
      }
   //   console.log('jump1')

      if (all_url.indexOf(file_url) <-1){

        file_url = buffer.toString('hex');

      }

      else if (all_url.indexOf(file_url) <-1){

        file_url = buffer.toString('hex');

      }

   //   console.log('jump2')

   else {


  gdata['file_url']=file_url

                //  console.log(user)

                                //    console.log(parent)

var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

//connect away
MongoClient.connect('mongodb://127.0.0.1:27017/mongoo', function(err, db) {
  if (err) throw err;


  //simple json record
  //var document = {name:"David", title:"About MongoDB"};
  
  //insert record
  db.collection('saved_data').insert(gdata, function(err, records) {
    if (err) throw err;
    console.log("saved as " + gdata['title_name']);

  //  db.collection('saved_data').insert({proj_name:gdata['proj_name'],user:gdata['user']}, function(err, records) {


    process.send({
  //location_data
  res_data:file_url
  //demo_data
      })
    })

//});
  });
}
});

})



})