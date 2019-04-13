from flask import Flas
import json

app = Flask(__name__)
app.route('/')

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
    return render_template('index.html', data="empty")


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
