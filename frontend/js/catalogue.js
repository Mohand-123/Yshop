// Variables globales pour stocker les produits et les filtres actifs
let tousLesProduits = [];
let categoriesActives = [];
let permisActifs = [];
let prixMax = 25000;
let triActif = 'default';

// Quand la page est chargée, on lance le chargement des produits + les listeners
document.addEventListener('DOMContentLoaded', function() {
  chargerProduits();
  updateBadges();

  // Quand on change le tri
  document.getElementById('sort-select').addEventListener('change', function() {
    triActif = this.value;
    afficherProduits();
  });

  // Quand on change le filtre de prix
  document.getElementById('filter-prix').addEventListener('input', function() {
    prixMax = parseInt(this.value);
    document.getElementById('prix-display').textContent = parseInt(this.value).toLocaleString('fr-FR') + ' €';
    afficherProduits();
  });

  // Bouton pour réinitialiser tous les filtres
  document.getElementById('btn-reset').addEventListener('click', reinitialiserFiltres);
});

// Charge tous les produits depuis l'API puis construit les filtres et affiche la liste
async function chargerProduits() {
  tousLesProduits = await getAllProduits();
  construireFiltres();
  afficherProduits();
}

// Génère les filtres (catégories + permis) en fonction des produits disponibles
function construireFiltres() {
  // Récupération des catégories uniques
  const categories = [];
  for (let i = 0; i < tousLesProduits.length; i++) {
    const cat = tousLesProduits[i].categorie;
    if (categories.indexOf(cat) === -1) {
      categories.push(cat);
    }
  }

  // Récupération des permis uniques
  const permis = [];
  for (let i = 0; i < tousLesProduits.length; i++) {
    const permisProduit = tousLesProduits[i].caracteristiques.permis;
    for (let j = 0; j < permisProduit.length; j++) {
      if (permis.indexOf(permisProduit[j]) === -1) {
        permis.push(permisProduit[j]);
      }
    }
  }

  // Création des cases à cocher pour les catégories
  const catContainer = document.getElementById('filter-categories');
  for (let i = 0; i < categories.length; i++) {
    const cat = categories[i];
    catContainer.innerHTML +=
      '<label class="filter-checkbox"><input type="checkbox" value="' + cat +
      '" onchange="toggleCategorie(\'' + cat + '\', this.checked)" /> ' + cat + '</label>';
  }

  // Création des cases à cocher pour les permis
  const permisContainer = document.getElementById('filter-permis');
  for (let i = 0; i < permis.length; i++) {
    const pm = permis[i];
    permisContainer.innerHTML +=
      '<label class="filter-checkbox"><input type="checkbox" value="' + pm +
      '" onchange="togglePermis(\'' + pm + '\', this.checked)" /> ' + pm + '</label>';
  }
}

// Active ou désactive une catégorie dans les filtres
function toggleCategorie(cat, active) {
  if (active) {
    categoriesActives.push(cat);
  } else {
    const newList = [];
    for (let i = 0; i < categoriesActives.length; i++) {
      if (categoriesActives[i] !== cat) newList.push(categoriesActives[i]);
    }
    categoriesActives = newList;
  }
  afficherProduits();
}

// Active ou désactive un permis dans les filtres
function togglePermis(pm, active) {
  if (active) {
    permisActifs.push(pm);
  } else {
    const newList = [];
    for (let i = 0; i < permisActifs.length; i++) {
      if (permisActifs[i] !== pm) newList.push(permisActifs[i]);
    }
    permisActifs = newList;
  }
  afficherProduits();
}

// Remet tous les filtres à zéro
function reinitialiserFiltres() {
  categoriesActives = [];
  permisActifs = [];
  prixMax = 25000;
  triActif = 'default';

  // On décoche toutes les cases
  const checkboxes = document.querySelectorAll('.filter-checkbox input');
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }

  // On remet les valeurs par défaut
  document.getElementById('filter-prix').value = 25000;
  document.getElementById('prix-display').textContent = '25 000 €';
  document.getElementById('sort-select').value = 'default';

  afficherProduits();
}

