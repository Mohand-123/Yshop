// Initialise la page panier
document.addEventListener('DOMContentLoaded', () => {
  afficherPanier();
  updateBadges();
  document.getElementById('btn-checkout').addEventListener('click', commander);
});

// Lit le panier depuis le localStorage
function getPanier() {
  return JSON.parse(localStorage.getItem('panier') || '[]');
}

// Sauvegarde le panier dans le localStorage
function sauvegarderPanier(panier) {
  localStorage.setItem('panier', JSON.stringify(panier));
}

// Affiche tous les articles du panier et le récapitulatif
function afficherPanier() {
  const panier = getPanier();
  const container = document.getElementById('cart-items');
  const btnCommander = document.getElementById('btn-checkout');

  if (panier.length === 0) {
    container.innerHTML = '<p class="empty-msg">Votre panier est vide.</p>';
    btnCommander.disabled = true;
    calculerTotal(panier);
    return;
  }

  btnCommander.disabled = false;
  container.innerHTML = panier.map(item => creerItemHTML(item)).join('');
  calculerTotal(panier);
}

// Génère le HTML d'un article du panier
function creerItemHTML(item) {
  const total = item.prix * item.quantite;
  return `
    <div class="cart-item" data-id="${item.id}" data-couleur="${item.couleur}">
      ${item.image
        ? `<img class="cart-item-img" src="${item.image}" alt="${item.nom}" />`
        : '<div class="cart-item-img" style="background:var(--surface2)"></div>'}
      <div>
        <p class="cart-item-nom">${item.nom}</p>
        <p class="cart-item-couleur">Couleur : ${item.couleur}</p>
        <p class="cart-item-prix">${formatPrix(item.prix)} / unité</p>
      </div>
      <div class="cart-item-controls">
        <p class="cart-item-total">${formatPrix(total)}</p>
        <div class="cart-item-actions">
          <div class="quantity-selector">
            <button class="qty-btn" onclick="changerQuantite('${item.id}', '${item.couleur}', -1)">−</button>
            <span class="qty-value">${item.quantite}</span>
            <button class="qty-btn" onclick="changerQuantite('${item.id}', '${item.couleur}', 1)">+</button>
          </div>
          <button class="btn-remove" onclick="supprimerArticle('${item.id}', '${item.couleur}')">Supprimer</button>
        </div>
      </div>
    </div>`;
}

// Modifie la quantité d'un article (+1 ou -1), supprime si 0
function changerQuantite(id, couleur, delta) {
  const panier = getPanier();
  const index = panier.findIndex(i => i.id === id && i.couleur === couleur);
  if (index === -1) return;

  panier[index].quantite += delta;
  if (panier[index].quantite <= 0) panier.splice(index, 1);

  sauvegarderPanier(panier);
  afficherPanier();
  updateBadges();
}

// Supprime un article du panier
function supprimerArticle(id, couleur) {
  const panier = getPanier().filter(i => !(i.id === id && i.couleur === couleur));
  sauvegarderPanier(panier);
  afficherPanier();
  updateBadges();
  showToast('Article retiré du panier');
}

// Calcule et affiche les totaux du récapitulatif
function calculerTotal(panier) {
  const total = panier.reduce((sum, item) => sum + item.prix * item.quantite, 0);
  document.getElementById('cart-sous-total').textContent = formatPrix(total);
  document.getElementById('cart-total').textContent = formatPrix(total);
}

// Finalise la commande : met à jour les stocks et vide le panier
async function commander() {
  const panier = getPanier();
  if (panier.length === 0) return;

  document.getElementById('btn-checkout').disabled = true;
  document.getElementById('btn-checkout').textContent = 'Traitement…';

  try {
    // Récupère les stocks actuels et vérifie la disponibilité
    const produits = await getAllProduits();
    for (const item of panier) {
      const produit = produits.find(p => p.id === item.id);
      if (!produit || produit.stock < item.quantite) {
        showToast(`Stock insuffisant pour ${item.nom}`);
        document.getElementById('btn-checkout').disabled = false;
        document.getElementById('btn-checkout').textContent = 'Commander';
        return;
      }
    }

    // Met à jour le stock de chaque produit acheté
    for (const item of panier) {
      const produit = produits.find(p => p.id === item.id);
      await updateStock(item.id, produit.stock - item.quantite);
    }

    localStorage.removeItem('panier');
    showToast('Commande confirmée ! Merci pour votre achat.', 'success');
    setTimeout(() => {
      afficherPanier();
      updateBadges();
    }, 500);

  } catch (e) {
    showToast('Erreur lors de la commande, réessayez.');
    document.getElementById('btn-checkout').disabled = false;
    document.getElementById('btn-checkout').textContent = 'Commander';
  }
}

// Met à jour les badges header
function updateBadges() {
  const favCount = JSON.parse(localStorage.getItem('favoris') || '[]').length;
  const cartCount = getPanier().reduce((s, i) => s + i.quantite, 0);
  const bFav = document.getElementById('badge-favoris');
  const bPanier = document.getElementById('badge-panier');
  if (bFav) { bFav.textContent = favCount; bFav.dataset.count = favCount; }
  if (bPanier) { bPanier.textContent = cartCount; bPanier.dataset.count = cartCount; }
}
