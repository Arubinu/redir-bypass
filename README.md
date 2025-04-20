# 🔁 Redir Bypass – Anti-redirections publicitaires

Un micro-serveur HTTPS Node.js conçu pour **bypasser les redirections publicitaires**.  
Il redirige automatiquement vers l'URL finale passée en paramètre, sans passer par les trackers, pages d’attente ou redirections multiples.

## 🚀 Objectif

Vous tombez souvent sur des liens publicitaires du style :
https://redir.example.com/?url=https%3A%2F%2Fvrai-site.com

Ce petit serveur vous permet de **reprendre le contrôle** :  
📦 Avec Pi-hole ou une extension, vous pouvez intercepter `redir.example.com` et le faire pointer vers ce serveur local,  
qui vous enverra **directement sur le lien cible**.

---

## 🔧 Utilisation avec Docker

### 🧱 Construction de l'image

```bash
docker build -t redir-bypass .
```

### 🚀 Lancement

```bash
docker run -d -p 443:443 \
  -v $(pwd)/cert.pem:/app/cert.pem:ro \
  -v $(pwd)/key.pem:/app/key.pem:ro \
  --name redirector \
  redir-bypass
```

## 🔒 Certificats TLS

Le serveur fonctionne en HTTPS. Vous devez générer un certificat auto-signé (ou utiliser un vrai certificat) :
```bash
openssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem -days 365
```

Puis placez-les dans le même dossier que le projet.

⚠️ Ne committez jamais vos certificats privés.

## 🧠 Pourquoi ce projet ?

Certaines publicités ou services de tracking injectent des redirections multiples avant d'atteindre le lien final.
Ce serveur agit comme proxy minimal pour aller directement au but sans exécuter de JS, cookies ou scripts pub.