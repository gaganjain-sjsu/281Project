'use strict';

//var mysql      = require('mysql');
var mysql = require('mysql');
var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'west2-mysql-instance1.cnwstq8qgdk7.us-west-2.rds.amazonaws.com',
    user     : 'admin',
    password : 'qwerty123',
    database:'CommunityCloud',
    debug    :  false
});

var userCount =0;
var clusterCount=0;
/*var con = mysql.createConnection({
  host     : 'aws.cbmuqc9mcupo.us-east-1.rds.amazonaws.com',
  user     : 'clouduser',
  password : 'cloud123',
  database: "patient_monitoring"
});*/

exports.delete_smart_node = function(req, res){

  res.header('Access-Control-Allow-Origin', '*');
  console.log(req.query);

  pool.getConnection(function(err,connection){
          if (err){
              connection.release();
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;
          }
          // clusterCount += 1;
          // connection.query("INSERT into users values(?,?,?,?)",[userCount, username, password, email], function(err,result){
          //     if(!err) console.log("Success");
          //     return res.json({Status: "Success"});
          // })
          connection.query('DELETE FROM smart_node where smart_node_id=?', req.query.smart_node_id, function(err,result) {
            if(!err) {
              console.log("smart_node delete Success");
              return res.json({Status: 'Success'});
            }
            else{
              console.log("smart_node delete Failure");
              return res.json({Status: 'Failure'});
            }
            
          })

          connection.release();
  });

}


exports.edit_smart_node = function(req, res){

  res.header('Access-Control-Allow-Origin', '*');
  console.log(req.query);

  pool.getConnection(function(err,connection){
          if (err){
              connection.release();
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;
          }
          // clusterCount += 1;
          // connection.query("INSERT into users values(?,?,?,?)",[userCount, username, password, email], function(err,result){
          //     if(!err) console.log("Success");
          //     return res.json({Status: "Success"});
          // })
          connection.query('SELECT * FROM smart_node where smart_node_id=?', req.query.smart_node_id, function(err,result) {
            if(!err) {
              console.log("smart_node retrieval Success");
              return res.json(result);
            }
            
          })

          connection.release();
  });

}

exports.view_smart_node = function(req, res){

  res.header('Access-Control-Allow-Origin', '*');
  console.log(req.query);

  pool.getConnection(function(err,connection){
          if (err){
              connection.release();
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;
          }
          // clusterCount += 1;
          // connection.query("INSERT into users values(?,?,?,?)",[userCount, username, password, email], function(err,result){
          //     if(!err) console.log("Success");
          //     return res.json({Status: "Success"});
          // })
          connection.query('SELECT * FROM smart_node where userid=?', req.query.userid, function(err,result) {
            if(!err) {
              console.log("smart_node retrieval Success");
              return res.json(result);
            }
            
          })

          connection.release();
  });

}

exports.add_smart_node = function(req, res){

  res.header('Access-Control-Allow-Origin', '*');
  console.log(req.query);

  var smart_node = {
    clusterid: req.query.clusterid,
    userid: req.query.userid,
    created_on: req.query.created_on,
    smart_node_name: req.query.smart_node_name
  }


  pool.getConnection(function(err,connection){
          if (err){
              connection.release();
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;
          }
          // clusterCount += 1;
          // connection.query("INSERT into users values(?,?,?,?)",[userCount, username, password, email], function(err,result){
          //     if(!err) console.log("Success");
          //     return res.json({Status: "Success"});
          // })
          connection.query('INSERT INTO smart_node SET ?', smart_node, function(err,result) {
            if(!err) {
              console.log("smart_node Add Success");
              //return res.json({Status: "Success"});
              connection.query('SELECT ID FROM smart_node ORDER BY ID DESC LIMIT 1;',function(err,result) {
                if(!err) {
                  //console.log("Cluster Add Success");
                  return res.json({smart_node_id: result[0].ID, Status: "Success"});
                }
                else{
                  console.log("smart_node Add Failure");
                  console.log(err);
                  return res.json({Status: "Failure"});
                }
              })
            }
            else{
              console.log("smart_node Add Failure");
              console.log(err);
              return res.json({Status: "Failure"});
            }
          })
          connection.release();
  });
}

exports.delete_cluster = function(req, res){

  res.header('Access-Control-Allow-Origin', '*');
  console.log(req.query);

  pool.getConnection(function(err,connection){
          if (err){
              connection.release();
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;
          }
          // clusterCount += 1;
          // connection.query("INSERT into users values(?,?,?,?)",[userCount, username, password, email], function(err,result){
          //     if(!err) console.log("Success");
          //     return res.json({Status: "Success"});
          // })
          connection.query('DELETE FROM cluster where clusterid=?', req.query.clusterid, function(err,result) {
            if(!err) {
              console.log("Cluster retrieval Success");
              return res.json({Status: 'Success'});
            }
            
          })
          connection.release();
  });

}


