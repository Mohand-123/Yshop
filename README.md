# YSHOP3 — E-commerce Yamaha Motos

Site e-commerce de vente de motos Yamaha, développé en HTML/CSS/JS (frontend) et Express.js (backend).

## Stack technique

- **Frontend** : HTML5, CSS3, JavaScript vanilla (aucun framework)
- **Backend** : Node.js + Express.js
- **Données** : Fichiers JSON

## Lancer le projet

### 1. Installer les dépendances

```bash
npm install
```

### 2. Démarrer le serveur

```bash
npm start
```

Ou en mode développement avec rechargement automatique :

```bash
npm run dev
```

### 3. Ouvrir dans le navigateur

```
http://localhost:3000
```

## Structure du projet

```
YSHOP3/
├── backend/
│   ├── data/
│   │   └── products.json       # Base de données des produits
│   ├── routes/
│   │   └── produits.js         # Routes API Express
│   └── server.js               # Point d'entrée du serveur
├── frontend/
│   ├── css/
│   │   └── style.css           # Feuille de style principale
│   ├── images/                 # Images des produits
│   ├── js/
│   │   ├── api.js              # Fonctions de communication avec l'API
│   │   ├── catalogue.js        # Page catalogue (filtres, tri, grille)
│   │   ├── cart.js             # Page panier
│   │   ├── favorites.js        # Page favoris
│   │   └── product.js          # Page produit (carrousel, détails)
│   ├── index.html              # Catalogue
│   ├── product.html            # Détail produit
│   ├── cart.html               # Panier
│   └── favorites.html          # Favoris
├── package.json
└── README.md
```

## API

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/produits` | Récupère tous les produits |
| GET | `/api/produits/:id` | Récupère un produit par ID |
| PUT | `/api/produits/:id/stock` | Met à jour le stock |

## Fonctionnalités

- Catalogue de 24 motos Yamaha (Sport, Naked, Adventure, Rétro, Motocross, Enduro, Custom)
- Filtres par catégorie, permis et prix maximum
- Tri par prix ou nom
- Page produit avec carrousel d'images, description tronquée, sélecteur de couleur
- Produits similaires automatiques
- Panier persistant (localStorage)
- Favoris persistants (localStorage)
- Gestion des stocks via API
- Design responsive thème sombre
