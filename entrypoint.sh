#!/bin/sh

# Génére le certificat uniquement s'il n'existe pas
if [ ! -f /app/key.pem ] || [ ! -f /app/cert.pem ]; then
  echo "[INFO] Aucun certificat trouvé, génération automatique..."
  openssl req -x509 -newkey rsa:2048 -nodes \
    -keyout /app/key.pem -out /app/cert.pem \
    -subj "/CN=localhost" -days 365
fi

exec node index.js