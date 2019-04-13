from flask import (Flask, jsonify, make_response, redirect, render_template, request, session)
from flask_cors import CORS
from uuid import uuid4
import datetime
import socket
import time
import json

app = Flask(__name__,)
# app.secret_key = 'bruce wayne is the mask'
cors = CORS(app, resources={r"/*": {"origins": "*"}})

#@app.route('/api/api', methods=['POST'])
#def some_api():
#    input = request.form.get("input")
#    if not input:
#        return jsonify({"status": 0, "message": "no input"})
#    return jsonify(call a function)

app.route('/', defaults={'path': ''})



@app.route("/get/v1",methods=["get"])
def grt_v1():
    print('in api')
    s = socket.socket()
    port = 6969
    s.connect(('10.1.2.233',port))
    print('connected')
    da = json.loads(s.recv(1024).decode('ascii'))
    #s.close()
    return json.dumps(da)

@app.route('/')
def home():
    return render_template('index.html', data=da)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
