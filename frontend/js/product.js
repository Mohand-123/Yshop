let produitActuel = null;
let indexCarousel = 0;
let quantite = 1;
let couleurSelectionnee = '';
let descriptionAffichee = false;

// Chargement de la page produit
document.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) {
    window.location = 'index.html';
    return;
  }
  chargerProduit(id);
  updateBadges();
});

// Charge le produit depuis l'API
async function chargerProduit(id) {
  produitActuel = await getProduit(id);
  afficherProduit(produitActuel);
  chargerSimilaires(produitActuel);
}

// Affiche toutes les informations du produit
function afficherProduit(p) {
  document.title = p.nom + ' — YSHOPPP';
  document.getElementById('product-categorie').textContent = p.categorie;
  document.getElementById('product-nom').textContent = p.nom;
  document.getElementById('product-prix').textContent = formatPrix(p.prix);

  // Stock
  const stockEl = document.getElementById('stock-indicator');
  if (p.stock <= 0) {
    stockEl.textContent = 'Rupture de stock';
    stockEl.className = 'stock-indicator rupture';
    document.getElementById('btn-add-cart').disabled = true;
  } else if (p.stock <= 2) {
    stockEl.textContent = 'Plus que ' + p.stock + ' en stock !';
    stockEl.className = 'stock-indicator stock-faible';
  } else {
    stockEl.textContent = 'En stock (' + p.stock + ' disponibles)';
    stockEl.className = 'stock-indicator en-stock';
  }

  // Carrousel
  construireCarousel(p.images);

  // Description tronquée à 150 caractères
  const descEl = document.getElementById('description-text');
  const btnLire = document.getElementById('btn-lire-plus');
  if (p.description.length > 150) {
    descEl.textContent = p.description.substring(0, 150) + '...';
    btnLire.style.display = 'block';
    btnLire.addEventListener('click', function() {
      if (descriptionAffichee) {
        descEl.textContent = p.description.substring(0, 150) + '...';
        btnLire.textContent = 'Lire la suite';
        descriptionAffichee = false;
      } else {
        descEl.textContent = p.description;
        btnLire.textContent = 'Réduire';
        descriptionAffichee = true;
      }
    });
  } else {
    descEl.textContent = p.description;
  }

  // Couleurs
  couleurSelectionnee = p.caracteristiques.couleurs[0];
  const couleursEl = document.getElementById('couleurs-selector');
  couleursEl.innerHTML = '';
  for (let i = 0; i < p.caracteristiques.couleurs.length; i++) {
    const couleur = p.caracteristiques.couleurs[i];
    const actif = i === 0 ? 'active' : '';
    couleursEl.innerHTML += '<button class="couleur-btn ' + actif + '" onclick="selectionnerCouleur(\'' + couleur + '\', this)">' + couleur + '</button>';
  }

  // Caractéristiques
  const table = document.getElementById('carac-table');
  table.innerHTML = '';
  table.innerHTML += '<tr><td>Type</td><td>' + p.caracteristiques.type + '</td></tr>';
  table.innerHTML += '<tr><td>Cylindrée</td><td>' + p.caracteristiques.cylindree + '</td></tr>';
  table.innerHTML += '<tr><td>Puissance</td><td>' + p.caracteristiques.puissance + '</td></tr>';
  table.innerHTML += '<tr><td>Poids</td><td>' + p.caracteristiques.poids + '</td></tr>';
  table.innerHTML += '<tr><td>Permis</td><td>' + p.caracteristiques.permis.join(', ') + '</td></tr>';
  table.innerHTML += '<tr><td>Année</td><td>' + p.caracteristiques.annee + '</td></tr>';
  table.innerHTML += '<tr><td>Sexe</td><td>' + p.caracteristiques.sexe + '</td></tr>';

  // Boutons panier et favoris
  document.getElementById('btn-add-cart').addEventListener('click', function() {
    ajouterAuPanier(p);
  });
  document.getElementById('qty-minus').addEventListener('click', function() {
    if (quantite > 1) {
      quantite--;
      document.getElementById('qty-value').textContent = quantite;
    }
  });
  document.getElementById('qty-plus').addEventListener('click', function() {
    if (quantite < p.stock) {
      quantite++;
      document.getElementById('qty-value').textContent = quantite;
    }
  });

  // Bouton favori
  const favoris = JSON.parse(localStorage.getItem('favoris') || '[]');
  const btnFav = document.getElementById('btn-fav');
  if (favoris.indexOf(p.id) !== -1) {
    btnFav.textContent = '♥';
    btnFav.classList.add('active');
  } else {
    btnFav.textContent = '♡';
  }
  btnFav.addEventListener('click', function() {
    toggleFavori(p.id, btnFav);
  });
}

