document.addEventListener('DOMContentLoaded', function() {
  chargerFavoris();
  updateBadges();
});

// retourne la liste des ids favoris depuis le localstorage
function getFavoris() {
  return JSON.parse(localStorage.getItem('favoris') || '[]');
}

// charge les produits favoris depuis l'api et les affiche
async function chargerFavoris() {
  const ids = getFavoris();
  const grid = document.getElementById('favorites-grid');

  if (ids.length === 0) {
    grid.innerHTML = '<p class="empty-msg">Vous n\'avez aucun favori.</p>';
    return;
  }

  const tous = await getAllProduits();
  const favoris = [];

  for (let i = 0; i < tous.length; i++) {
    if (ids.indexOf(tous[i].id) !== -1) {
      favoris.push(tous[i]);
    }
  }

  grid.innerHTML = '';
  for (let i = 0; i < favoris.length; i++) {
    const p = favoris[i];
    grid.innerHTML += '<div class="product-card">'
      + '<div class="card-image-wrapper" onclick="window.location=\'product.html?id=' + p.id + '\'" style="cursor:pointer">'
      + '<img class="card-img card-img-primary" src="' + p.images[0] + '" alt="' + p.nom + '" />'
      + '<span class="card-categorie">' + p.categorie + '</span>'
      + '</div>'
      + '<div class="card-body" onclick="window.location=\'product.html?id=' + p.id + '\'" style="cursor:pointer">'
      + '<p class="card-nom">' + p.nom + '</p>'
      + '<p class="card-prix">' + formatPrix(p.prix) + '</p>'
      + '</div>'
      + '<div class="fav-card-actions">'
      + '<button class="btn-fav-cart" onclick="ajouterAuPanier(\'' + p.id + '\', \'' + p.nom + '\', ' + p.prix + ', \'' + p.devise + '\', \'' + p.images[0] + '\', \'' + p.caracteristiques.couleurs[0] + '\')">Ajouter au panier</button>'
      + '<button class="btn-fav-remove" onclick="supprimerFavori(\'' + p.id + '\')">✕</button>'
      + '</div></div>';
  }
}

// enlève un produit des favoris et recharge la liste
function supprimerFavori(id) {
  const favoris = getFavoris();
  const newFavoris = [];
  for (let i = 0; i < favoris.length; i++) {
    if (favoris[i] !== id) newFavoris.push(favoris[i]);
  }
  localStorage.setItem('favoris', JSON.stringify(newFavoris));
  showToast('Retiré des favoris');
  chargerFavoris();
  updateBadges();
}

function ajouterAuPanier(id, nom, prix, devise, image, couleur) {
  const panier = JSON.parse(localStorage.getItem('panier') || '[]');
  let trouve = false;

  for (let i = 0; i < panier.length; i++) {
    if (panier[i].id === id && panier[i].couleur === couleur) {
      panier[i].quantite += 1;
      trouve = true;
    }
  }

  if (!trouve) {
    panier.push({ id: id, nom: nom, prix: prix, devise: devise, image: image, couleur: couleur, quantite: 1 });
  }

  localStorage.setItem('panier', JSON.stringify(panier));
  showToast(nom + ' ajouté au panier');
  updateBadges();
}

function updateBadges() {
  const favoris = getFavoris();
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
