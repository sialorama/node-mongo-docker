# Node.js MongoDB App

Cette application est un exemple d'application Node.js utilisant Express et MongoDB pour gérer les opérations de base de données. L'application est conteneurisée avec Docker, facilitant ainsi son déploiement et son développement.

## Architecture du projet

![tree.png]('./imgs/tree.png')


## Prérequis

Avant de démarrer l'application, assurez-vous d'avoir les outils suivants installés sur votre machine :

- [Node.js](https://nodejs.org/) (version 14+)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/) (optionnel pour le déploiement avec Docker)

## Installation

1. **Cloner le dépôt :**
   ```bash
   $ git clone https://github.com/votre-utilisateur/votre-repo.git
   $ cd votre-repo


2. Installer les dépendances : Utilisez npm pour installer les dépendances listées dans package.json.

```plaintext
  ```bash
  $ npm install
```

3. Configurer l'environnement : Créez un fichier .env à la racine du projet pour stocker les variables d'environnement. Voici un exemple de contenu :

```plaintext
    ```bash
    $ MONGO_URI=mongodb://dbuser:dbpassword@127.0.0.1:27017/mabase
    $ PORT=3002

```

4. Lancer l'application : Vous pouvez lancer l'application en utilisant npm :

```plaintext
    ```bash
    npm start
```

5. Utiliser Docker (optionnel) : Si vous préférez utiliser Docker, vous pouvez exécuter l'application à l'aide de Docker Compose.

```plaintext
    ```bash
    docker-compose up
```

```plaintext
## Endpoints

L'application expose les endpoints suivants pour gérer les opérations sur MongoDB :

- GET /get-all-books
- POST /add-book
- POST /add-many-books
```

```plaintext
Contribution
Les contributions sont les bienvenues ! Veuillez soumettre un pull request ou ouvrir une issue pour discuter des changements.

License
Ce projet est sous licence MIT. Consultez le fichier LICENSE pour plus de détails.

```
