# API REST – Gestion de location de véhicules

## Description

Ce projet consiste à développer une API REST avec **Node.js et Express.js** pour gérer les véhicules d'une agence de location de voitures.

Les données sont stockées dans un tableau en mémoire. Aucune base de données n'est utilisée.

## Technologies utilisées

- Node.js
- Express.js
- JavaScript (ES Modules)
- dotenv (variables d'environnement)
- Postman (tests de l'API)

## Structure du projet

```text
api-location-voitures/
│
├── server.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
├── README.md
│
├── routes/
│   └── vehicules.js
│
└── middlewares/
    └── journal.js
```

## Installation

### 1. Installer les dépendances

Ouvrir un terminal dans le dossier du projet et exécuter :

```bash
npm install
```

### 2. Configurer les variables d'environnement

Créer un fichier `.env` à la racine du projet :

```env
PORT=3000
```

Le port du server est ainsi configurable sans modifier le code.

### 3. Démarrer le server

Mode normal :

```bash
npm start
```

Mode développement :

```bash
npm run dev
```

Le server démarre sur :

```text
http://localhost:3000
```

## Configuration de Git

Le fichier `.gitignore` permet d'exclure les fichiers qui ne doivent pas être envoyés sur GitHub.

Exemple :

```gitignore
node_modules/
.env
```

Le fichier `.env` contient des variables de configuration et ne doit pas être publié sur GitHub.

## Fonctionnalités de l'API

| Méthode | URL | Description | Statut |
|---|---|---|---|
| GET | /vehicules | Afficher tous les véhicules | 200 |
| GET | /vehicules?disponible=true | Afficher les véhicules disponibles | 200 |
| GET | /vehicules/:id | Afficher un véhicule par ID | 200 / 404 |
| POST | /vehicules | Ajouter un véhicule | 201 / 400 |
| PATCH | /vehicules/:id | Modifier un véhicule | 200 / 404 |
| DELETE | /vehicules/:id | Supprimer un véhicule | 204 / 404 |

## Format des données

Chaque véhicule possède les propriétés suivantes :

```json
{
  "id": 1,
  "marque": "Dacia",
  "modele": "Logan",
  "immatriculation": "12345-A-6",
  "disponible": true
}
```

- `id` : attribué automatiquement par le server.
- `marque` : marque du véhicule (obligatoire).
- `modele` : modèle du véhicule (obligatoire).
- `immatriculation` : numéro d'immatriculation (obligatoire).
- `disponible` : disponibilité du véhicule (`true` par défaut).

## Tests avec Postman

Base URL :

```text
http://localhost:3000
```

### 1. GET – Afficher tous les véhicules

- Méthode : GET
- URL : `/vehicules`
- Résultat attendu : 200 OK.

### 2. GET – Afficher les véhicules disponibles

- Méthode : GET
- URL : `/vehicules?disponible=true`
- Résultat attendu : 200 OK.

### 3. GET – Afficher un véhicule par ID

- Méthode : GET
- URL : `/vehicules/1`
- Résultat attendu : 200 OK.

### 4. POST – Ajouter un véhicule

- Méthode : POST
- URL : `/vehicules`
- Body : raw → JSON.

```json
{
  "marque": "Toyota",
  "modele": "Yaris",
  "immatriculation": "11111-C-6"
}
```

Résultat attendu : 201 Created.

### 5. PATCH – Modifier un véhicule

- Méthode : PATCH
- URL : `/vehicules/1`
- Body : raw → JSON.

```json
{
  "disponible": false
}
```

Résultat attendu : 200 OK.

### 6. DELETE – Supprimer un véhicule

- Méthode : DELETE
- URL : `/vehicules/1`
- Résultat attendu : 204 No Content.

### 7. Tester les erreurs

**Véhicule introuvable :**

```json
{
  "erreur": "Véhicule introuvable"
}
```

Code HTTP : 404 Not Found.

**Champs obligatoires manquants :**

```json
{
  "erreur": "Champs obligatoires manquants"
}
```

Code HTTP : 400 Bad Request.

**Route inexistante :**

```json
{
  "erreur": "Route introuvable"
}
```

Code HTTP : 404 Not Found.

## Middlewares

### Middleware journal

Le middleware `journal.js` affiche la méthode HTTP et l'URL de chaque requête dans le terminal.

Exemple :

```text
GET /vehicules
POST /vehicules
PATCH /vehicules/1
DELETE /vehicules/2
```

### Middleware 404

Un middleware placé après les routes renvoie une réponse JSON lorsqu'une route n'existe pas.

## Remarque

Les véhicules sont stockés dans un tableau JavaScript en mémoire.

Les données ajoutées, modifiées ou supprimées ne sont donc pas conservées après le redémarrage du server.

## Auteur

Projet réalisé dans le cadre d'un exercice pratique sur Node.js, Express.js et les API REST.