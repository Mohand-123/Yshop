document.addEventListener('DOMContentLoaded', function() {
  afficherPanier();
  updateBadges();
  document.getElementById('btn-checkout').addEventListener('click', commander);
});

function getPanier() {
  return JSON.parse(localStorage.getItem('panier') || '[]');
}

function sauvegarderPanier(panier) {
  localStorage.setItem('panier', JSON.stringify(panier));
}

function afficherPanier() {
  const panier = getPanier();
  const container = document.getElementById('cart-items');
  const btnCommander = document.getElementById('btn-checkout');

  if (panier.length === 0) {
    container.innerHTML = '<p class="empty-msg">Votre panier est vide.</p>';
    btnCommander.disabled = true;
    document.getElementById('cart-sous-total').textContent = '0 €';
    document.getElementById('cart-total').textContent = '0 €';
    return;
  }

  btnCommander.disabled = false;
  container.innerHTML = '';

  let total = 0;
  for (let i = 0; i < panier.length; i++) {
    const item = panier[i];
    const sousTotal = item.prix * item.quantite;
    total += sousTotal;

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
      + '<button class="qty-btn" onclick="changerQuantite(\'' + item.id + '\', \'' + item.couleur + '\', -1)">−</button>'
      + '<span class="qty-value">' + item.quantite + '</span>'
      + '<button class="qty-btn" onclick="changerQuantite(\'' + item.id + '\', \'' + item.couleur + '\', 1)">+</button>'
      + '</div>'
      + '<button class="btn-remove" onclick="supprimerArticle(\'' + item.id + '\', \'' + item.couleur + '\')">Supprimer</button>'
      + '</div></div></div>';
  }

  document.getElementById('cart-sous-total').textContent = formatPrix(total);
  document.getElementById('cart-total').textContent = formatPrix(total);
}

function changerQuantite(id, couleur, delta) {
  const panier = getPanier();

  for (let i = 0; i < panier.length; i++) {
    if (panier[i].id === id && panier[i].couleur === couleur) {
      panier[i].quantite += delta;
      if (panier[i].quantite <= 0) {
        panier.splice(i, 1);
      }
      break;
    }
  }

  sauvegarderPanier(panier);
  afficherPanier();
  updateBadges();
}

function supprimerArticle(id, couleur) {
  const panier = getPanier();
  const nouveauPanier = [];

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

async function commander() {
  const panier = getPanier();
  if (panier.length === 0) return;

  document.getElementById('btn-checkout').textContent = 'Traitement...';
  document.getElementById('btn-checkout').disabled = true;

  const produits = await getAllProduits();

  for (let i = 0; i < panier.length; i++) {
    const item = panier[i];
    let produit = null;
    for (let j = 0; j < produits.length; j++) {
      if (produits[j].id === item.id) {
        produit = produits[j];
      }
    }
    if (produit && produit.stock >= item.quantite) {
      await updateStock(item.id, produit.stock - item.quantite);
    }
  }

  localStorage.removeItem('panier');
  showToast('Commande confirmée ! Merci.');
  afficherPanier();
  updateBadges();
}

function updateBadges() {
  const favoris = JSON.parse(localStorage.getItem('favoris') || '[]');
  const panier = getPanier();

  let totalPanier = 0;
  for (let i = 0; i < panier.length; i++) {
    totalPanier += panier[i].quantite;
  }

  const bFav = document.getElementById('badge-favoris');
  const bPanier = document.getElementById('badge-panier');
  if (bFav) { bFav.textContent = favoris.length; bFav.dataset.count = favoris.length; }
  if (bPanier) { bPanier.textContent = totalPanier; bPanier.dataset.count = totalPanier; }
}
