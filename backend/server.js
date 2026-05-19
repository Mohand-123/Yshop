const express = require('express');
const cors = require('cors');
const path = require('path');
const produitsRouter = require('./routes/produits');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Servir les fichiers statiques du frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes API
app.use('/api/produits', produitsRouter);

app.listen(PORT, () => {
  console.log(`YSHOP3 démarré sur http://localhost:${PORT}`);
});
