// URL de base de l'API backend
const API_URL = '/api/produits';

// Vérifie si on tourne sur le serveur Express ou sur Live Server
function isBackend() {
  return window.location.port === '3000';
}

// Récupère tous les produits depuis le serveur
async function getAllProduits() {
  if (isBackend()) {
    // On appelle l'API
    const reponse = await fetch(API_URL);
    // On convertit la réponse en JSON
    const data = await reponse.json();
    // On renvoie uniquement la liste des produits
    return data.produits;
  } else {
    // Si pas de serveur on lit directement le fichier JSON
    const reponse = await fetch('data/products.json');
    const data = await reponse.json();
    return data.produits;
  }
}

// Récupère un produit précis grâce à son id
async function getProduit(id) {
  // On récupère tous les produits et on cherche celui qui correspond
  const tous = await getAllProduits();
  for (var i = 0; i < tous.length; i++) {
    if (tous[i].id === id) return tous[i];
  }
  return null;
}

// Met à jour la quantité d'un produit dans le stock
async function updateStock(id, quantite) {
  if (!isBackend()) return;
  // Requête PUT envoyée au backend avec la nouvelle quantité
  await fetch(API_URL + '/' + id + '/stock', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    // On envoie la quantité dans le body
    body: JSON.stringify({ quantite: quantite })
  });
}

// Affiche un petit message temporaire en bas à droite
function showToast(message) {
  // Création du bloc du message
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  // On l'ajoute à la page
  document.body.appendChild(toast);
  // On le supprime après 3 secondes
  setTimeout(function() {
    toast.remove();
  }, 3000);
}

// Formate un nombre en prix avec le symbole €
function formatPrix(prix) {
  // Transforme le nombre en format français + ajoute €
  return prix.toLocaleString('fr-FR') + ' €';
}
