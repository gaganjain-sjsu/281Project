$(function () {

    $('.card').find('.header').append('<h2>Edit Cluster</h2>');
   console.log(localStorage.getItem("clusterid"));
   var clusterid = localStorage.getItem("clusterid");
   $('#welcome').html('Welcome ' + localStorage.getItem("username"));
   var userid = localStorage.getItem("userid");

   var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/getCluster?clusterid="+clusterid+"&userid="+userid, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //console.log(JSON.parse(this.responseText));
            $('#cluster_name').val(JSON.parse(this.responseText)[0]["clustername"]);
            $('#street_name').val(JSON.parse(this.responseText)[0]["street"]);
            $('#city').val(JSON.parse(this.responseText)[0]["city"]);
            $('#state').val(JSON.parse(this.responseText)[0]["state"]);
            $('#country').val(JSON.parse(this.responseText)[0]["country"]);
            $('#zip').val(JSON.parse(this.responseText)[0]["zip"]);


        }
    };

    $('#submit').click(function(event){

        var name = $('#cluster_name').val();
        var street = $('#street_name').val();
        var city = $('#city').val();
        var state = $('#state').val();
        var country = $('#country').val();
        var zip = $('#zip').val();

        var user = localStorage.getItem("userid");
        var date = new Date().toISOString().substring(0,10);

        if(name != "" && street != "" && city != "" && state != "" && country != "" && zip != ""){
            console.log(name + " & " + street  +  " & " + city + " & " + state  +  " & " + country + " & " + street);
            // $.post("http://localhost:8081/login", {user: username, password: password}, function(data){
            //     console.log(data);
            // });
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", "http://localhost:3000/editCluster?clusterid="+clusterid+"&cluster_name="+name+"&street="+street+"&city="
                +city+"&state="+state+"&country="+country+"&zip="+zip+"&user="+user+"&date="+date, true);
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
                        $('#success').html('<strong>Success!</strong>Cluster edited successfully.');
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