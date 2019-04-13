from flask import (Flask, jsonify, make_response, redirect, render_template, request, session)
from flask_cors import CORS
from uuid import uuid4
import datetime
import socket
import time

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

s = socket.socket()
port = 3114
s.connect(('127.0.0.1',port))


@app.route('/')
def home():
    return render_template('index.html', data=s.recv(1024))

s.close()

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
