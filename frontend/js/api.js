// URL de base de l'API backend
const API_URL = '/api/produits';

// Récupère tous les produits depuis l'API
async function getAllProduits() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Erreur lors du chargement des produits');
  const data = await res.json();
  return data.produits;
}

// Récupère un seul produit par son identifiant
async function getProduit(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Produit non trouvé');
  return res.json();
}

// Met à jour le stock d'un produit
async function updateStock(id, quantite) {
  const res = await fetch(`${API_URL}/${id}/stock`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantite })
  });
  if (!res.ok) throw new Error('Erreur mise à jour stock');
  return res.json();
}

// Affiche un message toast temporaire
function showToast(message, type = '') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

// Formate un prix en euros
function formatPrix(prix) {
  return prix.toLocaleString('fr-FR') + ' €';
}
