from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import joblib

app = Flask(__name__)
model = joblib.load('./model.joblib')
CORS(app) 
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    features = [[
        int(data['education']),
        int(data['experience']),
        int(data['companySize']),
        int(data['category']),
        int(data['city'])
    ]]
    prediction = model.predict(features)
    return jsonify(salary=round(float(prediction[0])*10, 1))
    # return jsonify(salary=float(prediction[0]))

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001) 
