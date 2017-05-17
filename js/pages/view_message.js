$(function () {

	var userid = localStorage.getItem("userid");
    $('#welcome').html('Welcome ' + localStorage.getItem("username"));
	var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/viewMessages?&user="+userid, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
             console.log(this.responseText);
             if(JSON.parse(this.responseText).Status == 'Success'){
                console.log("Inside success");
                //window.location.href = '/Users/gaganjain/AdminBSBMaterialDesign/index.html';
             //    $('.header').find('h2').remove();
             //    $('#success').attr('class','alert alert-success');
             //    //$('#inner-success').html('Success !');
             //    $('#success').html('<strong>Success!</strong>Cluster added successfully.');
             // //   $('.form-horizontal')[0].reset();
             }
        }
    };


});