exports.edit_cluster = function(req, res){

  res.header('Access-Control-Allow-Origin', '*');
  console.log(req.query);

  pool.getConnection(function(err,connection){
          if (err){
              connection.release();
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;
          }
          // clusterCount += 1;
          // connection.query("INSERT into users values(?,?,?,?)",[userCount, username, password, email], function(err,result){
          //     if(!err) console.log("Success");
          //     return res.json({Status: "Success"});
          // })
          connection.query('SELECT * FROM cluster where clusterid=?', req.query.clusterid, function(err,result) {
            if(!err) {
              console.log("Cluster retrieval Success");
              return res.json(result);
            }
            
          })
          connection.release();
  });

}


exports.view_cluster = function(req, res){

  res.header('Access-Control-Allow-Origin', '*');
  console.log(req.query);

  pool.getConnection(function(err,connection){
          if (err){
              connection.release();
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;
          }
          // clusterCount += 1;
          // connection.query("INSERT into users values(?,?,?,?)",[userCount, username, password, email], function(err,result){
          //     if(!err) console.log("Success");
          //     return res.json({Status: "Success"});
          // })
          connection.query('SELECT * FROM cluster where userid=?', req.query.userid, function(err,result) {
            if(!err) {
              console.log("Cluster retrieval Success");
              return res.json(result);
            }
            
          })

          connection.release();
  });

}



exports.add_cluster = function(req, res) {

  res.header('Access-Control-Allow-Origin', '*');
  console.log(req.query);

  // var name = req.query.cluster_name;
  // var street = req.query.street;
  // var city = req.query.city;
  // var state = req.query.state;
  // var country = req.query.country;
  // var zip = req.query.zip;

  
  var cluster = {
    clustername:req.query.cluster_name,
    userid: parseInt(req.query.user),
    created_on: req.query.date,
    street: req.query.street
  };

  var address = {
    street: req.query.street,
    city: req.query.city,
    state: req.query.state,
    zip: parseInt(req.query.zip),
    country: req.query.country
  };

  // };    

  pool.getConnection(function(err,connection){
          if (err){
              connection.release();
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;
          }
          // clusterCount += 1;
          // connection.query("INSERT into users values(?,?,?,?)",[userCount, username, password, email], function(err,result){
          //     if(!err) console.log("Success");
          //     return res.json({Status: "Success"});
          // })
          connection.query('INSERT INTO address SET ?', address, function(err,result) {
            if(!err) {
              console.log("Address Success");
              ///return res.json({Status: "Success"});
            }
            else{
              console.log("Address Failure");
              ///return res.json({Status: "Failure"});
            }
          })

          connection.query('INSERT INTO cluster SET ?', cluster, function(err,result) {
            if(!err) {
              console.log("Cluster Add Success");
              //return res.json({Status: "Success"});
              connection.query('SELECT clusterid FROM cluster ORDER BY clusterid DESC LIMIT 1;',function(err,result) {
                if(!err) {
                  //console.log("Cluster Add Success");
                  return res.json({ClusterId: result[0].clusterid, Status: "Success"});
                }
                else{
                  console.log("Cluster Add Failure");
                  console.log(err);
                  return res.json({Status: "Failure"});
                }
              })
            }
            else{
              console.log("Cluster Add Failure");
              console.log(err);
              return res.json({Status: "Failure"});
            }
          })

          

          connection.release();
  });
}


exports.register_client = function(req, res) {

  res.header('Access-Control-Allow-Origin', '*');
  console.log(req.query);
  // var user = {
    var username= req.query.username;
    var password= req.query.password;
    var email= req.query.email;
  // };    

  pool.getConnection(function(err,connection){
          if (err){
              connection.release();
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;
          }
          userCount += 1;
          connection.query("INSERT into users values(?,?,?,?)",[userCount, username, password, email], function(err,result){
              if(!err) console.log("Success");
              return res.json({Status: "Success"});
          })

          // connection.query('INSERT INTO users SET ?', user, function(err,result) {
          //   if(!err) console.log("Success");
          //   return res.json({Status: "Success"});
          // })
          connection.release();
  });
}


