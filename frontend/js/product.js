// Données du produit courant et état local
let produitActuel = null;
let indexCarousel = 0;
let quantite = 1;
let couleurSelectionnee = '';
let descriptionComplete = false;

// Initialise la page produit
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) { window.location = 'index.html'; return; }

  chargerProduit(id);
  updateBadges();
});

// Charge le produit depuis l'API et construit la page
async function chargerProduit(id) {
  try {
    produitActuel = await getProduit(id);
    afficherProduit(produitActuel);
    chargerProduitsSimilaires(produitActuel);
  } catch (e) {
    document.querySelector('.product-layout').innerHTML =
      '<p class="empty-msg">Produit introuvable.</p>';
  }
}

// Remplit tous les éléments de la page avec les données du produit
function afficherProduit(p) {
  document.title = `${p.nom} — YSHOP3`;

  document.getElementById('product-categorie').textContent = p.categorie;
  document.getElementById('product-nom').textContent = p.nom;
  document.getElementById('product-prix').textContent = formatPrix(p.prix);

  afficherStock(p.stock);
  construireCarousel(p.images);
  afficherDescription(p.description);
  afficherCouleurs(p.caracteristiques.couleurs);
  afficherCaracteristiques(p.caracteristiques);
  initialiserFavoriBtn(p.id);

  document.getElementById('btn-add-cart').addEventListener('click', () => ajouterAuPanier(p));
  document.getElementById('qty-minus').addEventListener('click', () => changerQuantite(-1));
  document.getElementById('qty-plus').addEventListener('click', () => changerQuantite(1));
}

// Affiche l'indicateur de stock avec la bonne couleur
function afficherStock(stock) {
  const el = document.getElementById('stock-indicator');
  if (stock <= 0) {
    el.textContent = 'Rupture de stock';
    el.className = 'stock-indicator rupture';
    document.getElementById('btn-add-cart').disabled = true;
  } else if (stock <= 2) {
    el.textContent = `Plus que ${stock} en stock !`;
    el.className = 'stock-indicator stock-faible';
  } else {
    el.textContent = `En stock (${stock} disponibles)`;
    el.className = 'stock-indicator en-stock';
  }
}

// Construit le carrousel d'images avec navigation et dots
function construireCarousel(images) {
  const track = document.getElementById('carousel-track');
  const dotsContainer = document.getElementById('carousel-dots');
  const prev = document.getElementById('carousel-prev');
  const next = document.getElementById('carousel-next');

  if (!images || images.length === 0) {
    track.innerHTML = '<div class="carousel-slide"><div class="no-image">Pas d\'image</div></div>';
    return;
  }

  track.innerHTML = images.map(src => `
    <div class="carousel-slide">
      <img src="${src}" alt="Photo du produit" />
    </div>`).join('');

  dotsContainer.innerHTML = images.map((_, i) =>
    `<span class="dot ${i === 0 ? 'active' : ''}" onclick="allerSlide(${i})"></span>`
  ).join('');

  prev.addEventListener('click', () => allerSlide(indexCarousel - 1));
  next.addEventListener('click', () => allerSlide(indexCarousel + 1));
}

// Navigue vers un slide du carrousel
function allerSlide(index) {
  const slides = document.querySelectorAll('.carousel-slide');
  if (slides.length === 0) return;
  indexCarousel = (index + slides.length) % slides.length;
  document.getElementById('carousel-track').style.transform =
    `translateX(-${indexCarousel * 100}%)`;
  document.querySelectorAll('.dot').forEach((d, i) =>
    d.classList.toggle('active', i === indexCarousel));
}

// Affiche la description tronquée à 150 caractères avec bouton "Lire la suite"
function afficherDescription(description) {
  const el = document.getElementById('description-text');
  const btn = document.getElementById('btn-lire-plus');
  const LIMITE = 150;

  if (description.length <= LIMITE) {
    el.textContent = description;
    return;
  }

  el.textContent = description.slice(0, LIMITE) + '…';
  btn.style.display = 'block';

  btn.addEventListener('click', () => {
    descriptionComplete = !descriptionComplete;
    el.textContent = descriptionComplete ? description : description.slice(0, LIMITE) + '…';
    btn.textContent = descriptionComplete ? 'Réduire' : 'Lire la suite';
  });
}

// Affiche les boutons de sélection de couleur
function afficherCouleurs(couleurs) {
  const container = document.getElementById('couleurs-selector');
  couleurSelectionnee = couleurs[0];
  container.innerHTML = couleurs.map((c, i) => `
    <button class="couleur-btn ${i === 0 ? 'active' : ''}"
      onclick="selectionnerCouleur('${c}', this)">
      ${c}
    </button>`).join('');
}

