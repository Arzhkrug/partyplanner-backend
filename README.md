# Party Planner – Quêtes Donjons & Dragons (Instance personnelle)

Application permettant de créer et gérer des quêtes de **Donjons & Dragons** avec notification automatique sur Discord.

⚠️ **Ce projet est conçu pour être déployé en instance personnelle.**  
Merci de **ne pas utiliser une instance déjà déployée** (la mienne ou celle de quelqu’un d’autre).  
Chaque utilisateur doit déployer **son propre frontend, backend et webhook Discord**.

---

## 🧙‍♂️ Fonctionnalités

- Création de quêtes avec :
  - Titre
  - Description
  - Date / Heure
  - Lieu
  - Organisateur
- Notification automatique sur un serveur Discord via webhook
- Frontend React avec navigation SPA
- Liens directs vers les quêtes (compatibles Discord)
- Architecture simple et facilement déployable

---

## 🏗 Architecture

Frontend (Vite / React) → Backend (Node / Express) → Discord Webhook → API publique de ton backend

Chaque déploiement est **isolé** :

- Un frontend
- Un backend
- Un webhook Discord
- (Optionnel) une base de données

---

## 🛠 Stack technique

- **Frontend** : React, Vite, TailwindCSS
- **Backend** : Node.js, Express
- **Intégration Discord** : Webhook
- **Déploiement frontend** : Vercel
- **Déploiement backend** : Render

---

## 🚀 Déploiement (instance personnelle)

### 1️⃣ Backend

cd backend
npm install

Créer un fichier .env :
PORT=3000
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/TON_WEBHOOK

Lancer en local :
npm run start

Puis déployer le backend sur Render (ou autre).

2️⃣ Frontend
cd frontend
npm install
Créer un fichier .env :
VITE_API_URL=https://ton-backend.onrender.com

⚠️ Cette URL doit pointer vers TON backend, pas celui de quelqu’un d’autre.

Ajouter le fichier vercel.json à la racine du dossier frontend :
{
"rewrites": [
{ "source": "/(.*)", "destination": "/" }
]
}

Lancer en local :
npm run dev

Puis déployer le frontend sur Vercel.

🔔 Discord
• Chaque instance doit utiliser son propre webhook Discord
• Le webhook est stocké uniquement côté backend
• Ne jamais exposer l’URL du webhook dans le frontend

❌ Ce que ce projet n’est PAS
• ❌ Une plateforme multi-utilisateurs
• ❌ Un service public
• ❌ Une instance partagée

👉 Si tu veux l’utiliser, fork le repo et déploie ta propre version <3

⸻

🧪 Objectif du projet
• Projet personnel / portfolio
• Démonstration :
• React + Vite
• Communication frontend ↔ backend
• Intégration Discord
• Déploiement moderne

⸻

📄 Licence

MIT License
Fais-en ce que tu veux, mais déploie ta propre instance 😉
