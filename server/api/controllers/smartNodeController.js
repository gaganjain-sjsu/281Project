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
          connection.query('DELETE FROM smart_node where ID=?', req.query.smart_node_id, function(err,result) {
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
          connection.query('UPDATE smart_node SET smart_node_name=?,clusterid=?,created_on=? where ID=?', [req.query.smart_node_name,req.query.clusterid, req.query.created_on, req.query.ID],function(err,result) {
            if(!err) {
              console.log("smart_node UPDATE Success");
              return res.json({Status:"Success"});
            }
            
          })

          connection.release();
  });

}

exports.get_smart_node = function(req, res){

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
          connection.query('SELECT * FROM smart_node where ID=?',[req.query.smart_node_id], function(err,result) {
            if(!err) {
              console.log("smart_node retrieval Success");
              console.log(result);
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
          connection.query('SELECT * FROM smart_node where userid=? order by ID desc', req.query.userid, function(err,result) {
            if(!err) {
              console.log("smart_node retrieval Success");
              return res.json(result);
            }
            
          })

          connection.release();
  });

}

var smart_node_id = 0; 

exports.add_smart_node = function(req, res){

  res.header('Access-Control-Allow-Origin', '*');
  console.log(req.query);

  // var smart_node = {
  //   clusterid: req.query.clusterid,
  //   userid: req.query.userid,
  //   created_on: req.query.created_on,
  //   smart_node_name: req.query.smart_node_name
  // }


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
          // connection.query('INSERT INTO smart_node SET ?', smart_node, function(err,result) {
            smart_node_id += 1;
            connection.query('INSERT INTO smart_node values(?,?,?,?,?)',[smart_node_id,req.query.clusterid
              ,req.query.userid,req.query.created_on,req.query.smart_node_name], function(err,result){
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