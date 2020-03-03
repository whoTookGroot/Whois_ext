$(document).ready(function(){
    const url = 'http://localhost:12345/api/v1/getdomain/?name=';

    $("form").submit(function(e){
        e.preventDefault();
        $('.flash-msg').empty();
        $('.whois').empty();
        let domain = $("#test input[name=domainName").val();
        console.log(domain);

        $.ajax({
            url: url + "" +domain,
            type: 'GET',
            crossDomain: true,

            success: function(result){
                $('.flash-msg').append(flashMsg(result));
                //$('.whois').append(result);
                console.log('result');
            },

            error: function(error){
                console.log(error);
            }
        });
    });
    
});

var flashMsg = e => {
    console.log(e);
    if(e == 1)
        return ('<div class="alert alert-success alert-dismissible fade show alert-fixed" role="alert">'
        + 'This domain is available'
        + '</div>');

    return ('<div class="alert alert-danger alert-dismissible fade show alert-fixed" role="alert">'
    + 'This domain is already in use'
    + '</div>');
}
