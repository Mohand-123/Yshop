# 🏍️ Yamaha Store

Site e-commerce de motos Yamaha fait en HTML CSS JS et Express.js.

## 🚀 Comment lancer le projet

Installer les dépendances :
```
npm install
```

Lancer le serveur :
```
npm start
```

Ouvrir dans le navigateur : http://localhost:3000

## 🛠️ Technologies utilisées

- 🎨 Frontend : HTML, CSS, JavaScript
- ⚙️ Backend : Node.js avec Express
- 💾 Les données sont stockées dans un fichier JSON

## 😤 Les difficultés rencontrées

- 🔄 **Le carrousel** était compliqué à faire, j'arrivais pas à synchroniser les dots avec les images, j'ai dû revoir ma logique plusieurs fois

- 🔗 **Relier le frontend au backend** j'avais des erreurs CORS au début parce que je savais pas qu'il fallait ajouter le middleware cors() dans Express

- 🔍 **Les filtres combinés** quand on coche plusieurs filtres en même temps ça marchait pas, fallait bien gérer les tableaux et les conditions

- 🌐 **Rendre le site accessible en ligne** GitHub Pages ne supporte pas Node.js, j'ai essayé plusieurs solutions puis j'ai utilisé Cloudflare Tunnel avec la commande `npx cloudflared tunnel --url http://localhost:3000` qui crée un lien public sans compte ni installation, le site est alors accessible depuis n'importe quel appareil

## ✅ Ce que fait le site

- 🗂️ Afficher un catalogue de motos avec filtres et tri
- 🖼️ Page détail d'un produit avec carrousel d'images
- 🛒 Ajouter au panier et gérer les quantités
- ❤️ Ajouter des produits en favoris
- 📦 La commande met à jour le stock via l'API
