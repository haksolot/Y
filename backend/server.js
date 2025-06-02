const express = require('express');
const app = express();
const port = 5000;

// Middleware pour parser JSON
app.use(express.json());

// Test route
app.get('/hello', (req, res) => {
  res.json({ message: 'Yo depuis le backend 🚀' });
});

// Lancement du serveur
app.listen(port, () => {
  console.log(`Backend lancé sur http://localhost:${port}`);
});
