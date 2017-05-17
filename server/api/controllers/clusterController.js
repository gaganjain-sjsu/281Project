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
              console.log("Cluster delete Success");
              return res.json({Status: 'Success'});
            }
            else{
              console.log("Address Failure");
              return res.json({Status: "Failure"});
            }
            
          })
          connection.release();
  });

}


exports.edit_cluster = function(req, res){

  var address = {
    street: req.query.street,
    city: req.query.city,
    state: req.query.state,
    zip: parseInt(req.query.zip),
    country: req.query.country
  };

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

          connection.query('UPDATE cluster SET clustername=?,created_on=?,street=? where clusterid=?' , [req.query.clustername, req.query.created_on, req.query.street, req.query.clusterid], function(err,result) {
            if(!err) {
              console.log("Cluster UPDATE Success");
              return res.json({Status: "Success"});
            }
            else{
              console.log("Cluster UPDATE Failure");
              return res.json({Status: "Failure"});
            }
            
          })
          connection.release();
  });

}

exports.get_cluster = function(req, res){

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
          connection.query('SELECT * FROM cluster natural join address where clusterid=? and userid=?', [req.query.clusterid, req.query.userid], function(err,result) {
            if(!err) {
              console.log("Cluster retrieval Success");
              console.log(result);
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
          connection.query('SELECT * FROM cluster natural join address where userid=? order by clusterid desc', req.query.userid, function(err,result) {
            if(!err) {
              console.log("Cluster retrieval Success");
              //console.log(result);
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