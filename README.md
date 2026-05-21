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

- 🌐 **Le déploiement en ligne** GitHub Pages ne supporte pas Node.js donc j'ai dû utiliser Render pour héberger le backend et rendre le site accessible publiquement

## ✅ Ce que fait le site

- 🗂️ Afficher un catalogue de motos avec filtres et tri
- 🖼️ Page détail d'un produit avec carrousel d'images
- 🛒 Ajouter au panier et gérer les quantités
- ❤️ Ajouter des produits en favoris
- 📦 La commande met à jour le stock via l'API
