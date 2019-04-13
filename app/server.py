from flask import *
import json

app = Flask(__name__)
app.route('/')

@app.route('/')
def home():
    return render_template('index.html', data="empty")


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
