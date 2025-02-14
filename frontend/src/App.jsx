/* eslint-disable no-unused-vars */
import React, {useState} from 'react'

const App = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://spam-classifier-clgp.onrender.com/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    setResult(data.prediction);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Spam Classifier</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <textarea
          className="w-full p-2 border rounded"
          rows="4"
          placeholder="Enter text to classify..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Classify
        </button>
      </form>
      {result !== null && (
        <div className="mt-4 p-4 bg-gray-200 rounded">
          <p className="text-lg font-semibold">Prediction: {result}</p>
        </div>
      )}
    </div>
  );
}

export default App;