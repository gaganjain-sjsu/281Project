$(function () {
    
    $('.card').find('.header').append('<h2>Add Cluster</h2>');
    $('#welcome').html('Welcome ' + localStorage.getItem("username"));

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
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", "http://localhost:3000/addCluster?cluster_name="+name+"&street="+street+"&city="
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
                        $('#success').html('<strong>Success!</strong>Cluster added successfully.');
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