$(function () {

	$('#welcome').html('Welcome ' + localStorage.getItem("username"));
    $('.card').find('.header').append('<h2>Add Smart Node</h2>');

    
    $('#submit').click(function(event){

        var cluster_id = $('#cluster_id').val();
        var smart_node_name = $('#smart_node_name').val();
        var user = localStorage.getItem("userid");
        var date = new Date().toISOString().substring(0,10);

        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "http://localhost:3000/addSmartNode?clusterid="+cluster_id+"&smart_node_name="+smart_node_name+
        	"&userid="+user+"&created_on="+date, true);
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
                    $('#success').html('<strong>Success!</strong>Smart Node added successfully.');
                    $('.form-horizontal')[0].reset();
                 }
            }
        };
    });
});