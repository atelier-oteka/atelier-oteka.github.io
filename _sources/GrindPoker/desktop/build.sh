#!/bin/sh
# ===========================================================================
# build.sh — Fabrique le logiciel Windows de Grind Poker et son installateur.
#
# index.html, à la racine du projet, est la SOURCE UNIQUE : la même page sert
# la version en ligne, le navigateur et le logiciel. Ce script la copie dans
# desktop/web/ (dossier de travail, non versionné) pour que Go l'embarque.
#
# Usage :  cd desktop && ./build.sh
# Sortie :  dist/GrindPoker-<VERSION>.exe
#           dist/GrindPoker-Installation-<VERSION>.exe   (celui du site)
# ===========================================================================
set -e
VERSION="1.0.1"

cd "$(dirname "$0")"

echo "1/4  Copie de la source dans web/"
rm -rf web && mkdir -p web
cp ../index.html ../logo.svg web/

echo "2/4  Icône de l'exécutable"
# Régénérée seulement si elle manque (ImageMagick + rsrc).
if [ ! -f rsrc_windows_amd64.syso ]; then
  convert ../logo-512.png -define icon:auto-resize=256,128,64,48,32,16 icon.ico
  go run github.com/akavel/rsrc@latest -ico icon.ico -o rsrc_windows_amd64.syso -arch amd64
fi

echo "3/4  Compilation du logiciel (Windows 64 bits)"
mkdir -p ../dist
GOOS=windows GOARCH=amd64 go build -ldflags "-H windowsgui -s -w" \
  -o "../dist/GrindPoker-$VERSION.exe" .

echo "4/4  Compilation de l'installateur"
cp "../dist/GrindPoker-$VERSION.exe" installateur/GrindPoker.exe
cp rsrc_windows_amd64.syso installateur/
(cd installateur && GOOS=windows GOARCH=amd64 go build -ldflags "-H windowsgui -s -w" \
  -o "../../dist/GrindPoker-Installation-$VERSION.exe" .)
rm -f installateur/GrindPoker.exe installateur/rsrc_windows_amd64.syso

ls -lh ../dist/
echo "Terminé."