// Filtre + trie les produits puis les affiche dans la grille
function afficherProduits() {
  const produitsFiltres = [];

  // On parcourt tous les produits
  for (let i = 0; i < tousLesProduits.length; i++) {
    const p = tousLesProduits[i];

    // Filtre catégorie
    if (categoriesActives.length > 0 && categoriesActives.indexOf(p.categorie) === -1) {
      continue;
    }

    // Filtre permis
    if (permisActifs.length > 0) {
      let permisOk = false;
      for (let j = 0; j < p.caracteristiques.permis.length; j++) {
        if (permisActifs.indexOf(p.caracteristiques.permis[j]) !== -1) {
          permisOk = true;
        }
      }
      if (!permisOk) continue;
    }

    // Filtre prix max
    if (p.prix > prixMax) continue;

    produitsFiltres.push(p);
  }

  // Tri selon l'option choisie
  if (triActif === 'prix-asc') {
    produitsFiltres.sort((a, b) => a.prix - b.prix);
  } else if (triActif === 'prix-desc') {
    produitsFiltres.sort((a, b) => b.prix - a.prix);
  } else if (triActif === 'nom-asc') {
    produitsFiltres.sort((a, b) => a.nom.localeCompare(b.nom));
  } else if (triActif === 'nom-desc') {
    produitsFiltres.sort((a, b) => b.nom.localeCompare(a.nom));
  }

  // Mise à jour du compteur
  const grid = document.getElementById('products-grid');
  document.getElementById('result-count').textContent = produitsFiltres.length + ' moto(s)';

  // Si aucun résultat
  if (produitsFiltres.length === 0) {
    grid.innerHTML = '<p class="empty-msg">Aucun produit trouvé.</p>';
    return;
  }

  // Affichage des cartes produits
  grid.innerHTML = '';
  for (let i = 0; i < produitsFiltres.length; i++) {
    grid.innerHTML += creerCarteHTML(produitsFiltres[i]);
  }
}

// Génère le HTML d'une carte produit
function creerCarteHTML(p) {
  const favoris = JSON.parse(localStorage.getItem('favoris') || '[]');
  const estFavori = favoris.indexOf(p.id) !== -1;

  const img1 = p.images[0] || '';
  const img2 = p.images[1] || '';

  const coeurBtn = estFavori ? '♥' : '♡';
  const classFav = estFavori ? 'card-fav-btn active' : 'card-fav-btn';

  // Construction du HTML de la carte
  let html = '<div class="product-card" onclick="window.location=\'product.html?id=' + p.id + '\'">';
  html += '<div class="card-image-wrapper">';

  if (img1) {
    html += '<img class="card-img card-img-primary" src="' + img1 + '" alt="' + p.nom + '" loading="lazy" />';
  }
  if (img2) {
    html += '<img class="card-img card-img-hover" src="' + img2 + '" alt="' + p.nom + '" loading="lazy" />';
  }

  html += '<span class="card-categorie">' + p.categorie + '</span>';
  html += '<button class="' + classFav + '" onclick="event.stopPropagation(); toggleFavoriCarte(\'' + p.id + '\', this)">' + coeurBtn + '</button>';
  html += '</div>';

  html += '<div class="card-body">';
  html += '<p class="card-nom">' + p.nom + '</p>';
  html += '<p class="card-prix">' + formatPrix(p.prix) + '</p>';
  html += '</div></div>';

  return html;
}

// Ajoute ou retire un produit des favoris depuis la carte
function toggleFavoriCarte(id, btn) {
  const favoris = JSON.parse(localStorage.getItem('favoris') || '[]');
  const index = favoris.indexOf(id);

  if (index !== -1) {
    favoris.splice(index, 1);
    btn.textContent = '♡';
    btn.classList.remove('active');
  } else {
    favoris.push(id);
    btn.textContent = '♥';
    btn.classList.add('active');
    showToast('Ajouté aux favoris');
  }

  localStorage.setItem('favoris', JSON.stringify(favoris));
  updateBadges();
}

// Met à jour les badges (favoris + panier)
function updateBadges() {
  const favoris = JSON.parse(localStorage.getItem('favoris') || '[]');
  const panier = JSON.parse(localStorage.getItem('panier') || '[]');

  let totalPanier = 0;
  for (let i = 0; i < panier.length; i++) {
    totalPanier += panier[i].quantite;
  }

  const bFav = document.getElementById('badge-favoris');
  const bPanier = document.getElementById('badge-panier');

  if (bFav) {
    bFav.textContent = favoris.length;
    bFav.dataset.count = favoris.length;
  }
  if (bPanier) {
    bPanier.textContent = totalPanier;
    bPanier.dataset.count = totalPanier;
  }
}
