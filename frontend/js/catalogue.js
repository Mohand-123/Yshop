// État de l'application catalogue
let tousLesProduits = [];
let filtres = {
  categories: [],
  permis: [],
  prixMax: 25000
};
let triActif = 'default';

// Initialise la page au chargement
document.addEventListener('DOMContentLoaded', () => {
  chargerProduits();
  updateBadges();

  document.getElementById('sort-select').addEventListener('change', e => {
    triActif = e.target.value;
    afficherProduits();
  });

  document.getElementById('filter-prix').addEventListener('input', e => {
    filtres.prixMax = parseInt(e.target.value);
    document.getElementById('prix-display').textContent =
      parseInt(e.target.value).toLocaleString('fr-FR') + ' €';
    afficherProduits();
  });

  document.getElementById('btn-reset').addEventListener('click', reinitialiserFiltres);
});

// Charge les produits depuis l'API et initialise les filtres
async function chargerProduits() {
  try {
    tousLesProduits = await getAllProduits();
    construireFiltreDynamique();
    afficherProduits();
  } catch (e) {
    document.getElementById('products-grid').innerHTML =
      '<p class="empty-msg">Impossible de charger les produits.</p>';
  }
}

// Construit les checkboxes de filtres selon les données réelles
function construireFiltreDynamique() {
  const categories = [...new Set(tousLesProduits.map(p => p.categorie))].sort();
  const permisSet = new Set();
  tousLesProduits.forEach(p => p.caracteristiques.permis.forEach(pm => permisSet.add(pm)));
  const permis = [...permisSet].sort();

  const catContainer = document.getElementById('filter-categories');
  categories.forEach(cat => {
    catContainer.innerHTML += `
      <label class="filter-checkbox">
        <input type="checkbox" value="${cat}" onchange="toggleCategorie('${cat}', this.checked)" />
        ${cat}
      </label>`;
  });

  const permisContainer = document.getElementById('filter-permis');
  permis.forEach(pm => {
    permisContainer.innerHTML += `
      <label class="filter-checkbox">
        <input type="checkbox" value="${pm}" onchange="togglePermis('${pm}', this.checked)" />
        ${pm}
      </label>`;
  });
}

// Active ou désactive un filtre de catégorie
function toggleCategorie(cat, active) {
  if (active) filtres.categories.push(cat);
  else filtres.categories = filtres.categories.filter(c => c !== cat);
  afficherProduits();
}

// Active ou désactive un filtre de permis
function togglePermis(pm, active) {
  if (active) filtres.permis.push(pm);
  else filtres.permis = filtres.permis.filter(p => p !== pm);
  afficherProduits();
}

// Remet tous les filtres à zéro
function reinitialiserFiltres() {
  filtres = { categories: [], permis: [], prixMax: 25000 };
  triActif = 'default';
  document.querySelectorAll('.filter-checkbox input').forEach(cb => cb.checked = false);
  document.getElementById('filter-prix').value = 25000;
  document.getElementById('prix-display').textContent = '25 000 €';
  document.getElementById('sort-select').value = 'default';
  afficherProduits();
}

// Applique les filtres et le tri, puis rend les cartes
function afficherProduits() {
  let produits = [...tousLesProduits];

  if (filtres.categories.length > 0)
    produits = produits.filter(p => filtres.categories.includes(p.categorie));

  if (filtres.permis.length > 0)
    produits = produits.filter(p =>
      p.caracteristiques.permis.some(pm => filtres.permis.includes(pm))
    );

  produits = produits.filter(p => p.prix <= filtres.prixMax);

  switch (triActif) {
    case 'prix-asc':  produits.sort((a, b) => a.prix - b.prix); break;
    case 'prix-desc': produits.sort((a, b) => b.prix - a.prix); break;
    case 'nom-asc':   produits.sort((a, b) => a.nom.localeCompare(b.nom)); break;
    case 'nom-desc':  produits.sort((a, b) => b.nom.localeCompare(a.nom)); break;
  }

  const grid = document.getElementById('products-grid');
  document.getElementById('result-count').textContent =
    `${produits.length} moto${produits.length > 1 ? 's' : ''}`;

  if (produits.length === 0) {
    grid.innerHTML = '<p class="empty-msg">Aucun produit ne correspond aux filtres.</p>';
    return;
  }

  grid.innerHTML = produits.map(p => creerCarteHTML(p)).join('');
}

// Génère le HTML d'une carte produit
function creerCarteHTML(p) {
  const favoris = getFavoris();
  const estFavori = favoris.includes(p.id);
  const img1 = p.images[0] || '';
  const img2 = p.images[1] || p.images[0] || '';

  return `
    <div class="product-card" onclick="window.location='product.html?id=${p.id}'">
      <div class="card-image-wrapper">
        ${img1
          ? `<img class="card-img card-img-primary" src="${img1}" alt="${p.nom}" loading="lazy" />`
          : '<div class="no-image">Pas d\'image</div>'}
        ${img2 && img2 !== img1
          ? `<img class="card-img card-img-hover" src="${img2}" alt="${p.nom}" loading="lazy" />`
          : ''}
        <span class="card-categorie">${p.categorie}</span>
        <button class="card-fav-btn ${estFavori ? 'active' : ''}"
          onclick="event.stopPropagation(); toggleFavoriCarte('${p.id}', this)"
          title="${estFavori ? 'Retirer des favoris' : 'Ajouter aux favoris'}">
          ${estFavori ? '♥' : '♡'}
        </button>
      </div>
      <div class="card-body">
        <p class="card-nom">${p.nom}</p>
        <p class="card-prix">${formatPrix(p.prix)} <span>${p.devise}</span></p>
      </div>
    </div>`;
}

// Bascule le favori depuis la carte du catalogue
function toggleFavoriCarte(id, btn) {
  let favoris = getFavoris();
  if (favoris.includes(id)) {
    favoris = favoris.filter(f => f !== id);
    btn.textContent = '♡';
    btn.classList.remove('active');
  } else {
    favoris.push(id);
    btn.textContent = '♥';
    btn.classList.add('active');
    showToast('Ajouté aux favoris', 'success');
  }
  localStorage.setItem('favoris', JSON.stringify(favoris));
  updateBadges();
}

// Récupère les ids des favoris depuis le localStorage
function getFavoris() {
  return JSON.parse(localStorage.getItem('favoris') || '[]');
}

// Met à jour les badges header
function updateBadges() {
  const favCount = getFavoris().length;
  const cartCount = getCartCount();
  const bFav = document.getElementById('badge-favoris');
  const bPanier = document.getElementById('badge-panier');
  if (bFav) { bFav.textContent = favCount; bFav.dataset.count = favCount; }
  if (bPanier) { bPanier.textContent = cartCount; bPanier.dataset.count = cartCount; }
}

// Retourne le nombre total d'articles dans le panier
function getCartCount() {
  const panier = JSON.parse(localStorage.getItem('panier') || '[]');
  return panier.reduce((sum, item) => sum + item.quantite, 0);
}