exports.check_login = function(req, res) {

  res.header('Access-Control-Allow-Origin', '*');
  console.log(req.query);   

  pool.getConnection(function(err,connection){
          if (err){
              connection.release();
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;
          }
          //userCount += 1;
          console.log(req.query.username);
          connection.query("SELECT * from users where userid=?",[req.query.username], function(err,result){
              if(!err) {
                console.log("Success");
                console.log(result);
                console.log(result[0].username);
                console.log(result[0].pass);
                if(req.query.password == result[0].pass){
                  console.log("Passwords match!");
                  return res.json({Status: 'Success', Username: result[0].username});
                }
                else{
                  console.log("Passwords don't match");
                  return res.json({Status: 'Failure'});
                }
              }
              else{
                console.log("Invalid userid");
                return res.json({Status: 'Failure'});
              }
              
          })

          // connection.query('INSERT INTO users SET ?', user, function(err,result) {
          //   if(!err) console.log("Success");
          //   return res.json({Status: "Success"});
          // })
          connection.release();
  });
  //res.json({Status: "Success"});
}
  // var userid = req.query.userid;
  // var userpassword = req.query.password;
  // pool.getConnection(function(err,connection){
  //   if (err){
  //       connection.release();
  //       res.json({"code" : 100, "status" : "Error in connection database"});
  //       return;
  //   }
  //   connection.query("SELECT password FROM login where userid=?", userid, function (err, result){
  //           //
  //     if(!err) {
  //         console.log(result[0]["password"]);
  //         var dbpass = result[0]["password"];
  //         console.log(userpassword + " + " + dbpass);
  //         if (userpassword!=dbpass) {
  //           console.log("Passwords don't match"); 
  //           //res.json({Status : 'False'});
  //           res.json(JSON.stringify({Status : 'False'}));
  //         }
  //         else{
  //           console.log("Passwords match");
  //         connection.query("select hospital_id, hospital_name, city, state, country, zip, latitude, longitude from hospitals natural join address where zip in (select zip from hospital_doctor natural join hospitals where doctor_id=?)", userid, function (err, r) {
  //         if (err) 
  //           throw err;
  //         console.log(r);
  //         res.json(r);
  //         //console.log(result);
  //         })
  //         }
  //       }
  //     })
  //   connection.release(); 
  // });
      

  //res.end(JSON.stringify(req.body));

  //console.log(req.body);
  //console.log(re)

  //var user = req.body;
  /*res.header('Access-Control-Allow-Origin', '*');
  pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        console.log('connected as id ' + connection.threadId);
        connection.query("select hospital_id, hospital_name, city, state, country, zip from hospitals natural join address where zip in (select zip from hospital_doctor natural join hospitals where doctor_id=800)",function (err, r) {
        console.log(r);  
        if (err) throw err;
        res.json(r);
      })
      connection.release();  
  });
  
}
        //var user = req.body.split(',');
        /*console.log(user["password"]);
        var userpassword = user["password"];
        var dbpass;
        res.header('Access-Control-Allow-Origin', '*');

        connection.query("SELECT password FROM login where userid = ?", user["userid"], function (err, result){
            //
            if(!err) {
                console.log(result[0]["password"]);
                dbpass = result[0]["password"];
                console.log(userpassword + " + " + dbpass);
                if (userpassword!=dbpass) {
                  console.log("Passwords don't match"); 
                  //res.json({Status : 'False'});
                  res.send(JSON.stringify({Status : 'False'}));
                }
                else{
                  console.log("Passwords match");
                  connection.query("select hospital_id, hospital_name, city, state, country, zip from hospitals natural join address where zip in (select zip from hospital_doctor natural join hospitals where doctor_id= ?)", user["userid"], function (err, r) {
                  console.log(r);  
                  if (!err){ 
                      res.json(r);
                      /*var usersRows = [];
                      var js = '';
                      /*console.log(r.length);
                      var i = 0;
                      while(i <= r.length){
                        console.log(r[i]);
                        i += 1;
                      }
                      var str=JSON.stringify(r);
                      var json = JSON.parse(str);
                      console.log(str);
                      res.send(str);
                      var i = 0;
                      usersRows = JSON.parse(JSON.stringify(r));
                      /*console.log(usersRows.length);
                      while(i < usersRows.length){
                        //console.log(usersRows[i]);
                       js += JSON.stringify(usersRows[i]);
                       i +=1;
                      }
                      console.log(JSON.parsejs);*/
                      //console.log(usersRows[0]);
                      //res.end(JSON.stringify({userid : 800, pwd : "doctor1"}));
                 /* }
                  }) 
                } 
            }
            connection.release();           
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });

  /*var user = req.body;
  var userpassword = user["password"];
  var dbpass;
  res.header('Access-Control-Allow-Origin', '*');
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT password FROM login where userid = ?", user["userid"], function (err, result) {
    if (err) throw err;
    dbpass = result[0]["password"];
    console.log(userpassword + " + " + dbpass);
    if (userpassword!=dbpass) {
      console.log("Passwords don't match"); 
      res.json({Status : 'False'});
    }
    else{
      console.log("Passwords match");
      con.query("select hospital_id, hospital_name, city, state, country, zip from hospitals natural join address where zip in (select zip from hospital_doctor natural join hospitals where doctor_id= ?)", user["userid"], function (err, r) {
      if (err) throw err;
      console.log(r);
      res.json(r);
      }) 
    } 
    })
  });*/
  
//}

exports.list_all_tasks = function(req, res) {
  var input = 0;
  var sysMin = 40, sysMax = 120;
  var diaMin = 60, diaMax = 200;
  var systolic=parseInt(Math.random()*(sysMax-sysMin)+sysMin);
  var diastolic=parseInt(Math.random()*(diaMax-diaMin)+diaMin);
  res.header('Access-Control-Allow-Origin', '*');
  res.json({ systolic:systolic, diastolic: diastolic });
};

exports.list_all_patients = function(req, res) {
  
  res.header('Access-Control-Allow-Origin', '*');
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM patient", function (err, result) {
    if (err) 
      throw err;
    console.log(result);
    res.json(result);
    //console.log(result);
  })
  });
  //con.end();
};


