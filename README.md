# CAPSO Website

Site vitrine CAPSO — Transport Sanitaire.

## Structure

```
capso-website/
├── index.html                  ← Home page
├── assets/
│   ├── css/
│   │   └── style.css           ← Tous les styles
│   ├── js/
│   │   └── main.js             ← Tous les scripts
│   └── images/
│       └── logo-capso.png      ← Logo (à ajouter)
├── pages/
│   ├── qui-sommes-nous.html
│   ├── solutions.html          ← À créer
│   ├── academy.html            ← À créer
│   ├── mentions-legales.html   ← À créer
│   └── confidentialite.html   ← À créer
├── .gitignore
└── README.md
```

## Lancer en local

### Option 1 — Python (recommandé, zéro install)
```bash
cd capso-website
python3 -m http.server 3000
# Ouvrir http://localhost:3000
```

### Option 2 — Node (si installé)
```bash
cd capso-website
npx serve .
# Ouvrir l'URL affichée
```

### Option 3 — VS Code Live Server
Installer l'extension Live Server → clic droit sur index.html → "Open with Live Server"

## Git — Workflow standard

```bash
# Premier push
git init
git add .
git commit -m "init: structure capso-website"
git remote add origin https://github.com/TON_USER/capso-website.git
git push -u origin main

# Modifications courantes
git add .
git commit -m "feat: description du changement"
git push
```

## TODO
- [ ] Ajouter logo-capso.png dans assets/images/
- [ ] Renseigner email/téléphone réels dans index.html et pages/
- [ ] Mettre à jour lien Calendly dans assets/js/main.js
- [ ] Créer pages/solutions.html
- [ ] Créer pages/academy.html
- [ ] Créer pages/mentions-legales.html
- [ ] Configurer déploiement Netlify / Vercel (drag & drop dossier ou connect GitHub)

## Déploiement Netlify (le plus simple)

1. Aller sur netlify.com → "Add new site" → "Deploy manually"
2. Drag & drop le dossier `capso-website/`
3. Done. URL générée automatiquement.

Ou via GitHub : connecter le repo → auto-deploy à chaque push.
