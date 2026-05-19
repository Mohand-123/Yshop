// url de base de notre api backend
const API_URL = '/api/produits';

// récupère tous les produits depuis le serveur
async function getAllProduits() {
  const reponse = await fetch(API_URL);
  const data = await reponse.json();
  return data.produits;
}

// récupère un seul produit avec son id
async function getProduit(id) {
  const reponse = await fetch(API_URL + '/' + id);
  return reponse.json();
}

// envoie la nouvelle quantité au serveur pour mettre à jour le stock
async function updateStock(id, quantite) {
  await fetch(API_URL + '/' + id + '/stock', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantite: quantite })
  });
}

// affiche un petit message en bas à droite qui disparait après 3 secondes
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(function() {
    toast.remove();
  }, 3000);
}

// formate un nombre en prix avec le symbole euro
function formatPrix(prix) {
  return prix.toLocaleString('fr-FR') + ' €';
}
