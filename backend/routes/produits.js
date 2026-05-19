const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dataPath = path.join(__dirname, '../data/products.json');

// Lire le fichier JSON et retourner les données
function lireData() {
  const contenu = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(contenu);
}

// Sauvegarder les données dans le fichier JSON
function sauvegarderData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// GET /api/produits — retourne tous les produits
router.get('/', function(req, res) {
  const data = lireData();
  res.json(data);
});

// GET /api/produits/:id — retourne un produit selon son id
router.get('/:id', function(req, res) {
  const data = lireData();
  let produitTrouve = null;

  for (let i = 0; i < data.produits.length; i++) {
    if (data.produits[i].id === req.params.id) {
      produitTrouve = data.produits[i];
    }
  }

  if (produitTrouve === null) {
    res.status(404).json({ message: 'Produit non trouvé' });
  } else {
    res.json(produitTrouve);
  }
});

// PUT /api/produits/:id/stock — met à jour le stock d'un produit
router.put('/:id/stock', function(req, res) {
  const data = lireData();
  const nouvelleQuantite = req.body.quantite;
  let indexTrouve = -1;

  for (let i = 0; i < data.produits.length; i++) {
    if (data.produits[i].id === req.params.id) {
      indexTrouve = i;
    }
  }

  if (indexTrouve === -1) {
    res.status(404).json({ message: 'Produit non trouvé' });
  } else {
    data.produits[indexTrouve].stock = nouvelleQuantite;
    sauvegarderData(data);
    res.json(data.produits[indexTrouve]);
  }
});

module.exports = router;
