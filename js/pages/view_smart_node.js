$(function () {
    
   console.log(localStorage.getItem("username"));
   $('#welcome').html('Welcome ' + localStorage.getItem("username"));
   console.log(localStorage.getItem("userid"));
   var userid = parseInt(localStorage.getItem("userid"));


   var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/viewSmartNode?userid="+userid, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            $('#smartNode').children('tbody').children()[0].remove();
            for(var i=0; i<JSON.parse(this.responseText).length; i++){
                console.log(JSON.parse(this.responseText));
                var data="<tr><td>"+JSON.parse(this.responseText)[i]["ID"]+"</td><td>"
                +JSON.parse(this.responseText)[i]["smart_node_name"]+"</td><td>"
                +JSON.parse(this.responseText)[i]["clusterid"]+"</td><td>"
                +JSON.parse(this.responseText)[i]["created_on"]+"</td><td>"
                +"<button id=edit"+JSON.parse(this.responseText)[i]["ID"]+" style='margin: 0px;' type='button' class='btn btn-primary m-t-15 waves-effect '>EDIT</button></td>"+
                "<td><button id=delete"+JSON.parse(this.responseText)[i]["ID"]+" style='margin: 0px;' type='button' class='btn btn-primary m-t-15 waves-effect'>DELETE</button></td></tr>";
                $('#smartNode').find('tbody').append(data);
            }
             
        }
    };

    $(document).on("click","button",function(){
    // code goes here {
        if(this.id.includes("edit")){
            window.location.href = "/Users/gaganjain/AdminBSBMaterialDesign/pages/edit_node.html";
            localStorage.setItem("smart_node_id", this.id.substring(4));
        }
        else{
            //console.log(this.id);
            localStorage.setItem("smart_node_id", this.id.substring(6));
            console.log(this.id.substring(6));
            alert("Are you sure?");
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", "http://localhost:3000/deleteSmartNode?smart_node_id="+this.id.substring(6), true);
            xhttp.send();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    alert("successfully deleted smartNode !");
                }
            };
        }
    });
});
