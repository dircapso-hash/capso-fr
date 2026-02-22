#!/bin/bash
# ============================================================
# CAPSO Website — Script d'initialisation locale
# Usage: chmod +x setup.sh && ./setup.sh
# ============================================================

set -e

PROJECT="capso-website"
GREEN='\033[0;32m'
GOLD='\033[0;33m'
NC='\033[0m' # No Color

echo ""
echo -e "${GOLD}================================================${NC}"
echo -e "${GOLD}  CAPSO — Setup du projet web local${NC}"
echo -e "${GOLD}================================================${NC}"
echo ""

# Vérifier si on est déjà dans le projet
if [ -f "index.html" ]; then
    echo -e "${GREEN}✓ Déjà dans le dossier du projet${NC}"
    PROJECT_DIR="."
else
    PROJECT_DIR="./$PROJECT"
    if [ ! -d "$PROJECT_DIR" ]; then
        echo "❌ Dossier $PROJECT non trouvé."
        echo "   Lance ce script depuis le dossier parent de capso-website/"
        exit 1
    fi
    cd "$PROJECT_DIR"
    echo -e "${GREEN}✓ Dossier $PROJECT trouvé${NC}"
fi

# Init Git
if [ ! -d ".git" ]; then
    echo ""
    echo "→ Initialisation Git..."
    git init
    git add .
    git commit -m "init: capso-website — structure complète"
    echo -e "${GREEN}✓ Repo Git initialisé — premier commit créé${NC}"
else
    echo -e "${GREEN}✓ Repo Git déjà initialisé${NC}"
fi

# Vérifier les outils disponibles pour le serveur
echo ""
echo "→ Recherche d'un serveur HTTP local..."

if command -v python3 &>/dev/null; then
    SERVER_CMD="python3 -m http.server 3000"
    SERVER_URL="http://localhost:3000"
    SERVER_TOOL="Python3"
elif command -v python &>/dev/null; then
    SERVER_CMD="python -m SimpleHTTPServer 3000"
    SERVER_URL="http://localhost:3000"
    SERVER_TOOL="Python2"
elif command -v npx &>/dev/null; then
    SERVER_CMD="npx serve . -p 3000"
    SERVER_URL="http://localhost:3000"
    SERVER_TOOL="npx serve"
else
    echo "⚠️  Aucun serveur HTTP trouvé automatiquement."
    echo "   Install : brew install python3  ou  npm install -g serve"
    echo ""
    echo -e "${GOLD}Structure du projet :${NC}"
    ls -la
    exit 0
fi

echo -e "${GREEN}✓ $SERVER_TOOL disponible${NC}"
echo ""
echo -e "${GOLD}================================================${NC}"
echo -e "${GOLD}  Projet prêt !${NC}"
echo ""
echo -e "  📁 Structure :"
find . -not -path './.git/*' -not -name '.DS_Store' | sort | head -30
echo ""
echo -e "  🌐 Lancer le serveur :"
echo -e "     ${GREEN}$SERVER_CMD${NC}"
echo ""
echo -e "  🔗 Ouvrir dans le navigateur :"
echo -e "     ${GREEN}$SERVER_URL${NC}"
echo ""
echo -e "  📦 Git remote (à configurer) :"
echo -e "     git remote add origin https://github.com/TON_USER/capso-website.git"
echo -e "     git push -u origin main"
echo -e "${GOLD}================================================${NC}"
echo ""

# Proposer de lancer le serveur
read -p "Lancer le serveur maintenant ? (o/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[OoYy]$ ]]; then
    echo -e "${GREEN}→ Serveur démarré sur $SERVER_URL${NC}"
    echo "   (Ctrl+C pour arrêter)"
    echo ""
    # Tenter d'ouvrir le navigateur
    if command -v open &>/dev/null; then
        sleep 1 && open "$SERVER_URL" &
    elif command -v xdg-open &>/dev/null; then
        sleep 1 && xdg-open "$SERVER_URL" &
    fi
    $SERVER_CMD
fi
