import json
from flask_cors import CORS
from flask import *
import pickel
from sklearn.externals import joblib
import pandas as pd

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/",methods=["get"])
def get():
    print("inside API")
    with open("./curieReader/heart_data.txt","r") as file:
        data = json.loads(file.read())
    with open("./curieReader/other_data.txt","r") as file2:
        data2 = json.loads(file2.read())
    with open("./sensors/ecgdata.txt") as file3:
        data3 = file3.read().split(" ")
    
    df = pd.DataFrame([[1, 24, 1, 6, 0, 1, 0, 140, 90, 23, data['beats']]],columns=['male','age','currentSmoker','cigsPerDay','BPMeds','prevalentHyp','diabetes','sysBP','diaBP','BMI','heartRate'])
    loaded_model = None
    with open('../model.pickle','rb') as f:
        loaded_model = pickle.load(f)
    predection = loaded_model.predict(df)
    mergedDate = {'heart': data, 'other': data2, 'analog_read': data3[0], 'bpm': data3[1].strip(), 'predection':predection}

    return jsonify(mergedDate)

if __name__ == "__main__":
	app.run(host="0.0.0.0" , port=int("8081"), debug=True)
