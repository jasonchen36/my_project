process.on('message',function(gdata){

	console.log(gdata)




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




finddata = function(dquery, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('saved_data', function(err, collection) {
        if (!err) {
          collection.find({"file_url":
            dquery
            },{'user':1,'file_url':1}).toArray(function(err, docs) {
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

var db = new Db('mongoo', server);  
var onErr = function(err, callback) {  
  db.close();
  callback(err);
};






finddata(gdata[1]['url'],function(data1kw){




  if(data1kw[0]['user']==gdata[0] && gdata[1]['action']=="delete_report"){
    console.log("match!")

    file_url = data1kw[0]['file_url']
    console.log(data1kw[0])

   // _id: new mongodb.ObjectID( data1kw['_id']) 

   objid=data1kw[0]['_id']

    var mongo=require('mongodb')

          var db = new Db('mongoo', server);  
      var onErr = function(err, callback) {  
        db.close();
        callback(err);
      };
            db.open(function(err, db) {
                if (!err) {
                  db.collection('saved_data', function(err, collection) {
                   // console.log("connnn")
                    if (!err) {
                      collection.remove({"_id":
                         mongo.ObjectID(objid)
                        },{'justOne':true},function(err,result){
                          if(!err){db.close()


                              process.send({
              //location_data
              res_data:"deleted"
              //demo_data
                  })


                ;}
            })}})}})
    

}

/////////
///delete proj
////////
else if(gdata[1]['action']=="delete_proj"){
    console.log("match!")

   // file_url = data1kw[0]['file_url']
   // console.log(data1kw[0])

   // _id: new mongodb.ObjectID( data1kw['_id']) 

proj_name=gdata[1]['proj']

    var mongo=require('mongodb')

          var db = new Db('mongoo', server);  
      var onErr = function(err, callback) {  
        db.close();
        callback(err);
      };
            db.open(function(err, db) {
                if (!err) {
                  db.collection('saved_data', function(err, collection) {
                   // console.log("connnn")
                    if (!err) {
                      collection.remove({$and:[{"proj_name" : proj_name},{ "user":gdata[0]}]
                        },function(err,result){
                          if(!err){db.close()


                          // console.log(gdata[0])
                          // console.log(proj_name)
                          // console.log(result)

                              process.send({
              //location_data
              res_data:"deleted"
              //demo_data
                  })


                ;}
            })}})}})
    

}


/////////
///create new proj
////////
else if(gdata[1]['action']=="create_new_proj"){
    console.log("match!")

   // file_url = data1kw[0]['file_url']
   // console.log(data1kw[0])

   // _id: new mongodb.ObjectID( data1kw['_id']) 

proj_name=gdata[1]['proj_name']



    var mongo=require('mongodb')

          var db = new Db('mongoo', server);  
      var onErr = function(err, callback) {  
        db.close();
        callback(err);
      };
            db.open(function(err, db) {
                if (!err) {
                  db.collection('saved_data', function(err, collection) {
                   // console.log("connnn")
                    if (!err) {
                      collection.insert({"proj_name" : proj_name, "user":gdata[0]}
                        ,function(err,result){
                          if(!err){db.close()


                          // console.log(gdata[0])
                          // console.log(proj_name)
                          // console.log(result)

                              process.send({
              //location_data
              res_data:"created"
              //demo_data
                  })


                ;}
            })}})}})
    

}
  




})






})