# Social Dashboard

Une application web de tableau de bord social construite avec Node.js et Express.

## 🚀 Installation

1. Clonez le repository :
```bash
git clone https://github.com/ArthurDesc/social-dashboard.git
cd social-dashboard     
```

2. Installez les dépendances :
```bash
npm install
```

3. Configurez les variables d'environnement :
   - Copiez le fichier `.env.example` en `.env`
   - Modifiez les variables selon votre configuration

## 🛠️ Démarrage

Pour lancer l'application en mode développement :
```bash
npm run dev
```

Pour lancer l'application en mode production :
```bash
npm start
```

Le serveur démarrera sur `http://localhost:3000` par défaut.

## 📦 Technologies utilisées

- Node.js
- Express.js
- dotenv (pour la gestion des variables d'environnement)
- CORS

## 📁 Structure du projet

```
social-dashboard/
├── config/         # Configuration de l'application
├── public/         # Fichiers statiques
├── routes/         # Routes de l'application
├── views/          # Templates de vues
├── app.js         # Configuration Express
├── index.js       # Point d'entrée de l'application
└── package.json   # Dépendances et scripts
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou un pull request.

## 📝 Licence

ISC