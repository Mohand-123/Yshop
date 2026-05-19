const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dataPath = path.join(__dirname, '../data/products.json');

// Lit et retourne les données du fichier JSON
function lireData() {
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

// Écrit les données dans le fichier JSON
function ecrireData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
}

// GET /api/produits — récupère tous les produits
router.get('/', (req, res) => {
  const data = lireData();
  res.json(data);
});

// GET /api/produits/:id — récupère un produit par son identifiant
router.get('/:id', (req, res) => {
  const data = lireData();
  const produit = data.produits.find(p => p.id === req.params.id);
  if (!produit) return res.status(404).json({ message: 'Produit non trouvé' });
  res.json(produit);
});

// PUT /api/produits/:id/stock — met à jour le stock d'un produit
router.put('/:id/stock', (req, res) => {
  const data = lireData();
  const index = data.produits.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Produit non trouvé' });

  const { quantite } = req.body;
  if (typeof quantite !== 'number' || quantite < 0) {
    return res.status(400).json({ message: 'Quantité invalide' });
  }

  data.produits[index].stock = quantite;
  ecrireData(data);
  res.json(data.produits[index]);
});

module.exports = router;
