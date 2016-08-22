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
      db.collection('prediction_interval', function(err, collection) {
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

getAll = function(dquery, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('prediction_interval', function(err, collection) {
        if (!err) {
          collection.find().toArray(function(err, docs) {
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


finddata = function(dquery, callback) {  
  db.open(function(err, db) {
    if (!err) {
      db.collection('prediction_interval', function(err, collection) {
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



var isArray = function (obj) {
  return Object.prototype.toString.call(obj) === "[object Array]";
},
getNumWithSetDec = function( num, numOfDec ){
  var pow10s = Math.pow( 10, numOfDec || 0 );
  return ( numOfDec ) ? Math.round( pow10s * num ) / pow10s : num;
},
getAverageFromNumArr = function( numArr, numOfDec ){
  if( !isArray( numArr ) ){ return false; }
  var i = numArr.length, 
    sum = 0;
  while( i-- ){
    sum += numArr[ i ];
  }
  return getNumWithSetDec( (sum / numArr.length ), numOfDec );
},
getVariance = function( numArr, numOfDec ){
  if( !isArray(numArr) ){ return false; }
  var avg = getAverageFromNumArr( numArr, numOfDec ), 
    i = numArr.length,
    v = 0;
 
  while( i-- ){
    v += Math.pow( (numArr[ i ] - avg), 2 );
  }
  v /= numArr.length;
  return getNumWithSetDec( v, numOfDec );
},
getStandardDeviation = function( numArr, numOfDec ){
  if( !isArray(numArr) ){ return false; }
  var stdDev = Math.sqrt( getVariance( numArr, numOfDec ) );
  return getNumWithSetDec( stdDev, numOfDec );
};

function median(values) {

    values.sort( function(a,b) {return a - b;} );

    var half = Math.floor(values.length/2);

    if(values.length % 2)
        return values[half];
    else
        return (values[half-1] + values[half]) / 2.0;
}




getdata(fquery,function(data){

  

  dif_ratio_list=[]
  for (i in data){
    dif_ratio_list.push(parseFloat(data[i]['dif_ratio']))
  }
  
  risk=getStandardDeviation(dif_ratio_list)

  risk_com=risk/1.0591421279048086

  mp=median(dif_ratio_list)



  max=Math.max.apply(Math, dif_ratio_list); // 3
min=Math.min.apply(Math, dif_ratio_list); // 100

 

  n=dif_ratio_list.length

  prob=parseFloat((n)/(n+1))


  


  if (prob > 0.85){
    n_points=(prob-0.85)/(1/(n))


  cn_points=Math.ceil(n_points)

  if (cn_points % 2 != 0){
    cn_points+=1
  }

  j=cn_points/2

  prob=parseFloat((n-(2*j)+1)/(n+1))


  dif_ratio_sorted=dif_ratio_list.sort(function (a, b) {
        return b - a;
    })


  max=dif_ratio_sorted[j]
  min=dif_ratio_sorted[n-(2*j)]

  console.log('ran addiont')
 // console.log(mp)


  }

  console.log('risk')
  console.log(risk)

  console.log('risk_com')
  console.log(risk_com)

  console.log('mp')
  console.log(mp)


  console.log('min')
  console.log(min)

  console.log('max')
  console.log(max)

  console.log(prob)

  res_data={}

  res_data["risk"]=risk
  res_data['risk_com']=risk_com
  res_data['mp']=mp
  res_data['min']=min
  res_data['max']=max
  res_data['prob']=prob


///////////////////////////////////interval get
ad_list=[]
  for (i in data){
    ad_list.push(parseFloat(data[i]['ad']))
  }

 var interval_query=[{}]

 qmin=Number(Math.min.apply(Math, ad_list))
 qmax=Number(Math.max.apply(Math, ad_list))

 interval_query.push({ad:{$gte:qmin,$lte:qmax}})

console.log(interval_query)

finddata(interval_query,function(interval_data){
 // console.log("ran here")

 // console.log(interval_data)


  ad_send_list=[]
  for (i in interval_data){
    //console.log(interval_data[i])
    ad_send_list.push(parseFloat(interval_data[i]['ad']))

  }

  std_send_list=[]
  for (i in interval_data){
    std_send_list.push(parseFloat(interval_data[i]['std']))

  }


  fy_send_list=[]
  for (i in interval_data){
    fy_send_list.push(parseFloat(interval_data[i]['fy']))

  }

  //console.log(ad_send_list)


res_data['ad_send_list']=ad_send_list
res_data['std_send_list']=std_send_list
res_data['fy_send_list']=fy_send_list


process.send({
  //location_data
  res_data:res_data
  //demo_data
      })



})




})
})