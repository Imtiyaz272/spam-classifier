from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

# Load the trained model and vectorizer
with open("model.pkl", "rb") as model_file:
    model = pickle.load(model_file)
with open("vectorizer.pkl", "rb") as vectorizer_file:
    vectorizer = pickle.load(vectorizer_file)

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend access

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    input_text = data.get("text", "")

    if not input_text:
        return jsonify({"error": "No text provided"}), 400

    # Transform input text and predict
    transformed_text = vectorizer.transform([input_text])
    prediction = model.predict(transformed_text)

    return jsonify({"prediction": "Spam" if prediction[0] == 1 else "Not Spam"})

if __name__ == '__main__':
    app.run(debug=True)
