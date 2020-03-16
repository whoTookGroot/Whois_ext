const express = require('express');
const {exec} = require('child_process');
const cors = require('cors');
const promise = require('promise');
const { Client } = require('pg');

const client = new Client({
    user: 'admin',
    host: 'localhost',
    database: 'domains',
    password: 'secretpassword',
    port: 5432,
  });

client.connect();
var app = express();
//implement CORS for extension api calls
app.use(cors());


//Handler
app.get('/api/getdomain/', (req,res)=>{
    let name = req.query.name;
    console.log(name);

    resolveQuery(name).then(resp =>{
        console.log('Sending response code :',resp);
        res.send(resp.toString());
    }).catch(e => {
        console.log(e);
    });
});


async function resolveQuery(name){
    let status = await checkDB(name);

    if(status !=='')
        console.log('\'', name,'\'','is an existing domain, availability: ', status);
    else{
        status = await whois(name);
        client.query('insert into domains(domain,availability) values($1,$2)',[name,status]);
    }
    
    return status;
}


var checkDB = (name) => {
    return new promise((resolve, reject) => {
        client.query('select * from domains where domain=$1',[name], (err, res) => {
            if(err){
                console.log(err);
                reject(err);
            }
            else{
                if(res.rows == '')
                    resolve('');
                else
                    resolve(res.rows[0].availability);
            }
        });
    });
}


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
                console.log('Whois Length: ',stdout.length);
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