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





finddata = function(dquery, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('saved_data', function(err, collection) {
        if (!err) {
          collection.find({"user":
            dquery
            },{'title_name':1,'proj_name':1,'file_url':1}).toArray(function(err, docs) {
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

finddata(gdata,function(data1kw){


  proj_list=[]

  file_list={}

  for (i in data1kw){

    if (proj_list.indexOf(data1kw[i]['proj_name'])>-1){

    }
    else {
    proj_list.push(data1kw[i]['proj_name'])}

    if (data1kw[i]['proj_name'] in file_list){
      file_list[data1kw[i]['proj_name']].push(data1kw[i]['title_name'])
    }

    else {
      file_list[data1kw[i]['proj_name']]=[data1kw[i]['title_name']]

    }

    
  }

  url_list={}
  for (i in data1kw){
    if (data1kw[i]['proj_name'] in url_list){
      url_list[data1kw[i]['proj_name']].push([data1kw[i]['title_name'],data1kw[i]['file_url']])
    }

    else {
      url_list[data1kw[i]['proj_name']]=[[data1kw[i]['title_name'],data1kw[i]['file_url']]]

    }

  }

    //console.log(file_list)
    s_data={}

    s_data['file_list']=file_list
    s_data['proj_list']=proj_list
    s_data['url_list']=url_list

  process.send({
  //location_data
  res_data:s_data
  //demo_data
      })

})






})