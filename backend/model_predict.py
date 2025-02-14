from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import os

with open("model.pkl", "rb") as model_file:
    model = pickle.load(model_file)
with open("vectorizer.pkl", "rb") as vectorizer_file:
    vectorizer = pickle.load(vectorizer_file)

app = Flask(__name__)
CORS(app)  

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    input_text = data.get("text", "")

    if not input_text:
        return jsonify({"error": "No text provided"}), 400

    transformed_text = vectorizer.transform([input_text])
    prediction = model.predict(transformed_text)

    return jsonify({"prediction": "Spam" if prediction[0] == 1 else "Not Spam"})

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000)) 
    app.run(host="0.0.0.0", port=port, debug=True)
