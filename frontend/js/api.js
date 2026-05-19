const API_URL = '/api/produits';

// Récupère tous les produits
async function getAllProduits() {
  const reponse = await fetch(API_URL);
  const data = await reponse.json();
  return data.produits;
}

// Récupère un produit par son id
async function getProduit(id) {
  const reponse = await fetch(API_URL + '/' + id);
  return reponse.json();
}

// Met à jour le stock d'un produit
async function updateStock(id, quantite) {
  await fetch(API_URL + '/' + id + '/stock', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantite: quantite })
  });
}

// Affiche un message temporaire en bas de page
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(function() {
    toast.remove();
  }, 3000);
}

// Formate un nombre en prix euros
function formatPrix(prix) {
  return prix.toLocaleString('fr-FR') + ' €';
}
