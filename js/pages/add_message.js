$(function () {

    $('#welcome').html('Welcome ' + localStorage.getItem("username"));
    $('.card').find('.header').append('<h2>Post Message</h2>');
	$('#submit').click(function(event){

        var message = $('#message').val();
        var dest_user = $('#userid').val();
        var source_user = localStorage.getItem("userid");
        //var date = new Date().toISOString().substring(0,10);

        if(message != "" && dest_user != ""){
            
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", "http://localhost:3000/addMessage?message="+message+"&dest_user="+dest_user+"&user="+source_user, true);
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
                        $('#success').html('<strong>Success!</strong>Message sent successfully.');
                     // //   $('.form-horizontal')[0].reset();
                     }
                }
            };
            
        }
        else{
            alert("missing fields");
        }
    });
});