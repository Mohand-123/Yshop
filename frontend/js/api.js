// url de base de notre api backend
const API_URL = '/api/produits';

// détecte si on est sur le serveur express ou sur live server
function isBackend() {
  return window.location.port === '3000';
}

// récupère tous les produits - depuis l'api ou directement le json selon le contexte
async function getAllProduits() {
  if (isBackend()) {
    const reponse = await fetch(API_URL);
    const data = await reponse.json();
    return data.produits;
  } else {
    const reponse = await fetch('data/products.json');
    const data = await reponse.json();
    return data.produits;
  }
}

// récupère un seul produit avec son id
async function getProduit(id) {
  const tous = await getAllProduits();
  for (var i = 0; i < tous.length; i++) {
    if (tous[i].id === id) return tous[i];
  }
  return null;
}

// met à jour le stock uniquement si le backend est disponible
async function updateStock(id, quantite) {
  if (!isBackend()) return;
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
