// Initialise la page favoris
document.addEventListener('DOMContentLoaded', () => {
  chargerFavoris();
  updateBadges();
});

// Récupère les ids des favoris depuis le localStorage
function getFavoris() {
  return JSON.parse(localStorage.getItem('favoris') || '[]');
}

// Charge les données des produits favoris et les affiche
async function chargerFavoris() {
  const ids = getFavoris();
  const grid = document.getElementById('favorites-grid');

  if (ids.length === 0) {
    grid.innerHTML = '<p class="empty-msg">Vous n\'avez aucun favori.</p>';
    return;
  }

  try {
    const tous = await getAllProduits();
    const favoris = tous.filter(p => ids.includes(p.id));

    if (favoris.length === 0) {
      grid.innerHTML = '<p class="empty-msg">Vos favoris ne sont plus disponibles.</p>';
      return;
    }

    grid.innerHTML = favoris.map(p => creerCarteFavoriHTML(p)).join('');
  } catch (e) {
    grid.innerHTML = '<p class="empty-msg">Impossible de charger les favoris.</p>';
  }
}

// Génère le HTML d'une carte favori avec boutons d'action
function creerCarteFavoriHTML(p) {
  return `
    <div class="product-card">
      <div class="card-image-wrapper" onclick="window.location='product.html?id=${p.id}'" style="cursor:pointer">
        ${p.images[0]
          ? `<img class="card-img card-img-primary" src="${p.images[0]}" alt="${p.nom}" loading="lazy" />`
          : '<div class="no-image">Pas d\'image</div>'}
        <span class="card-categorie">${p.categorie}</span>
      </div>
      <div class="card-body" onclick="window.location='product.html?id=${p.id}'" style="cursor:pointer">
        <p class="card-nom">${p.nom}</p>
        <p class="card-prix">${formatPrix(p.prix)}</p>
      </div>
      <div class="fav-card-actions">
        <button class="btn-fav-cart" onclick="ajouterAuPanier('${p.id}', '${p.nom}', ${p.prix}, '${p.devise}', '${p.images[0] || ''}', '${p.caracteristiques.couleurs[0]}')">
          Ajouter au panier
        </button>
        <button class="btn-fav-remove" onclick="supprimerFavori('${p.id}')">✕</button>
      </div>
    </div>`;
}

// Supprime un produit des favoris et recharge la liste
function supprimerFavori(id) {
  const favoris = getFavoris().filter(f => f !== id);
  localStorage.setItem('favoris', JSON.stringify(favoris));
  showToast('Retiré des favoris');
  chargerFavoris();
  updateBadges();
}

// Ajoute un favori directement au panier depuis la page favoris
function ajouterAuPanier(id, nom, prix, devise, image, couleur) {
  const panier = JSON.parse(localStorage.getItem('panier') || '[]');
  const existant = panier.find(item => item.id === id && item.couleur === couleur);

  if (existant) {
    existant.quantite += 1;
  } else {
    panier.push({ id, nom, prix, devise, image, couleur, quantite: 1 });
  }

  localStorage.setItem('panier', JSON.stringify(panier));
  showToast(`${nom} ajouté au panier`, 'success');
  updateBadges();
}

// Met à jour les badges header
function updateBadges() {
  const favCount = getFavoris().length;
  const cartCount = JSON.parse(localStorage.getItem('panier') || '[]')
    .reduce((s, i) => s + i.quantite, 0);
  const bFav = document.getElementById('badge-favoris');
  const bPanier = document.getElementById('badge-panier');
  if (bFav) { bFav.textContent = favCount; bFav.dataset.count = favCount; }
  if (bPanier) { bPanier.textContent = cartCount; bPanier.dataset.count = cartCount; }
}
