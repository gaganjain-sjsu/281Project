'use strict';
module.exports = function(app) {
  //var todoList = require('../controllers/todoListController');
  var cluster = require('../controllers/clusterController');
  var smartNode = require('../controllers/smartNodeController');
  var serviceNode = require('../controllers/serviceNodeController');
  var messageLink = require('../controllers/messageLinkController');
  var user = require('../controllers/userController');



 app.route('/')
/*
User Controller for /login & /register
*/

//START
  app.route('/login')
    .get(user.check_login)

  app.route('/register')
    .get(user.register_client)

 //END   

/*
cluster Controller for /addCluster, /viewCluster,/editCluster and /deleteCluster
*/

//START

  app.route('/addCluster')
    .get(cluster.add_cluster)
  
  app.route('/getCluster')
    .get(cluster.get_cluster)

  app.route('/viewCluster')
    .get(cluster.view_cluster)

  app.route('/editCluster')
    .get(cluster.edit_cluster)

  app.route('/deleteCluster')
    .get(cluster.delete_cluster)

//END


/*
smartNode Controller for /addSmartNode, /viewSmartNode,,/editSmartNode,and /deleteSmartNode,
*/

//START

  app.route('/addSmartNode')
    .get(smartNode.add_smart_node)

  app.route('/getSmartNode')
  .get(smartNode.get_smart_node)
  
  app.route('/viewSmartNode')
    .get(smartNode.view_smart_node)

  app.route('/editSmartNode')
    .get(smartNode.edit_smart_node)

  app.route('/deleteSmartNode')
    .get(smartNode.delete_smart_node)

//END

/*
serviceNode Controller for /addServiceNode, /viewServiceNode,/editServiceNode and /deleteServiceNode
*/

//START

  app.route('/addServiceNode')
    .get(serviceNode.add_service_node)
  
  app.route('/viewServiceNode')
    .get(serviceNode.view_service_node)

  app.route('/editServiceNode')
    .get(serviceNode.edit_service_node)

  app.route('/deleteServiceNode')
    .get(serviceNode.delete_service_node)

//END

/*
messageLink Controller for /addMessageLink, /viewMessageLink,/editMessageLink and /deleteMessageLink
*/

//START

  app.route('/addMessage')
    .get(messageLink.addMessage)
  app.route('/viewMessages')
    .get(messageLink.viewMessage)

//END
  
  
};