// Construit le carrousel d'images
function construireCarousel(images) {
  const track = document.getElementById('carousel-track');
  const dots = document.getElementById('carousel-dots');

  track.innerHTML = '';
  dots.innerHTML = '';

  for (let i = 0; i < images.length; i++) {
    track.innerHTML += '<div class="carousel-slide"><img src="' + images[i] + '" alt="photo" /></div>';
    const actif = i === 0 ? 'active' : '';
    dots.innerHTML += '<span class="dot ' + actif + '" onclick="allerSlide(' + i + ')"></span>';
  }

  document.getElementById('carousel-prev').addEventListener('click', function() {
    allerSlide(indexCarousel - 1);
  });
  document.getElementById('carousel-next').addEventListener('click', function() {
    allerSlide(indexCarousel + 1);
  });
}

// Navigue vers un slide
function allerSlide(index) {
  const slides = document.querySelectorAll('.carousel-slide');
  if (slides.length === 0) return;

  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;

  indexCarousel = index;
  document.getElementById('carousel-track').style.transform = 'translateX(-' + indexCarousel * 100 + '%)';

  const dotsList = document.querySelectorAll('.dot');
  for (let i = 0; i < dotsList.length; i++) {
    dotsList[i].classList.remove('active');
  }
  dotsList[indexCarousel].classList.add('active');
}

// Change la couleur sélectionnée
function selectionnerCouleur(couleur, btn) {
  couleurSelectionnee = couleur;
  const boutons = document.querySelectorAll('.couleur-btn');
  for (let i = 0; i < boutons.length; i++) {
    boutons[i].classList.remove('active');
  }
  btn.classList.add('active');
}

// Ajoute le produit au panier
function ajouterAuPanier(p) {
  const panier = JSON.parse(localStorage.getItem('panier') || '[]');
  let trouve = false;

  for (let i = 0; i < panier.length; i++) {
    if (panier[i].id === p.id && panier[i].couleur === couleurSelectionnee) {
      panier[i].quantite += quantite;
      trouve = true;
    }
  }

  if (!trouve) {
    panier.push({
      id: p.id,
      nom: p.nom,
      prix: p.prix,
      devise: p.devise,
      image: p.images[0],
      couleur: couleurSelectionnee,
      quantite: quantite
    });
  }

  localStorage.setItem('panier', JSON.stringify(panier));
  showToast(p.nom + ' ajouté au panier');
  updateBadges();
}

// Ajoute ou retire un favori
function toggleFavori(id, btn) {
  const favoris = JSON.parse(localStorage.getItem('favoris') || '[]');
  const index = favoris.indexOf(id);

  if (index !== -1) {
    favoris.splice(index, 1);
    btn.textContent = '♡';
    btn.classList.remove('active');
    showToast('Retiré des favoris');
  } else {
    favoris.push(id);
    btn.textContent = '♥';
    btn.classList.add('active');
    showToast('Ajouté aux favoris');
  }

  localStorage.setItem('favoris', JSON.stringify(favoris));
  updateBadges();
}

// Charge les produits similaires (même catégorie)
async function chargerSimilaires(produit) {
  const tous = await getAllProduits();
  const similaires = [];

  for (let i = 0; i < tous.length; i++) {
    if (tous[i].categorie === produit.categorie && tous[i].id !== produit.id) {
      similaires.push(tous[i]);
    }
    if (similaires.length >= 4) break;
  }

  const grid = document.getElementById('similar-grid');
  if (similaires.length === 0) {
    grid.innerHTML = '<p class="empty-msg">Aucun produit similaire.</p>';
    return;
  }

  grid.innerHTML = '';
  for (let i = 0; i < similaires.length; i++) {
    const p = similaires[i];
    grid.innerHTML += '<div class="product-card" onclick="window.location=\'product.html?id=' + p.id + '\'">'
      + '<div class="card-image-wrapper"><img class="card-img card-img-primary" src="' + p.images[0] + '" alt="' + p.nom + '" />'
      + '<span class="card-categorie">' + p.categorie + '</span></div>'
      + '<div class="card-body"><p class="card-nom">' + p.nom + '</p>'
      + '<p class="card-prix">' + formatPrix(p.prix) + '</p></div></div>';
  }
}

// Met à jour les badges du header
function updateBadges() {
  const favoris = JSON.parse(localStorage.getItem('favoris') || '[]');
  const panier = JSON.parse(localStorage.getItem('panier') || '[]');

  let totalPanier = 0;
  for (let i = 0; i < panier.length; i++) {
    totalPanier += panier[i].quantite;
  }

  const bFav = document.getElementById('badge-favoris');
  const bPanier = document.getElementById('badge-panier');
  if (bFav) { bFav.textContent = favoris.length; bFav.dataset.count = favoris.length; }
  if (bPanier) { bPanier.textContent = totalPanier; bPanier.dataset.count = totalPanier; }
}
