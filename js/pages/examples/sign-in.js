$(function () {
    $('#sign_in').validate({
        highlight: function (input) {
            console.log(input);
            $(input).parents('.form-line').addClass('error');
        },
        unhighlight: function (input) {
            $(input).parents('.form-line').removeClass('error');
        },
        errorPlacement: function (error, element) {
            $(element).parents('.input-group').append(error);
        }
    });


    $('#login').click(function(event){

        var username = $('#username').val();
        var password = $('#password').val();
        if(username != "" && password != ""){
            console.log(username + " & " + password);
            // $.post("http://localhost:8081/login", {user: username, password: password}, function(data){
            //     console.log(data);
            // });
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", "http://localhost:3000/login?username="+username+"&password="+password, true);
            xhttp.send();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                 console.log(this.responseText);
                 if(JSON.parse(this.responseText).Status == 'Success'){
                    console.log("Inside success");
                    localStorage.setItem("username",JSON.parse(this.responseText).Username);
                    localStorage.setItem("userid",username);
                    window.location.href = '/Users/gaganjain/AdminBSBMaterialDesign/pages/add_cluster.html';
                 }
                 else{
                    window.location.href = '/Users/gaganjain/AdminBSBMaterialDesign/pages/examples/sign-in.html';
                }
                }
            };
            
        }
    });
});
