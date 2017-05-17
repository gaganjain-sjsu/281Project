$(function () {


   console.log(localStorage.getItem("username"));
   $('#welcome').html('Welcome ' + localStorage.getItem("username"));
   console.log(localStorage.getItem("userid"));
    var userid = parseInt(localStorage.getItem("userid"));


    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/viewCluster?userid="+userid, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //console.log(JSON.parse(this.responseText));
            $('#cluster').children('tbody').children()[0].remove();
            for(var i=0; i<JSON.parse(this.responseText).length; i++){
                //console.log(JSON.parse(this.responseText)[i]["clusterid"]);
                var data="<tr><td>"+JSON.parse(this.responseText)[i]["clusterid"]+"</td><td>"
                +JSON.parse(this.responseText)[i]["clustername"]+"</td><td>"
                +JSON.parse(this.responseText)[i]["street"]+"</td><td>"
                +JSON.parse(this.responseText)[i]["city"]+"</td><td>"
                +JSON.parse(this.responseText)[i]["state"]+"</td><td>"
                +JSON.parse(this.responseText)[i]["country"]+"</td><td>"
                +JSON.parse(this.responseText)[i]["created_on"]+"</td><td>"
                +"<button id=edit"+JSON.parse(this.responseText)[i]["clusterid"]+" style='margin: 0px;' type='button' class='btn btn-primary m-t-15 waves-effect '>EDIT</button></td>"+
                "<td><button id=delete"+JSON.parse(this.responseText)[i]["clusterid"]+" style='margin: 0px;' type='button' class='btn btn-primary m-t-15 waves-effect'>DELETE</button></td></tr>";
                $('#cluster').find('tbody').append(data);

            }
        }
    };

    $(document).on("click","button",function(){
    // code goes here {
        if(this.id.includes("edit")){
            window.location.href = "/Users/gaganjain/AdminBSBMaterialDesign/pages/edit_cluster.html";
            localStorage.setItem("clusterid", this.id.substring(4));
        }
        else{
            //console.log(this.id);
            localStorage.setItem("clusterid", this.id.substring(6));
            console.log(this.id.substring(6));
            alert("Are you sure?");
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", "http://localhost:3000/deleteCluster?clusterid="+this.id.substring(6), true);
            xhttp.send();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    alert("successfully deleted cluster !");
                }
            };
        }
    });
   


});