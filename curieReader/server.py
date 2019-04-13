import json
from flask import *

app = Flask(__name__)
app.route("/")

@app.route("/",methods=["get"])
def get():
    print("inside API")
    with open("data.txt","r") as file:
        data = file.read()
        print(data)
        print("Reading Data")
    return jsonify(data.strip())

if __name__ == "__main__":
	app.run(host="0.0.0.0" , port=int("8081"), debug=True)
