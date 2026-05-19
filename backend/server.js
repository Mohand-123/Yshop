const express = require('express');
const cors = require('cors');
const path = require('path');
const produitsRouter = require('./routes/produits');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/api/produits', produitsRouter);

app.listen(PORT, function() {
  console.log('Serveur lancé sur http://localhost:' + PORT);
});
