$(function () {
    $('#sign_up').validate({
        rules: {
            'terms': {
                required: true
            },
        },
        highlight: function (input) {
            console.log(input);
            $(input).parents('.form-line').addClass('error');
        },
        unhighlight: function (input) {
            $(input).parents('.form-line').removeClass('error');
        },
        errorPlacement: function (error, element) {
            $(element).parents('.input-group').append(error);
            $(element).parents('.form-group').append(error);
        }
    });

    $('#register').click(function(event){

        var username = $('#username').val();
        var password = $('#password').val();
        var email = $('#email').val();
        if(username != "" && password != "" && email != ""){
            console.log(username + " & " + password  +  " & " + email);
            // $.post("http://localhost:8081/login", {user: username, password: password}, function(data){
            //     console.log(data);
            // });
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", "http://localhost:3000/register?username="+username+"&password="+password+"&email="+email, true);
            xhttp.send();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                     console.log(this.responseText);
                     if(JSON.parse(this.responseText).Status == 'Success'){
                        console.log("Inside success");
                        window.location.href = '/Users/gaganjain/AdminBSBMaterialDesign/index.html';
                     }
                     else{
                        window.location.href = '/Users/gaganjain/AdminBSBMaterialDesign/pages/examples/sign-in.html';
                     }
                }
            };
            
        }
    });
});