$(document).ready(function(){
    const url = 'http://localhost:12345/api/getdomain/?name=';

    $("form").submit(function(e){
        e.preventDefault();
        $('.flash-msg').empty();
        //$('.whois').empty();
        var domain = $("#test input[name=domainName").val();
        let rv = '&rv=' + Date.now();
        console.log(domain);

        $.ajax({
            url: url+domain+rv,
            type: 'GET',
            crossDomain: true,
            cache: false,
            success: function(result){
                $('.flash-msg').append(flashMsg(result));
                //$('.whois').append(result);
                console.log('result ',result);
                return false;
            },
            error: function(error){
                console.log('last ajax error ',error.status);
                if(error.status == 0)
                    $('.flash-msg').append('<div class="alert alert-warning alert-dismissible fade show alert-fixed" role="alert">'
                    + 'Could not connect to server'
                    + '</div>');
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
