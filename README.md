# Sportify - Gestion d'Événements Sportifs

## Description du Projet

**Sportify** est une plateforme conçue pour faciliter la gestion des inscriptions à des événements sportifs. Destinée aux organisateurs d'événements sportifs, l'application permet de :
- Créer, modifier et supprimer des événements.
- Gérer les inscriptions des participants.
- Générer et imprimer des listes des participants pour chaque événement.

L'application vise à simplifier et sécuriser le processus d'inscription, en proposant une expérience utilisateur fluide grâce à une architecture robuste basée sur Node.js, React.js et MongoDB.

---

## Fonctionnalités

### Côté Organisateur :
- **Gestion des événements** : Création, modification, suppression d'événements sportifs.
- **Gestion des inscriptions** : Gestion des participants pour chaque événement.
- **Liste des inscrits** : Génération et impression d'une liste des participants.

---

## Technologies Utilisées

### Back-end :
- **Node.js** (Express.js ou NestJS)
- **MongoDB** avec **Mongoose**
- **JWT** pour l'authentification
- **Tests Unitaires** avec Jest

### Front-end :
- **React.js** avec gestion d'état via **Redux** ou **Context API**
- **React Router** pour la gestion des routes protégées

### Déploiement :
- **Docker** pour la conteneurisation du back-end et du front-end

---

## Installation

1. **Clonez le dépôt :**
   ```bash
   git clone https://github.com/VOTRE_COMPTE/sportify.git
## Accédez au répertoire :

```bash
cd sportify

## Installation des dépendances (Back-end & Front-end) :
cd Backend
npm install
cd ../Frontend
npm install

## Lancement du projet avec Docker :
docker-compose up

## Structure du Projet :

Sportify/
├── .github/
│   └── workflows/
│       └── main.yml
├── Backend/
│   ├── __tests__/           # Tests unitaires
│   ├── config/              # Configuration de l'application
│   ├── public/              # Fichiers statiques
│   ├── src/                 # Code source principal
│   ├── .env                 # Variables d'environnement
│   ├── app.js               # Entrée principale du serveur
│   ├── package.json         # Dépendances du serveur
│   └── dockerfile           # Fichier Docker pour le Back-end
├── Frontend/
│   ├── public/              # Fichiers publics
│   ├── src/                 # Code source React
│   ├── index.html           # Page principale
│   ├── package.json         # Dépendances Front-end
│   └── dockerfile           # Fichier Docker pour le Front-end
├── docker-compose.yml       # Configuration Docker-Compose
└── README.md                # Documentation du projet



Voici le texte mis en forme dans un bloc de code Markdown :

markdown
Copy code
## Accédez au répertoire :

```bash
cd sportify
Installation des dépendances (Back-end & Front-end) :
bash
Copy code
cd Backend
npm install
cd ../Frontend
npm install
Lancement du projet avec Docker :
bash
Copy code
docker-compose up
Structure du Projet
bash
Copy code
Sportify/
├── .github/
│   └── workflows/
│       └── main.yml
├── Backend/
│   ├── __tests__/           # Tests unitaires
│   ├── config/              # Configuration de l'application
│   ├── public/              # Fichiers statiques
│   ├── src/                 # Code source principal
│   ├── .env                 # Variables d'environnement
│   ├── app.js               # Entrée principale du serveur
│   ├── package.json         # Dépendances du serveur
│   └── dockerfile           # Fichier Docker pour le Back-end
├── Frontend/
│   ├── public/              # Fichiers publics
│   ├── src/                 # Code source React
│   ├── index.html           # Page principale
│   ├── package.json         # Dépendances Front-end
│   └── dockerfile           # Fichier Docker pour le Front-end
├── docker-compose.yml       # Configuration Docker-Compose
└── README.md                # Documentation du projet


## Tâches à Réaliser
Back-end
Développer l'API avec Node.js et MongoDB.
Ajouter la vérification JWT et la gestion des erreurs.
Protéger les routes avec des rôles (Organisateur/Participant).
Front-end
Utiliser React.js avec des hooks et la gestion globale d'état.
Protéger les routes avec une authentification.
Déploiement
Construire les images Docker pour le déploiement.