$(function () {
    
    $('.card').find('.header').append('<h2>Add Service Node</h2>');
    $('#welcome').html('Welcome ' + localStorage.getItem("username"));

    $('#submit').click(function(event){

        var type = $('#type').val();
        var name = $('#name').val();
        var smart_node_id = $('#smart_node_id').val();
        var description = $('#description').val();
        var clusterid = $('#clusterid').val();

        var user = localStorage.getItem("userid");
        var date = new Date().toISOString().substring(0,10);

        if(type != "" && name != "" && smart_node_id != "" && description != ""){
            //console.log(name + " & " + street  +  " & " + city + " & " + state  +  " & " + country + " & " + street);
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", "http://localhost:3000/addServiceNode?type="+type+"&name="+name+"&ID="+smart_node_id+"&description="+description+"&clusterid="+clusterid+"&user="+user+"&created_on="+date, true);
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
                        $('#success').html('<strong>Success!</strong>Service Node added successfully.');
                        $('.form-horizontal')[0].reset();
                     }
                }
            };
            
        }
        else{
            alert("missing fields");
        }
    });
});