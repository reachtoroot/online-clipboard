const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Add this line for CORS support
const uuid = require('uuid');

const app = express();
const port = 3000;

// In-memory storage (replace with a database in a production environment)
let clipboardData = {};

app.use(bodyParser.json());
app.use(cors());  // Enable CORS for all routes

// ... (remaining code remains unchanged)


// Endpoint to submit data and generate a 5-digit key
app.post('/submit', (req, res) => {
  const { text } = req.body;

  // Generate a 5-hour expiration time
  const expirationTime = new Date();
  expirationTime.setHours(expirationTime.getHours() + 5);

  // Generate a 5-digit key
  const key = generateRandomKey();

  clipboardData[key] = { text, expirationTime };

  res.status(200).json({ key });
});

// Endpoint to retrieve data using the provided key
app.get('/retrieve/:key', (req, res) => {
  const key = req.params.key;
  const clipboardItem = clipboardData[key];

  if (clipboardItem && new Date() < clipboardItem.expirationTime) {
    res.json({ text: clipboardItem.text });
  } else {
    res.status(404).json({ error: 'Key not found or expired' });
  }
});

// Function to generate a random 5-digit key
function generateRandomKey() {
  return Math.floor(10000 + Math.random() * 90000).toString();
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
