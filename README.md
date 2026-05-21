# 🏍️ Yamaha Store

Site e-commerce de motos Yamaha fait en HTML CSS JS et Express.js.

## 🚀 Option 1 — Lancer avec le serveur (version complète)

Installer les dépendances :
```
npm install
```

Lancer le serveur :
```
npm start
```

Ouvrir dans le navigateur : http://localhost:3000

> ✅ Version complète avec API, gestion des stocks en temps réel.

## ⚡ Option 2 — Lancer avec VS Code Live Server (version rapide)

1. Installer l'extension **Live Server** dans VS Code
2. Ouvrir le dossier `YSHOPPP` dans VS Code
3. Cliquer sur **"Go Live"** en bas à droite
4. Le site s'ouvre automatiquement sur http://127.0.0.1:5500

> ✅ Fonctionne sans Node.js. Parfait pour une démo rapide ou partager avec quelqu'un.


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