// Met à jour la couleur sélectionnée visuellement
function selectionnerCouleur(couleur, btn) {
  couleurSelectionnee = couleur;
  document.querySelectorAll('.couleur-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// Construit le tableau des caractéristiques techniques
function afficherCaracteristiques(carac) {
  const labels = {
    sexe: 'Sexe',
    type: 'Type',
    cylindree: 'Cylindrée',
    puissance: 'Puissance',
    poids: 'Poids',
    annee: 'Année',
    permis: 'Permis requis'
  };

  const table = document.getElementById('carac-table');
  table.innerHTML = Object.entries(labels).map(([key, label]) => {
    if (!carac[key]) return '';
    const val = Array.isArray(carac[key]) ? carac[key].join(', ') : carac[key];
    return `<tr><td>${label}</td><td>${val}</td></tr>`;
  }).join('');
}

// Change la quantité souhaitée dans le sélecteur
function changerQuantite(delta) {
  const stock = produitActuel ? produitActuel.stock : 1;
  quantite = Math.max(1, Math.min(stock, quantite + delta));
  document.getElementById('qty-value').textContent = quantite;
}

// Ajoute le produit au panier dans le localStorage
function ajouterAuPanier(p) {
  const panier = JSON.parse(localStorage.getItem('panier') || '[]');
  const existant = panier.find(item => item.id === p.id && item.couleur === couleurSelectionnee);

  if (existant) {
    existant.quantite = Math.min(p.stock, existant.quantite + quantite);
  } else {
    panier.push({
      id: p.id,
      nom: p.nom,
      prix: p.prix,
      devise: p.devise,
      image: p.images[0] || '',
      couleur: couleurSelectionnee,
      quantite: quantite
    });
  }

  localStorage.setItem('panier', JSON.stringify(panier));
  showToast(`${p.nom} ajouté au panier`, 'success');
  updateBadges();
}

// Initialise le bouton favori selon l'état en localStorage
function initialiserFavoriBtn(id) {
  const btn = document.getElementById('btn-fav');
  const favoris = JSON.parse(localStorage.getItem('favoris') || '[]');
  const estFavori = favoris.includes(id);

  btn.textContent = estFavori ? '♥' : '♡';
  if (estFavori) btn.classList.add('active');

  btn.addEventListener('click', () => toggleFavori(id, btn));
}

// Bascule le favori du produit actuel
function toggleFavori(id, btn) {
  let favoris = JSON.parse(localStorage.getItem('favoris') || '[]');
  if (favoris.includes(id)) {
    favoris = favoris.filter(f => f !== id);
    btn.textContent = '♡';
    btn.classList.remove('active');
    showToast('Retiré des favoris');
  } else {
    favoris.push(id);
    btn.textContent = '♥';
    btn.classList.add('active');
    showToast('Ajouté aux favoris', 'success');
  }
  localStorage.setItem('favoris', JSON.stringify(favoris));
  updateBadges();
}

// Charge et affiche les produits de la même catégorie (hors produit actuel)
async function chargerProduitsSimilaires(produit) {
  try {
    const tous = await getAllProduits();
    const similaires = tous
      .filter(p => p.categorie === produit.categorie && p.id !== produit.id)
      .slice(0, 4);

    const grid = document.getElementById('similar-grid');
    if (similaires.length === 0) {
      grid.innerHTML = '<p class="empty-msg">Aucun produit similaire.</p>';
      return;
    }
    grid.innerHTML = similaires.map(p => creerCarteSimple(p)).join('');
  } catch (e) {
    document.getElementById('similar-grid').innerHTML = '';
  }
}

// Génère une carte produit simplifiée pour la section similaires
function creerCarteSimple(p) {
  return `
    <div class="product-card" onclick="window.location='product.html?id=${p.id}'">
      <div class="card-image-wrapper">
        ${p.images[0]
          ? `<img class="card-img card-img-primary" src="${p.images[0]}" alt="${p.nom}" loading="lazy" />`
          : '<div class="no-image">Pas d\'image</div>'}
        <span class="card-categorie">${p.categorie}</span>
      </div>
      <div class="card-body">
        <p class="card-nom">${p.nom}</p>
        <p class="card-prix">${formatPrix(p.prix)}</p>
      </div>
    </div>`;
}

// Met à jour les badges header
function updateBadges() {
  const favCount = JSON.parse(localStorage.getItem('favoris') || '[]').length;
  const cartCount = JSON.parse(localStorage.getItem('panier') || '[]')
    .reduce((s, i) => s + i.quantite, 0);
  const bFav = document.getElementById('badge-favoris');
  const bPanier = document.getElementById('badge-panier');
  if (bFav) { bFav.textContent = favCount; bFav.dataset.count = favCount; }
  if (bPanier) { bPanier.textContent = cartCount; bPanier.dataset.count = cartCount; }
}
