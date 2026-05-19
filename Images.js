// Script de génération des images placeholder pour YSHOP3
// Lance avec : node generate-images.js

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'frontend', 'images');

// Palette de couleurs par catégorie
const CATEGORY_COLORS = {
  Sport:          { bg: '#0a0a1a', accent: '#0066ff', text: '#ffffff' },
  Naked:          { bg: '#0a0a0a', accent: '#00aaff', text: '#ffffff' },
  Adventure:      { bg: '#0d1a0d', accent: '#00cc44', text: '#ffffff' },
  Retro:          { bg: '#1a1005', accent: '#cc8800', text: '#ffffff' },
  Motocross:      { bg: '#1a0a0a', accent: '#ff3300', text: '#ffffff' },
  Enduro:         { bg: '#0a1a0a', accent: '#00bb33', text: '#ffffff' },
  Custom:         { bg: '#0d0d0d', accent: '#888888', text: '#ffffff' },
  'Sport Touring':{ bg: '#0a0a1a', accent: '#aa00ff', text: '#ffffff' },
};

// Toutes les images à générer : { file, nom, categorie, detail }
const IMAGES = [
  { file: 'yzf-r1-1.jpg',         nom: 'YZF-R1',              categorie: 'Sport',          detail: '999cc • 200ch' },
  { file: 'yzf-r1-2.jpg',         nom: 'YZF-R1',              categorie: 'Sport',          detail: 'Noir Matte' },
  { file: 'yzf-r1-3.jpg',         nom: 'YZF-R1',              categorie: 'Sport',          detail: 'Vue arrière' },
  { file: 'yzf-r6-1.jpg',         nom: 'YZF-R6',              categorie: 'Sport',          detail: '599cc • 118ch' },
  { file: 'yzf-r6-2.jpg',         nom: 'YZF-R6',              categorie: 'Sport',          detail: 'Angle dynamique' },
  { file: 'yzf-r6-3.jpg',         nom: 'YZF-R6',              categorie: 'Sport',          detail: 'Vue détail' },
  { file: 'yzf-r3-1.jpg',         nom: 'YZF-R3',              categorie: 'Sport',          detail: '321cc • 42ch' },
  { file: 'yzf-r3-2.jpg',         nom: 'YZF-R3',              categorie: 'Sport',          detail: 'Blanc Racing' },
  { file: 'yzf-r3-3.jpg',         nom: 'YZF-R3',              categorie: 'Sport',          detail: 'Vue profil' },
  { file: 'yzf-r125-1.jpg',       nom: 'YZF-R125',            categorie: 'Sport',          detail: '125cc • 15ch' },
  { file: 'yzf-r125-2.jpg',       nom: 'YZF-R125',            categorie: 'Sport',          detail: 'Bleu Racing' },
  { file: 'yzf-r125-3.jpg',       nom: 'YZF-R125',            categorie: 'Sport',          detail: 'Vue détail' },
  { file: 'mt-10-1.jpg',          nom: 'MT-10',               categorie: 'Naked',          detail: '998cc • 166ch' },
  { file: 'mt-10-2.jpg',          nom: 'MT-10',               categorie: 'Naked',          detail: 'Midnight Black' },
  { file: 'mt-10-3.jpg',          nom: 'MT-10',               categorie: 'Naked',          detail: 'Vue 3/4' },
  { file: 'mt-09-1.jpg',          nom: 'MT-09',               categorie: 'Naked',          detail: '890cc • 119ch' },
  { file: 'mt-09-2.jpg',          nom: 'MT-09',               categorie: 'Naked',          detail: 'Cyan Storm' },
  { file: 'mt-09-3.jpg',          nom: 'MT-09',               categorie: 'Naked',          detail: 'Vue profil' },
  { file: 'mt-09-sp-1.jpg',       nom: 'MT-09 SP',            categorie: 'Naked',          detail: '890cc • Öhlins' },
  { file: 'mt-09-sp-2.jpg',       nom: 'MT-09 SP',            categorie: 'Naked',          detail: 'Deep Purple Blue' },
  { file: 'mt-09-sp-3.jpg',       nom: 'MT-09 SP',            categorie: 'Naked',          detail: 'Vue détail' },
  { file: 'mt-07-1.jpg',          nom: 'MT-07',               categorie: 'Naked',          detail: '689cc • 73ch' },
  { file: 'mt-07-2.jpg',          nom: 'MT-07',               categorie: 'Naked',          detail: 'Bleu Petrol' },
  { file: 'mt-07-3.jpg',          nom: 'MT-07',               categorie: 'Naked',          detail: 'Vue 3/4' },
  { file: 'mt-03-1.jpg',          nom: 'MT-03',               categorie: 'Naked',          detail: '321cc • 42ch' },
  { file: 'mt-03-2.jpg',          nom: 'MT-03',               categorie: 'Naked',          detail: 'Cyan Storm' },
  { file: 'mt-03-3.jpg',          nom: 'MT-03',               categorie: 'Naked',          detail: 'Vue profil' },
  { file: 'mt-125-1.jpg',         nom: 'MT-125',              categorie: 'Naked',          detail: '125cc • 15ch' },
  { file: 'mt-125-2.jpg',         nom: 'MT-125',              categorie: 'Naked',          detail: 'Cyan Storm' },
  { file: 'mt-125-3.jpg',         nom: 'MT-125',              categorie: 'Naked',          detail: 'Vue détail' },
  { file: 'tenere-700-1.jpg',     nom: 'Ténéré 700',          categorie: 'Adventure',      detail: '689cc • 73ch' },
  { file: 'tenere-700-2.jpg',     nom: 'Ténéré 700',          categorie: 'Adventure',      detail: 'Blanc Rally' },
  { file: 'tenere-700-3.jpg',     nom: 'Ténéré 700',          categorie: 'Adventure',      detail: 'Vue hors-route' },
  { file: 'tenere-700-wr-1.jpg',  nom: 'Ténéré 700 World Raid', categorie: 'Adventure',  detail: '23L • Long débattement' },
  { file: 'tenere-700-wr-2.jpg',  nom: 'Ténéré 700 World Raid', categorie: 'Adventure',  detail: 'Blanc/Bleu Rally' },
  { file: 'tenere-700-wr-3.jpg',  nom: 'Ténéré 700 World Raid', categorie: 'Adventure',  detail: 'Vue détail' },
  { file: 'super-tenere-1.jpg',   nom: 'Super Ténéré 1200',   categorie: 'Adventure',      detail: '1199cc • 113ch' },
  { file: 'super-tenere-2.jpg',   nom: 'Super Ténéré 1200',   categorie: 'Adventure',      detail: 'Blanc/Gris' },
  { file: 'super-tenere-3.jpg',   nom: 'Super Ténéré 1200',   categorie: 'Adventure',      detail: 'Vue profil' },
  { file: 'xsr-900-1.jpg',        nom: 'XSR900',              categorie: 'Retro',          detail: '890cc • 119ch' },
  { file: 'xsr-900-2.jpg',        nom: 'XSR900',              categorie: 'Retro',          detail: 'Noir Rétro' },
  { file: 'xsr-900-3.jpg',        nom: 'XSR900',              categorie: 'Retro',          detail: 'Vue 3/4' },
  { file: 'xsr-700-1.jpg',        nom: 'XSR700',              categorie: 'Retro',          detail: '689cc • 73ch' },
  { file: 'xsr-700-2.jpg',        nom: 'XSR700',              categorie: 'Retro',          detail: 'Bleu Rétro' },
  { file: 'xsr-700-3.jpg',        nom: 'XSR700',              categorie: 'Retro',          detail: 'Vue profil' },
  { file: 'xsr-125-1.jpg',        nom: 'XSR125',              categorie: 'Retro',          detail: '125cc • 15ch' },
  { file: 'xsr-125-2.jpg',        nom: 'XSR125',              categorie: 'Retro',          detail: 'Bleu Rétro' },
  { file: 'xsr-125-3.jpg',        nom: 'XSR125',              categorie: 'Retro',          detail: 'Vue détail' },
  { file: 'yz-450f-1.jpg',        nom: 'YZ450F',              categorie: 'Motocross',      detail: '449cc • 63ch' },
  { file: 'yz-450f-2.jpg',        nom: 'YZ450F',              categorie: 'Motocross',      detail: 'Bleu Yamaha' },
  { file: 'yz-450f-3.jpg',        nom: 'YZ450F',              categorie: 'Motocross',      detail: 'Vue saut' },
  { file: 'yz-250f-1.jpg',        nom: 'YZ250F',              categorie: 'Motocross',      detail: '249cc • 47ch' },
  { file: 'yz-250f-2.jpg',        nom: 'YZ250F',              categorie: 'Motocross',      detail: 'Bleu Yamaha' },
  { file: 'yz-250f-3.jpg',        nom: 'YZ250F',              categorie: 'Motocross',      detail: 'Vue détail' },
  { file: 'yz-125-1.jpg',         nom: 'YZ125',               categorie: 'Motocross',      detail: '125cc 2T • 36ch' },
  { file: 'yz-125-2.jpg',         nom: 'YZ125',               categorie: 'Motocross',      detail: 'Bleu Yamaha' },
  { file: 'yz-125-3.jpg',         nom: 'YZ125',               categorie: 'Motocross',      detail: 'Vue profil' },
  { file: 'wr-450f-1.jpg',        nom: 'WR450F',              categorie: 'Enduro',         detail: '449cc • 63ch' },
  { file: 'wr-450f-2.jpg',        nom: 'WR450F',              categorie: 'Enduro',         detail: 'Homologué route' },
  { file: 'wr-450f-3.jpg',        nom: 'WR450F',              categorie: 'Enduro',         detail: 'Vue forêt' },
  { file: 'wr-250f-1.jpg',        nom: 'WR250F',              categorie: 'Enduro',         detail: '249cc • 47ch' },
  { file: 'wr-250f-2.jpg',        nom: 'WR250F',              categorie: 'Enduro',         detail: 'Bleu Yamaha' },
  { file: 'wr-250f-3.jpg',        nom: 'WR250F',              categorie: 'Enduro',         detail: 'Vue détail' },
  { file: 'xv950-1.jpg',          nom: 'XV950 Bolt',          categorie: 'Custom',         detail: '942cc • 54ch' },
  { file: 'xv950-2.jpg',          nom: 'XV950 Bolt',          categorie: 'Custom',         detail: 'Noir Matte' },
  { file: 'xv950-3.jpg',          nom: 'XV950 Bolt',          categorie: 'Custom',         detail: 'Vue profil' },
  { file: 'vmax-1.jpg',           nom: 'VMAX',                categorie: 'Custom',         detail: '1679cc • 200ch' },
  { file: 'vmax-2.jpg',           nom: 'VMAX',                categorie: 'Custom',         detail: 'Gun Metal' },
  { file: 'vmax-3.jpg',           nom: 'VMAX',                categorie: 'Custom',         detail: 'Vue avant' },
  { file: 'niken-gt-1.jpg',       nom: 'Niken GT',            categorie: 'Sport Touring',  detail: '847cc • 115ch' },
  { file: 'niken-gt-2.jpg',       nom: 'Niken GT',            categorie: 'Sport Touring',  detail: '3 roues LMW' },
  { file: 'niken-gt-3.jpg',       nom: 'Niken GT',            categorie: 'Sport Touring',  detail: 'Vue avant' },
];

