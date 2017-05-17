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

exports.addMessage = function(req,res){
    res.header('Access-Control-Allow-Origin', '*');
    console.log(req.query);

    var message = {
      sender_id: parseInt(req.query.user),
      destination_id:parseInt(req.query.dest_user),
      message:req.query.message
    };


    pool.getConnection(function(err,connection){

       if (err){
              connection.release();
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;
          }

        connection.query('INSERT INTO message_link SET ?', message, function(err,result) {
            if(!err) {
              console.log("message_link Success");
              return res.json({Status: "Success"});
            }
            else{
              console.log("message_link Failure");
              return res.json({Status: "Failure"});
            }
          })

      connection.release();
    });
}

exports.viewMessage = function(req,res){

    res.header('Access-Control-Allow-Origin', '*');
    console.log(req.query);

    pool.getConnection(function(err,connection){
          if (err){
              connection.release();
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;
          }
          
          
          connection.query('SELECT * FROM message_link where destination_id=?', req.query.userid, function(err,result) {
            if(!err) {
              console.log("Message retrieval Success");
              return res.json(result);
            }
            
          })

          connection.release();
  });
}
