// Quand la page est chargée, on affiche le panier, on met à jour les badges
// et on active le bouton "Commander"
document.addEventListener('DOMContentLoaded', function() {
  afficherPanier();
  updateBadges();
  document.getElementById('btn-checkout').addEventListener('click', commander);
});

// Récupère le panier stocké dans le localStorage
function getPanier() {
  return JSON.parse(localStorage.getItem('panier') || '[]');
}

// Sauvegarde le panier dans le localStorage
function sauvegarderPanier(panier) {
  localStorage.setItem('panier', JSON.stringify(panier));
}

// Affiche tous les articles du panier + calcule le total
function afficherPanier() {
  const panier = getPanier();
  const container = document.getElementById('cart-items');
  const btnCommander = document.getElementById('btn-checkout');

  // Si le panier est vide
  if (panier.length === 0) {
    container.innerHTML = '<p class="empty-msg">Votre panier est vide.</p>';
    btnCommander.disabled = true;
    document.getElementById('cart-sous-total').textContent = '0 €';
    document.getElementById('cart-total').textContent = '0 €';
    return;
  }

  // Sinon on active le bouton et on vide l'affichage
  btnCommander.disabled = false;
  container.innerHTML = '';

  let total = 0;

  // On parcourt chaque article du panier
  for (let i = 0; i < panier.length; i++) {
    const item = panier[i];
    const sousTotal = item.prix * item.quantite;
    total += sousTotal;

    // On ajoute l'article dans le HTML
    container.innerHTML += '<div class="cart-item">'
      + '<img class="cart-item-img" src="' + item.image + '" alt="' + item.nom + '" />'
      + '<div>'
      + '<p class="cart-item-nom">' + item.nom + '</p>'
      + '<p class="cart-item-couleur">Couleur : ' + item.couleur + '</p>'
      + '<p class="cart-item-prix">' + formatPrix(item.prix) + ' / unité</p>'
      + '</div>'
      + '<div class="cart-item-controls">'
      + '<p class="cart-item-total">' + formatPrix(sousTotal) + '</p>'
      + '<div class="cart-item-actions">'
      + '<div class="quantity-selector">'
      // Bouton pour diminuer la quantité
      + '<button class="qty-btn" onclick="changerQuantite(\'' + item.id + '\', \'' + item.couleur + '\', -1)">−</button>'
      + '<span class="qty-value">' + item.quantite + '</span>'
      // Bouton pour augmenter la quantité
      + '<button class="qty-btn" onclick="changerQuantite(\'' + item.id + '\', \'' + item.couleur + '\', 1)">+</button>'
      + '</div>'
      // Bouton pour supprimer l'article
      + '<button class="btn-remove" onclick="supprimerArticle(\'' + item.id + '\', \'' + item.couleur + '\')">Supprimer</button>'
      + '</div></div></div>';
  }

  // Mise à jour du total affiché
  document.getElementById('cart-sous-total').textContent = formatPrix(total);
  document.getElementById('cart-total').textContent = formatPrix(total);
}

// Change la quantité d'un article (+1 ou -1)
// Si la quantité tombe à 0 → on supprime l'article
function changerQuantite(id, couleur, delta) {
  const panier = getPanier();

  // On cherche l'article dans le panier
  for (let i = 0; i < panier.length; i++) {
    if (panier[i].id === id && panier[i].couleur === couleur) {
      panier[i].quantite += delta;

      // Si quantité <= 0 → on retire l'article
      if (panier[i].quantite <= 0) {
        panier.splice(i, 1);
      }
      break;
    }
  }

  // On sauvegarde et on rafraîchit l'affichage
  sauvegarderPanier(panier);
  afficherPanier();
  updateBadges();
}

// Supprime complètement un article du panier
function supprimerArticle(id, couleur) {
  const panier = getPanier();
  const nouveauPanier = [];

  // On garde seulement les articles qui ne correspondent pas à celui à supprimer
  for (let i = 0; i < panier.length; i++) {
    if (panier[i].id !== id || panier[i].couleur !== couleur) {
      nouveauPanier.push(panier[i]);
    }
  }

  sauvegarderPanier(nouveauPanier);
  afficherPanier();
  updateBadges();
  showToast('Article supprimé du panier');
}

// Valide la commande et met à jour le stock côté serveur
async function commander() {
  const panier = getPanier();
  if (panier.length === 0) return;

  // On désactive le bouton pendant le traitement
  document.getElementById('btn-checkout').textContent = 'Traitement...';
  document.getElementById('btn-checkout').disabled = true;

  // On récupère tous les produits du serveur
  const produits = await getAllProduits();

  // Pour chaque article du panier, on met à jour le stock
  for (let i = 0; i < panier.length; i++) {
    const item = panier[i];
    let produit = null;

    // On cherche le produit correspondant
    for (let j = 0; j < produits.length; j++) {
      if (produits[j].id === item.id) {
        produit = produits[j];
      }
    }

    // Si le stock est suffisant → on met à jour
    if (produit && produit.stock >= item.quantite) {
      await updateStock(item.id, produit.stock - item.quantite);
    }
  }

  // On vide le panier après la commande
  localStorage.removeItem('panier');
  showToast('Commande confirmée ! Merci.');
  afficherPanier();
  updateBadges();
}

// Met à jour les badges (favoris + panier)
function updateBadges() {
  const favoris = JSON.parse(localStorage.getItem('favoris') || '[]');
  const panier = getPanier();

  // On calcule le nombre total d'articles dans le panier
  let totalPanier = 0;
  for (let i = 0; i < panier.length; i++) {
    totalPanier += panier[i].quantite;
  }

  // Mise à jour des badges si présents dans la page
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
