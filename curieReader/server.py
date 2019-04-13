import json
from flask import *

app = Flask(__name__)
app.route("/")

@app.route("/get",methods=["get"])
def get():
    with open("./data.txt","r") as file:
        data = file.read()
    return jsonify(data)

if __name__ == "__main__":
	app.run(host="0.0.0.0" , port=int("8081"), debug=True)
