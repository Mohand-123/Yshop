const API_URL = '/api/produits';

async function getAllProduits() {
  const reponse = await fetch(API_URL);
  const data = await reponse.json();
  return data.produits;
}

async function getProduit(id) {
  const reponse = await fetch(API_URL + '/' + id);
  return reponse.json();
}

async function updateStock(id, quantite) {
  await fetch(API_URL + '/' + id + '/stock', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantite: quantite })
  });
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(function() {
    toast.remove();
  }, 3000);
}

function formatPrix(prix) {
  return prix.toLocaleString('fr-FR') + ' €';
}
