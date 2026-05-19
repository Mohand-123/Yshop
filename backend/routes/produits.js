const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dataPath = path.join(__dirname, '../data/products.json');

function lireData() {
  const contenu = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(contenu);
}

function sauvegarderData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

router.get('/', function(req, res) {
  const data = lireData();
  res.json(data);
});

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
