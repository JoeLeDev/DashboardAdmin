# 🔐 Admin Dashboard - React + Firebase

Bienvenue sur mon projet de **Dashboard Admin** développé avec **React**, **TypeScript**, **TailwindCSS**, **Firebase** et **Sonner** pour les toasts. Ce projet met en œuvre une interface complète d'administration avec gestion des utilisateurs, rôles, authentification, édition et suppression.

---

## ✨ Fonctionnalités principales

- 🔑 Authentification Firebase (Inscription / Connexion / Déconnexion)
- 🧑‍💼 Gestion des utilisateurs (affichage, modification, suppression)
- 🧾 Rôles : `admin` / `utilisateur` avec promotion / rétrogradation
- 🌑 Mode sombre / clair
- 📸 Upload d’avatar via Firebase Storage (avec preview)
- ✅ Toasts dynamiques (`sonner`) pour retour utilisateur
- 🔐 Protection des routes selon les rôles et l’état de connexion
- 📋 Interface responsive & composants UI modernes via `shadcn/ui`

---

## 🛠️ Stack technique

- **React 18+ / TypeScript**
- **Vite** pour un bundling ultra-rapide
- **TailwindCSS** + **ShadCN UI**
- **Firebase Auth + Firestore + Storage**
- **Sonner** pour les notifications toast

---

## 🚀 Installation

```bash
git clone https://github.com/JoeLeDev/DashboardAdmin.git
cd DashboardAdmin
npm install
npm run dev
```

> ⚠️ Crée un fichier `.env` avec tes credentials Firebase (voir `.env.example`).

---

## 🔐 Exemple `.env`

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_APP_ID=your_app_id
```

---

## 📂 Architecture simplifiée

```
src/
├── components/        # Composants UI
├── context/           # Auth & Theme providers
├── pages/             # Pages principales (Login, Dashboard, Users, Settings)
├── services/          # Appels Firebase centralisés
├── App.tsx            # Routing principal
├── main.tsx           # Entrée de l'app
```

---

## ✅ À faire encore (en cours)

- [ ] Pagination ou recherche utilisateur
- [ ] Dashboard statistiques
- [ ] Export CSV
- [ ] Filtres utilisateurs

---

## 🧠 Auteur

Développé par **@JoeLeDev**  
Date : 08/04/2025

---