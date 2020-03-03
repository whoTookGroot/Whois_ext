#!/usr/bin/env python3

'''
@Author: Erik Grootendorst
@Date: 03-03-2020
@Description: An mvp flask implementation for a google chrome WHOIS extension.
    It currently returns true or false messages dependent on domain availability
'''
from flask import (
    Flask,
    render_template,
    request,
    url_for,
    redirect,
    flash,
    jsonify
)
from flask_cors import CORS, cross_origin
import subprocess


app = Flask(__name__)
#CORS Compliant
CORS(app)
app.secret_key = 'dev_secret_key'

@app.route('/', methods=['GET'])
def home():
    return "<h1>Test Api</h1>"

@app.route('/api/v1/getdomain/', methods=['GET'])
@cross_origin()
def domain():
    #grab url param
    if 'name' in request.args:
        name = request.args['name']
    
    #execute whois command in host linux environment
    whois = subprocess.Popen(["whois", name], stdout=subprocess.PIPE).communicate()[0]
    #decode response and translate newlines to html
    output = whois.decode().replace("\n","<br>")

    #Extemely weak logic for checking availability
    # Will need to implement a more reliable method for prod    
    if(len(output) < 5000):
        return '1'
    return '0'

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=12345)
