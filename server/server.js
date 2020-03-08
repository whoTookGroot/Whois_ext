const express = require('express');
const {exec} = require('child_process');
const cors = require('cors');
const promise = require('promise');

var app = express();
//implement CORS for extension api calls
app.use(cors());

//Handler
app.get('/api/getdomain/', (req,res)=>{
    
    //handle promise
    whois(req.query.name).then(function(resCode){
        console.log(resCode);
        res.send(resCode);
    });
});


//promise function
var whois = name =>{
    return new promise((resolve,reject)=>{
        let resCode = '0';
        //estimate length return value for unknown whois parameter
        let minLength = 4000;
        const command = 'whois ' + name;

        //execute linux command
        exec(command,(err,stdout,stderr)=>{
            if(err){
                console.log(err);
                reject(err);
            }
            else{
                console.log(stdout.length);
                if(stdout.length < minLength)
                    resCode = '1';
                resolve(resCode);
            }
        });
    });
}

var server = app.listen(12345, () => {
    console.log('Server running');
});