// Génère le SVG d'une image produit
function genererSVG(nom, categorie, detail, w = 800, h = 600) {
  const c = CATEGORY_COLORS[categorie] || CATEGORY_COLORS['Sport'];

  // Silhouette moto stylisée (forme générique selon catégorie)
  const silhouettes = {
    Sport: `
      <ellipse cx="400" cy="330" rx="260" ry="55" fill="${c.accent}" opacity="0.08"/>
      <rect x="180" y="220" width="440" height="90" rx="12" fill="${c.accent}" opacity="0.12"/>
      <ellipse cx="220" cy="310" rx="65" ry="65" fill="none" stroke="${c.accent}" stroke-width="18" opacity="0.7"/>
      <ellipse cx="580" cy="310" rx="65" ry="65" fill="none" stroke="${c.accent}" stroke-width="18" opacity="0.7"/>
      <ellipse cx="220" cy="310" rx="28" ry="28" fill="${c.accent}" opacity="0.4"/>
      <ellipse cx="580" cy="310" rx="28" ry="28" fill="${c.accent}" opacity="0.4"/>
      <polygon points="220,180 540,180 600,260 160,260" fill="${c.accent}" opacity="0.25"/>
      <rect x="300" y="195" width="60" height="25" rx="4" fill="${c.accent}" opacity="0.6"/>
      <polygon points="540,195 600,225 600,260 490,260 490,195" fill="${c.accent}" opacity="0.35"/>
      <line x1="160" y1="310" x2="640" y2="310" stroke="${c.accent}" stroke-width="3" opacity="0.3"/>`,

    Naked: `
      <ellipse cx="400" cy="335" rx="250" ry="50" fill="${c.accent}" opacity="0.08"/>
      <ellipse cx="215" cy="315" rx="65" ry="65" fill="none" stroke="${c.accent}" stroke-width="18" opacity="0.7"/>
      <ellipse cx="585" cy="315" rx="65" ry="65" fill="none" stroke="${c.accent}" stroke-width="18" opacity="0.7"/>
      <ellipse cx="215" cy="315" rx="28" ry="28" fill="${c.accent}" opacity="0.4"/>
      <ellipse cx="585" cy="315" rx="28" ry="28" fill="${c.accent}" opacity="0.4"/>
      <rect x="260" y="230" width="280" height="80" rx="8" fill="${c.accent}" opacity="0.18"/>
      <circle cx="350" cy="210" r="35" fill="${c.accent}" opacity="0.3"/>
      <rect x="380" y="190" width="80" height="50" rx="6" fill="${c.accent}" opacity="0.2"/>
      <line x1="165" y1="315" x2="635" y2="315" stroke="${c.accent}" stroke-width="3" opacity="0.3"/>`,

    Adventure: `
      <ellipse cx="400" cy="340" rx="255" ry="52" fill="${c.accent}" opacity="0.08"/>
      <ellipse cx="210" cy="318" rx="70" ry="70" fill="none" stroke="${c.accent}" stroke-width="16" opacity="0.7"/>
      <ellipse cx="590" cy="318" rx="70" ry="70" fill="none" stroke="${c.accent}" stroke-width="16" opacity="0.7"/>
      <ellipse cx="210" cy="318" rx="30" ry="30" fill="${c.accent}" opacity="0.4"/>
      <ellipse cx="590" cy="318" rx="30" ry="30" fill="${c.accent}" opacity="0.4"/>
      <rect x="255" y="215" width="290" height="100" rx="10" fill="${c.accent}" opacity="0.15"/>
      <rect x="290" y="185" width="120" height="45" rx="8" fill="${c.accent}" opacity="0.25"/>
      <rect x="540" y="220" width="55" height="80" rx="5" fill="${c.accent}" opacity="0.2"/>
      <line x1="140" y1="318" x2="660" y2="318" stroke="${c.accent}" stroke-width="3" opacity="0.3"/>`,

    Retro: `
      <ellipse cx="400" cy="332" rx="248" ry="50" fill="${c.accent}" opacity="0.08"/>
      <ellipse cx="218" cy="312" rx="66" ry="66" fill="none" stroke="${c.accent}" stroke-width="16" opacity="0.7"/>
      <ellipse cx="582" cy="312" rx="66" ry="66" fill="none" stroke="${c.accent}" stroke-width="16" opacity="0.7"/>
      <ellipse cx="218" cy="312" rx="28" ry="28" fill="${c.accent}" opacity="0.4"/>
      <ellipse cx="582" cy="312" rx="28" ry="28" fill="${c.accent}" opacity="0.4"/>
      <ellipse cx="370" cy="240" rx="90" ry="45" fill="${c.accent}" opacity="0.2"/>
      <circle cx="340" cy="215" r="30" fill="${c.accent}" opacity="0.25"/>
      <rect x="370" y="210" width="100" height="35" rx="5" fill="${c.accent}" opacity="0.2"/>
      <line x1="152" y1="312" x2="648" y2="312" stroke="${c.accent}" stroke-width="3" opacity="0.3"/>`,

    Motocross: `
      <ellipse cx="400" cy="338" rx="245" ry="48" fill="${c.accent}" opacity="0.08"/>
      <ellipse cx="205" cy="318" rx="68" ry="68" fill="none" stroke="${c.accent}" stroke-width="14" opacity="0.7"/>
      <ellipse cx="595" cy="318" rx="68" ry="68" fill="none" stroke="${c.accent}" stroke-width="14" opacity="0.7"/>
      <ellipse cx="205" cy="318" rx="22" ry="22" fill="${c.accent}" opacity="0.4"/>
      <ellipse cx="595" cy="318" rx="22" ry="22" fill="${c.accent}" opacity="0.4"/>
      <rect x="255" y="225" width="295" height="88" rx="6" fill="${c.accent}" opacity="0.15"/>
      <rect x="275" y="190" width="110" height="48" rx="4" fill="${c.accent}" opacity="0.22"/>
      <line x1="137" y1="318" x2="663" y2="318" stroke="${c.accent}" stroke-width="2" opacity="0.3"/>`,

    Enduro: `
      <ellipse cx="400" cy="338" rx="245" ry="48" fill="${c.accent}" opacity="0.08"/>
      <ellipse cx="205" cy="318" rx="68" ry="68" fill="none" stroke="${c.accent}" stroke-width="14" opacity="0.7"/>
      <ellipse cx="595" cy="318" rx="68" ry="68" fill="none" stroke="${c.accent}" stroke-width="14" opacity="0.7"/>
      <ellipse cx="205" cy="318" rx="22" ry="22" fill="${c.accent}" opacity="0.4"/>
      <ellipse cx="595" cy="318" rx="22" ry="22" fill="${c.accent}" opacity="0.4"/>
      <rect x="255" y="220" width="295" height="92" rx="8" fill="${c.accent}" opacity="0.15"/>
      <rect x="290" y="185" width="115" height="48" rx="6" fill="${c.accent}" opacity="0.22"/>
      <rect x="540" y="225" width="50" height="75" rx="4" fill="${c.accent}" opacity="0.18"/>
      <line x1="137" y1="318" x2="663" y2="318" stroke="${c.accent}" stroke-width="2" opacity="0.3"/>`,

    Custom: `
      <ellipse cx="400" cy="335" rx="280" ry="50" fill="${c.accent}" opacity="0.07"/>
      <ellipse cx="195" cy="320" rx="72" ry="72" fill="none" stroke="${c.accent}" stroke-width="16" opacity="0.6"/>
      <ellipse cx="605" cy="320" rx="72" ry="72" fill="none" stroke="${c.accent}" stroke-width="16" opacity="0.6"/>
      <ellipse cx="195" cy="320" rx="30" ry="30" fill="${c.accent}" opacity="0.35"/>
      <ellipse cx="605" cy="320" rx="30" ry="30" fill="${c.accent}" opacity="0.35"/>
      <rect x="265" y="250" width="270" height="65" rx="30" fill="${c.accent}" opacity="0.18"/>
      <ellipse cx="360" cy="235" rx="75" ry="38" fill="${c.accent}" opacity="0.2"/>
      <line x1="123" y1="320" x2="677" y2="320" stroke="${c.accent}" stroke-width="4" opacity="0.25"/>`,

    'Sport Touring': `
      <ellipse cx="400" cy="332" rx="265" ry="52" fill="${c.accent}" opacity="0.08"/>
      <ellipse cx="215" cy="312" rx="66" ry="66" fill="none" stroke="${c.accent}" stroke-width="18" opacity="0.7"/>
      <ellipse cx="585" cy="312" rx="66" ry="66" fill="none" stroke="${c.accent}" stroke-width="18" opacity="0.7"/>
      <ellipse cx="215" cy="312" rx="28" ry="28" fill="${c.accent}" opacity="0.4"/>
      <ellipse cx="585" cy="312" rx="28" ry="28" fill="${c.accent}" opacity="0.4"/>
      <ellipse cx="214" cy="312" rx="66" ry="66" fill="none" stroke="${c.accent}" stroke-width="18" opacity="0.5"/>
      <polygon points="200,180 520,180 590,260 150,260" fill="${c.accent}" opacity="0.2"/>
      <rect x="290" y="195" width="70" height="28" rx="4" fill="${c.accent}" opacity="0.5"/>
      <rect x="540" y="210" width="50" height="85" rx="5" fill="${c.accent}" opacity="0.2"/>
      <rect x="165" y="210" width="50" height="85" rx="5" fill="${c.accent}" opacity="0.2"/>
      <line x1="149" y1="312" x2="651" y2="312" stroke="${c.accent}" stroke-width="3" opacity="0.3"/>`,
  };

  const silhouette = silhouettes[categorie] || silhouettes['Sport'];

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="${c.bg}" stop-opacity="1"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="1"/>
    </radialGradient>
    <radialGradient id="glow" cx="50%" cy="55%" r="40%">
      <stop offset="0%" stop-color="${c.accent}" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="${c.accent}" stop-opacity="0"/>
    </radialGradient>
    <filter id="blur">
      <feGaussianBlur stdDeviation="8"/>
    </filter>
  </defs>

  <!-- Fond -->
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>

  <!-- Grille fine -->
  <g opacity="0.04" stroke="${c.accent}" stroke-width="1">
    ${Array.from({length: 20}, (_, i) => `<line x1="${i*44}" y1="0" x2="${i*44}" y2="${h}"/>`).join('')}
    ${Array.from({length: 15}, (_, i) => `<line x1="0" y1="${i*44}" x2="${w}" y2="${i*44}"/>`).join('')}
  </g>

  <!-- Cercles décoratifs -->
  <circle cx="${w/2}" cy="${h/2}" r="260" fill="none" stroke="${c.accent}" stroke-width="1" opacity="0.07"/>
  <circle cx="${w/2}" cy="${h/2}" r="200" fill="none" stroke="${c.accent}" stroke-width="1" opacity="0.05"/>

  <!-- Silhouette moto -->
  ${silhouette}

  <!-- Ligne de sol -->
  <line x1="100" y1="390" x2="700" y2="390" stroke="${c.accent}" stroke-width="2" opacity="0.2"/>
  <rect x="100" y="390" width="600" height="1" fill="url(#glow)" opacity="0.5"/>

  <!-- Badge catégorie -->
  <rect x="28" y="28" width="${categorie.length * 9 + 20}" height="28" rx="4" fill="${c.accent}"/>
  <text x="38" y="47" font-family="'Segoe UI', Arial, sans-serif" font-size="13" font-weight="700"
        fill="#ffffff" letter-spacing="1">${categorie.toUpperCase()}</text>

  <!-- Logo YAMAHA -->
  <text x="${w - 28}" y="48" font-family="'Segoe UI', Arial, sans-serif" font-size="14" font-weight="900"
        fill="${c.accent}" text-anchor="end" opacity="0.6" letter-spacing="3">YAMAHA</text>

  <!-- Nom du modèle -->
  <text x="${w/2}" y="470" font-family="'Segoe UI', Arial, sans-serif" font-size="42" font-weight="900"
        fill="${c.text}" text-anchor="middle" letter-spacing="2">${nom}</text>

  <!-- Détail / spec -->
  <text x="${w/2}" y="505" font-family="'Segoe UI', Arial, sans-serif" font-size="16" font-weight="400"
        fill="${c.accent}" text-anchor="middle" letter-spacing="1" opacity="0.9">${detail}</text>

  <!-- Année -->
  <text x="${w/2}" y="540" font-family="'Segoe UI', Arial, sans-serif" font-size="13" font-weight="300"
        fill="${c.text}" text-anchor="middle" opacity="0.35" letter-spacing="4">2024</text>

  <!-- Trait décoratif bas -->
  <line x1="${w/2 - 60}" y1="520" x2="${w/2 + 60}" y2="520" stroke="${c.accent}" stroke-width="1" opacity="0.4"/>
</svg>`;
}

// Crée toutes les images
let count = 0;
for (const img of IMAGES) {
  const svg = genererSVG(img.nom, img.categorie, img.detail);
  const filePath = path.join(OUTPUT_DIR, img.file.replace('.jpg', '.svg'));
  // Sauvegarde en SVG (les navigateurs les affichent parfaitement)
  fs.writeFileSync(filePath, svg, 'utf8');
  count++;
}

console.log(`✓ ${count} images générées dans frontend/images/`);
