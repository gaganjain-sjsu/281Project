'use strict';

//var mysql      = require('mysql');
var mysql = require('mysql');
var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'aws.cbmuqc9mcupo.us-east-1.rds.amazonaws.com',
    user     : 'clouduser',
    password : 'cloud123',
    database: "patient_monitoring",
    debug    :  false
});
/*
var con = mysql.createConnection({
  host     : 'aws.cbmuqc9mcupo.us-east-1.rds.amazonaws.com',
  user     : 'clouduser',
  password : 'cloud123',
  database: "patient_monitoring"
});*/

exports.check_login = function(req, res) {

    res.header('Access-Control-Allow-Origin', '*');
    console.log(req.query);    
    var userid = req.query.userid;
    pool.getConnection(function(err,connection){
      if (err){
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
      }
      connection.query("select hospital_id, hospital_name, city, state, country, zip from hospitals natural join address where zip in (select zip from hospital_doctor natural join hospitals where doctor_id=?)", userid, function (err, result) {
      if (err) 
        throw err;
      console.log(result);
      res.json(result);
      //console.log(result);
    })
    connection.release();    
    });
}
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
  
}*/
        //var user = req.body.split(',');
      /*  console.log(req.query);
        var user = req.query;
        console.log(user["password"]);
        var userpassword = user["password"];
        var dbpass;
        res.header('Access-Control-Allow-Origin', '*');
        pool.getConnection(function(err,connection){
            if (err) {
              connection.release();
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;
            }   

        console.log('connected as id ' + connection.threadId);
        connection.query("select hospital_id, hospital_name, city, state, country, zip from hospitals natural join address where zip in (select zip from hospital_doctor natural join hospitals where doctor_id= ?)", user["userid"], function (err, r){ 
        //connection.query("SELECT password FROM login where userid = ?", user["userid"], function (err, result){
            //
            if(!err) {
                console.log(r);
                res.json(r);
            }
          })
        connection.release();
        });
      };
      

                /*console.log(result[0]["password"]);
                dbpass = result[0]["password"];
                console.log(userpassword + " + " + dbpass);
                if (userpassword!=dbpass) {
                  console.log("Passwords don't match"); 
                  //res.json({Status : 'False'});
                  res.send(JSON.stringify({Status : 'False'}));
                }
                else{
                  fetch_hospitals(connection,userid);
                //   console.log("Passwords match");
                //   connection.query("select hospital_id, hospital_name, city, state, country, zip from hospitals natural join address where zip in (select zip from hospital_doctor natural join hospitals where doctor_id= ?)", user["userid"], function (err, r) {
                //   console.log(r);  
                //   if (!err){ 
                //       res.end(r);
                //       console.log(res);
                //   }
                //   //res.send(r);
                // })
                }
            }
          })
          connection.release();
        });
        // connection.on('error', function(err) {      
        //       res.json({"code" : 100, "status" : "Error in connection database"});
        //       return;     
        // });
      }
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

/*exports.fetch_hospitals = function(connection, userid){

  // pool.getConnection(function(err,connection){
  //       if (err) {
  //         connection.release();
  //         res.json({"code" : 100, "status" : "Error in connection database"});
  //         return;
  //       }   

        //console.log('connected as id ' + connection.threadId);
        connection.query("select hospital_id, hospital_name, city, state, country, zip from hospitals natural join address where zip in (select zip from hospital_doctor natural join hospitals where doctor_id= ?)", userid, function (err, r) {
        console.log(r);  
        if (err){ 
            //res.end(r);
            //console.log(res);
            throw err;
        }
        return r;
};*/


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


