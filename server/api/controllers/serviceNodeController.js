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

exports.delete_service_node = function(req, res){

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
          connection.query('DELETE FROM service_node where ID=?', req.query.ID, function(err,result) {
            if(!err) {
              console.log("service_node delete Success");
              return res.json({Status: 'Success'});
            }
            else{
              console.log("service_node delete Failure");
              return res.json({Status: 'Failure'});
            }
            
          })

          connection.release();
  });

}


exports.edit_service_node = function(req, res){

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
          connection.query('SELECT * FROM service_node where ID=?', req.query.ID, function(err,result) {
            if(!err) {
              console.log("service_node retrieval Success");
              return res.json(result);
            }
            
          })

          connection.release();
  });

}

exports.view_service_node = function(req, res){

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
          connection.query('SELECT * FROM service_node where userid=?', req.query.userid, function(err,result) {
            if(!err) {
              console.log("service_node retrieval Success");
              return res.json(result);
            }
          })

          connection.release();
  });

}

exports.add_service_node = function(req, res){

  res.header('Access-Control-Allow-Origin', '*');
  console.log(req.query.ID);

  var service_node = {
    service_name: req.query.name,
    smid: req.query.ID,
    created_on: req.query.created_on,
    userid: req.query.user,
    clusterid: req.query.clusterid,
    description: req.query.description,
    type: req.query.type
  }


  pool.getConnection(function(err,connection){
          var id;
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
          connection.query('INSERT INTO service_node SET ?', service_node, function(err,result) {
            if(!err) {
              console.log("smart_node Add Success");
              //return res.json({Status: "Success"});
              connection.query('SELECT ID FROM service_node ORDER BY ID DESC LIMIT 1;',function(err,result) {
                if(!err) {
                  //console.log("Cluster Add Success");
                  id = result[0].ID;
                  console.log(id);
                  //return res.json({smart_node_id: result[0].ID, Status: "Success"});
                  connection.query('INSERT INTO smart_node_service_lookup values(?,?)', [req.query.ID, id], function(err,result) {
                    if(!err) {
                      console.log("smart_node_service lookup Success");
                      //return res.json({Status: "Success"})              
                    }
                    else{
                      console.log("smart_node_service lookup Failure");
                      console.log(err);
                      //return res.json({Status: "Failure"});
                    }
                  })

                  connection.query('INSERT INTO cluster_services_lookup values(?,?)', [req.query.clusterid, id], function(err,result) {
                    if(!err) {
                      console.log("cluster_services_lookup Success");
                      //return res.json({Status: "Success"})              
                    }
                    else{
                      console.log("cluster_services_lookup lookup Failure");
                      console.log(err);
                      //return res.json({Status: "Failure"});
                    }
                  })
                }
                else{
                  console.log("service_node Add Failure");
                  console.log(err);
                  //return res.json({Status: "Failure"});
                }
                
             })
            }
            else{
              console.log("service_node Add Failure");
              console.log(err);
              return res.json({Status: "Failure"});
            }
          })
          connection.release();
  });
}