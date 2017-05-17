$(function () {

    $('.card').find('.header').append('<h2>Edit Smart Node</h2>');
   console.log(localStorage.getItem("smart_node_id"));
   //console.log(localStorage.getItem("clusterid"));

   //var clusterid = localStorage.getItem("clusterid");
   var smart_node_id = parseInt(localStorage.getItem("smart_node_id"));
   var userid = localStorage.getItem("userid");

   $('#welcome').html('Welcome ' + localStorage.getItem("username"));
   
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/getSmartNode?smart_node_id="+smart_node_id, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.responseText));
            $('#cluster_id').val(JSON.parse(this.responseText)[0]["clusterid"]);
            $('#smart_node_name').val(JSON.parse(this.responseText)[0]["smart_node_name"]);
        }
    };

    $('#submit').click(function(event){

        var clusterid = $('#cluster_id').val();
        var smart_node_name = $('#smart_node_name').val();

        var user = localStorage.getItem("userid");
        var date = new Date().toISOString().substring(0,10);

        if(clusterid != "" && smart_node_name != ""){
            // $.post("http://localhost:8081/login", {user: username, password: password}, function(data){
            //     console.log(data);
            // });
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", "http://localhost:3000/editSmartNode?ID="+smart_node_id+"&clusterid="+clusterid+"&smart_node_name="+smart_node_name+"&user="+user+"&created_on="+date, true);
            xhttp.send();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                     console.log(this.responseText);
                     if(JSON.parse(this.responseText).Status == 'Success'){
                        console.log("Inside success");
                        //window.location.href = '/Users/gaganjain/AdminBSBMaterialDesign/index.html';
                        $('.header').find('h2').remove();
                        $('#success').attr('class','alert alert-success');
                        //$('#inner-success').html('Success !');
                        $('#success').html('<strong>Success!</strong>Smart Node edited successfully.');
                        //$('.form-horizontal')[0].reset();
                     }
                     // else{
                     //    window.location.href = '/Users/gaganjain/AdminBSBMaterialDesign/pages/examples/sign-in.html';
                     // }
                }
            };
            
        }
        else{
            alert("missing fields");
        }
    });
});