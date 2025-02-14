const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/predict", (req, res) => {
  const { text } = req.body;
  
  const pythonProcess = spawn("python3", ["model_predict.py", text]);
  
  pythonProcess.stdout.on("data", (data) => {
    res.json({ prediction: data.toString().trim() });
  });
  
  pythonProcess.stderr.on("data", (data) => {
    console.error(`Error: ${data}`);
    res.status(500).json({ error: "Internal Server Error" });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
