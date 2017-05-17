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