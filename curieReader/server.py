import json
from flask_cors import CORS
from flask import *

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/",methods=["get"])
def get():
    print("inside API")
    with open("./curieReader/data.txt","r") as file:
        data = file.read()
    return jsonify(json.loads(data))

if __name__ == "__main__":
	app.run(host="0.0.0.0" , port=int("8081"), debug=True)
